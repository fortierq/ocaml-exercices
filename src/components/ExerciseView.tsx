import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import { getExerciseById, type Exercise } from '../data/exercises';
import { executeWithTests, type ExecutionResult } from '../lib/ocaml-toplevel';
import { useI18n, useLocalizedExercise } from '../i18n';
import { useApp } from '../context/AppContext';

interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
}

function OutputPanel({ result, isRunning }: OutputPanelProps) {
  const { t } = useI18n();
  const { isDarkMode } = useApp();

  if (isRunning) {
    return (
      <div className={`rounded-lg p-4 font-mono text-sm h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{t('runningOCaml')}</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={`rounded-lg p-4 font-mono text-sm h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-500'}`}>
        {t('clickRunTests')}
      </div>
    );
  }

  return (
    <div className={`rounded-lg p-4 font-mono text-sm h-full overflow-auto ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    } ${
      result.success ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
    }`}>
      <div className="flex items-center space-x-2 mb-2">
        {result.success ? (
          <>
            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-500 font-semibold">{t('success')}</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-red-500 font-semibold">{t('error')}</span>
          </>
        )}
      </div>
      <pre className={`whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{result.output}</pre>
      {result.error && (
        <pre className="text-red-400 mt-2 whitespace-pre-wrap">{result.error}</pre>
      )}
    </div>
  );
}

// Helper to render text with inline code formatting
function renderWithCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      const code = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400 font-mono text-xs"
        >
          {code}
        </code>
      );
    }
    return part;
  });
}

function DifficultyBadge({ difficulty }: { difficulty: Exercise['difficulty'] }) {
  const { t } = useI18n();
  const colors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const labels = {
    easy: t('easy'),
    medium: t('medium'),
    hard: t('hard')
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[difficulty]}`}>
      {labels[difficulty]}
    </span>
  );
}

export default function ExerciseView() {
  const { t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  // Get localized content
  const localizedExercise = exercise ? useLocalizedExercise(exercise) : null;

  useEffect(() => {
    if (id) {
      const ex = getExerciseById(id);
      if (ex) {
        setExercise(ex);
        // Load saved code or use starter code
        const savedCode = localStorage.getItem(`exercise-${id}`);
        setCode(savedCode || ex.starterCode);
        setResult(null);
        setShowSolution(false);
        setShowHints(false);
        setCurrentHint(0);
      }
    }
  }, [id]);

  // Auto-save code
  useEffect(() => {
    if (id && code) {
      localStorage.setItem(`exercise-${id}`, code);
    }
  }, [id, code]);

  const { markCompleted } = useApp();

  const handleRun = useCallback(async () => {
    if (!exercise) return;
    
    setIsRunning(true);
    setResult(null);
    
    try {
      const execResult = await executeWithTests(code, exercise.tests);
      setResult(execResult);
      
      // Mark exercise as completed if all tests pass
      if (execResult.success && id) {
        markCompleted(id);
      }
    } catch (error) {
      setResult({
        success: false,
        output: '',
        error: `Execution error: ${error}`
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, exercise, id, markCompleted]);

  const handleReset = useCallback(() => {
    if (exercise) {
      setCode(exercise.starterCode);
      setResult(null);
      localStorage.removeItem(`exercise-${id}`);
    }
  }, [exercise, id]);

  const handleToggleSolution = useCallback(() => {
    if (exercise) {
      setShowSolution(prev => !prev);
    }
  }, [exercise]);

  const handleNextHint = useCallback(() => {
    if (localizedExercise && currentHint < localizedExercise.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
  }, [localizedExercise, currentHint]);

  if (!exercise || !localizedExercise) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('exerciseNotFound')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {t('selectExercise') || 'Select an exercise from the sidebar'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-3 pt-14 lg:pt-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {localizedExercise.title}
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {localizedExercise.category}
                </span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <DifficultyBadge difficulty={exercise.difficulty} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content - fills remaining height */}
      <main className="flex-1 overflow-auto lg:overflow-hidden p-3 sm:p-4">
        <div className="h-full flex flex-col lg:grid lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Left panel - Description and hints */}
          <div className="flex flex-col space-y-3 sm:space-y-4 lg:overflow-y-auto lg:col-span-1">
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 flex-shrink-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('description')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                {renderWithCode(localizedExercise.description)}
              </p>
            </div>

            {/* Hints */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {t('hints')}
                </h2>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400"
                >
                  {showHints ? t('hideHints') : t('showHints')}
                </button>
              </div>
              
              {showHints && (
                <div className="space-y-2">
                  {localizedExercise.hints.slice(0, currentHint + 1).map((hint, index) => (
                    <div
                      key={index}
                      className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                    >
                      <p className="text-sm text-orange-800 dark:text-orange-200">
                        <span className="font-semibold">{t('hint')} {index + 1}:</span> {renderWithCode(hint)}
                      </p>
                    </div>
                  ))}
                  
                  {currentHint < localizedExercise.hints.length - 1 && (
                    <button
                      onClick={handleNextHint}
                      className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400"
                    >
                      {t('showNextHint')} ({currentHint + 1}/{localizedExercise.hints.length})
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Solution */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {t('solution')}
                </h2>
                <button
                  onClick={handleToggleSolution}
                  className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400"
                >
                  {showSolution ? t('hideSolution') : t('revealSolution')}
                </button>
              </div>
              
              {showSolution ? (
                <div className="h-48 sm:h-64 lg:h-128">
                  <CodeEditor
                    value={exercise.solution}
                    onChange={() => {}}
                    readOnly
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('trySolvingFirst')}
                </p>
              )}
            </div>

            {/* Test code preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 flex-shrink-0 lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 flex-shrink-0">
                {t('tests')}
              </h2>
              <div className="h-[150px] sm:h-[180px] lg:flex-1 lg:min-h-0">
                <CodeEditor
                  value={exercise.tests}
                  onChange={() => {}}
                  readOnly
                  lineNumbers={false}
                />
              </div>
            </div>
          </div>

          {/* Right panel - Editor and output */}
          <div className="flex flex-col space-y-3 sm:space-y-4 lg:col-span-2 lg:h-full">
            {/* Code editor - takes most of the space */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 flex-shrink-0 lg:flex-[2] lg:flex lg:flex-col lg:min-h-0">
              <div className="flex items-center justify-between mb-2 flex-shrink-0">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {t('yourSolution')}
                </h2>
                <button
                  onClick={handleReset}
                  className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {t('resetCode')}
                </button>
              </div>
              
              <div className="h-[250px] sm:h-[300px] lg:flex-1 lg:min-h-0">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                />
              </div>
              
              <div className="mt-3 flex justify-end items-center flex-shrink-0">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="inline-flex items-center px-4 py-2.5 sm:py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white text-sm sm:text-base font-medium rounded-lg transition-colors"
                >
                  {isRunning ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t('running')}
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t('runTests')}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output - scales with window */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 flex-shrink-0 lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 flex-shrink-0">
                {t('output')}
              </h2>
              <div className="h-[120px] sm:h-[150px] lg:flex-1 lg:min-h-0">
                <OutputPanel result={result} isRunning={isRunning} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
