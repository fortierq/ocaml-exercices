import Editor from '@monaco-editor/react';
import { useCallback, useRef } from 'react';
import type { editor } from 'monaco-editor';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

// OCaml syntax highlighting configuration
const ocamlLanguageConfig = {
  keywords: [
    'and', 'as', 'assert', 'asr', 'begin', 'class', 'constraint', 'do', 'done',
    'downto', 'else', 'end', 'exception', 'external', 'false', 'for', 'fun',
    'function', 'functor', 'if', 'in', 'include', 'inherit', 'initializer',
    'land', 'lazy', 'let', 'lor', 'lsl', 'lsr', 'lxor', 'match', 'method',
    'mod', 'module', 'mutable', 'new', 'nonrec', 'object', 'of', 'open', 'or',
    'private', 'rec', 'sig', 'struct', 'then', 'to', 'true', 'try', 'type',
    'val', 'virtual', 'when', 'while', 'with'
  ],
  typeKeywords: [
    'int', 'float', 'bool', 'char', 'string', 'unit', 'list', 'array', 'option',
    'ref', 'exn'
  ],
  operators: [
    '+', '-', '*', '/', 'mod', '=', '<>', '<', '>', '<=', '>=', '==', '!=',
    '&&', '||', 'not', '@', '^', '::', '|>', '@@', '->', '<-', ';', ':',
    '!', '.', '#'
  ],
  brackets: [
    { open: '(', close: ')', token: 'delimiter.parenthesis' },
    { open: '[', close: ']', token: 'delimiter.square' },
    { open: '{', close: '}', token: 'delimiter.curly' },
    { open: '[|', close: '|]', token: 'delimiter.array' },
  ]
};

export default function CodeEditor({
  value,
  onChange,
  language = 'ocaml',
  height = '400px',
  readOnly = false
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = useCallback((editor: editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = editor;

    // Register OCaml language if not already registered
    if (!monaco.languages.getLanguages().some(lang => lang.id === 'ocaml')) {
      monaco.languages.register({ id: 'ocaml' });

      // Set tokenizer
      monaco.languages.setMonarchTokensProvider('ocaml', {
        keywords: ocamlLanguageConfig.keywords,
        typeKeywords: ocamlLanguageConfig.typeKeywords,
        operators: ocamlLanguageConfig.operators,

        tokenizer: {
          root: [
            // Comments
            [/\(\*/, 'comment', '@comment'],
            
            // Strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],
            
            // Characters
            [/'[^\\']'/, 'string.char'],
            [/'\\.'/, 'string.char'],
            
            // Numbers
            [/\d+\.\d*([eE][\-+]?\d+)?/, 'number.float'],
            [/\d+[eE][\-+]?\d+/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/0[oO][0-7]+/, 'number.octal'],
            [/0[bB][01]+/, 'number.binary'],
            [/\d+/, 'number'],
            
            // Identifiers and keywords
            [/[a-z_][a-zA-Z0-9_']*/, {
              cases: {
                '@keywords': 'keyword',
                '@typeKeywords': 'type',
                '@default': 'identifier'
              }
            }],
            [/[A-Z][a-zA-Z0-9_']*/, 'type.identifier'],
            
            // Operators
            [/[+\-*/=<>@^|&!~?:;.,#]+/, 'operator'],
            
            // Delimiters
            [/[{}()\[\]]/, 'delimiter'],
          ],

          comment: [
            [/[^(*]+/, 'comment'],
            [/\(\*/, 'comment', '@push'],
            [/\*\)/, 'comment', '@pop'],
            [/[(*)]/, 'comment']
          ],

          string: [
            [/[^\\"]+/, 'string'],
            [/\\./, 'string.escape'],
            [/"/, 'string', '@pop']
          ],
        }
      });

      // Set language configuration
      monaco.languages.setLanguageConfiguration('ocaml', {
        comments: {
          blockComment: ['(*', '*)']
        },
        brackets: [
          ['(', ')'],
          ['[', ']'],
          ['{', '}'],
          ['[|', '|]']
        ],
        autoClosingPairs: [
          { open: '(', close: ')' },
          { open: '[', close: ']' },
          { open: '{', close: '}' },
          { open: '"', close: '"' },
          { open: "'", close: "'" },
          { open: '(*', close: '*)' }
        ],
        surroundingPairs: [
          { open: '(', close: ')' },
          { open: '[', close: ']' },
          { open: '{', close: '}' },
          { open: '"', close: '"' }
        ]
      });
    }

    // Focus the editor
    editor.focus();
  }, []);

  const handleChange = useCallback((newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  }, [onChange]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace",
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          readOnly,
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}
