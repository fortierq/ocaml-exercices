// OCaml Toplevel wrapper
// Uses locally compiled js_of_ocaml toplevel for real OCaml code execution
// Falls back to simulation mode if toplevel is not available

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
}

declare global {
  interface Window {
    ocamlToplevelReady?: boolean;
    caml?: (code: string) => string;
  }
}

class OCamlToplevel {
  private initialized = false;
  private initPromise: Promise<void> | null = null;
  private initFailed = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    if (this.initFailed) throw new Error('Init failed previously');
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      // Check if toplevel script exists
      const script = document.createElement('script');
      script.src = `${import.meta.env.BASE_URL}ocaml-toplevel/toplevel.js`;
      script.async = true;

      script.onload = () => {
        // Wait for toplevel to be ready
        const checkReady = (attempts = 0) => {
          if (window.ocamlToplevelReady && window.caml) {
            this.initialized = true;
            console.log('✅ OCaml toplevel initialized');
            resolve();
          } else if (attempts < 50) {
            setTimeout(() => checkReady(attempts + 1), 100);
          } else {
            this.initFailed = true;
            reject(new Error('Timeout'));
          }
        };
        setTimeout(() => checkReady(), 200);
      };

      script.onerror = () => {
        this.initFailed = true;
        console.info('ℹ️ OCaml toplevel not built - using simulation mode');
        console.info('   Run "npm run build:ocaml" to build the real toplevel');
        reject(new Error('Toplevel script not found'));
      };

      document.head.appendChild(script);
    });

    return this.initPromise;
  }

  async execute(code: string): Promise<ExecutionResult> {
    // Try to use real toplevel
    if (!this.initFailed) {
      try {
        await this.initialize();
        
        if (this.initialized && window.caml) {
          try {
            const output = window.caml(code + ';;');
            const hasError = output.includes('Error:') || output.includes('Exception:');
            return {
              success: !hasError,
              output,
              error: hasError ? output : undefined
            };
          } catch (e) {
            return {
              success: false,
              output: '',
              error: String(e)
            };
          }
        }
      } catch {
        // Fallback to simulation
      }
    }

    return this.simulateExecution(code);
  }

  private simulateExecution(code: string): ExecutionResult {
    try {
      const outputs: string[] = [];
      let hasFailwith = false;
      let hasError = false;
      let errorMessage = '';
      
      // Check for unimplemented code
      if (code.includes('failwith "TODO"') || code.includes("failwith 'TODO'")) {
        hasFailwith = true;
      }

      // Basic syntax checks
      const openParens = (code.match(/\(/g) || []).length;
      const closeParens = (code.match(/\)/g) || []).length;
      if (openParens !== closeParens) {
        hasError = true;
        errorMessage = 'Erreur de syntaxe: parenthèses non équilibrées';
      }

      const openBrackets = (code.match(/\[/g) || []).length;
      const closeBrackets = (code.match(/\]/g) || []).length;
      if (openBrackets !== closeBrackets) {
        hasError = true;
        errorMessage = 'Erreur de syntaxe: crochets non équilibrés';
      }

      if (hasError) {
        return {
          success: false,
          output: '',
          error: errorMessage
        };
      }
      
      const lines = code.split('\n');
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('(*')) continue;
        
        if (trimmed.startsWith('let ') && trimmed.includes('=')) {
          const match = trimmed.match(/let\s+(?:rec\s+)?(\w+)/);
          if (match) {
            outputs.push(`val ${match[1]} : ... = <value>`);
          }
        } else if (trimmed.startsWith('type ')) {
          const match = trimmed.match(/type\s+(?:'?\w+\s+)?(\w+)/);
          if (match) {
            outputs.push(`type ${match[1]} = ...`);
          }
        } else if (trimmed.startsWith('assert')) {
          if (hasFailwith) {
            return {
              success: false,
              output: outputs.join('\n') + '\nException: Failure "TODO".',
              error: 'Fonction non implémentée (failwith "TODO")'
            };
          }
          outputs.push('- : unit = ()');
        } else if (trimmed.startsWith('print_endline')) {
          const match = trimmed.match(/print_endline\s+"([^"]+)"/);
          if (match) {
            outputs.push(match[1]);
          }
        }
      }
      
      if (outputs.length === 0) {
        outputs.push('- : unit = ()');
      }
      
      if (!hasFailwith && code.includes('assert')) {
        return {
          success: true,
          output: outputs.join('\n') + '\n\n⚠️ Mode simulation - tests non vérifiés.',
        };
      }
      
      return {
        success: !hasFailwith,
        output: outputs.join('\n')
      };
    } catch (e) {
      return {
        success: false,
        output: '',
        error: `Erreur: ${e}`
      };
    }
  }

  reset(): void {
    // Reset toplevel state
  }
}

export const ocamlToplevel = new OCamlToplevel();

export async function executeOCamlCode(code: string): Promise<ExecutionResult> {
  return ocamlToplevel.execute(code);
}

export async function executeWithTests(
  userCode: string,
  testCode: string
): Promise<ExecutionResult> {
  const fullCode = `${userCode}\n\n${testCode}`;
  return executeOCamlCode(fullCode);
}
