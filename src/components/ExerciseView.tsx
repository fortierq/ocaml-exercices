import { useState, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import LanguageSwitcher from './LanguageSwitcher';
import { getExerciseById, type Exercise } from '../data/exercises';
import { executeWithTests, type ExecutionResult } from '../lib/ocaml-toplevel';
import { useI18n, useLocalizedExercise } from '../i18n';

interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
}

function OutputPanel({ result, isRunning }: OutputPanelProps) {
  const { t } = useI18n();

  if (isRunning) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm h-48 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-400">
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
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm h-48 flex items-center justify-center text-gray-500">
        {t('clickRunTests')}
      </div>
    );
  }

  return (
    <div className={`bg-gray-900 rounded-lg p-4 font-mono text-sm h-48 overflow-auto ${
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
      <pre className="text-gray-300 whitespace-pre-wrap">{result.output}</pre>
      {result.error && (
        <pre className="text-red-400 mt-2 whitespace-pre-wrap">{result.error}</pre>
      )}
    </div>
  );
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

  const handleRun = useCallback(async () => {
    if (!exercise) return;
    
    setIsRunning(true);
    setResult(null);
    
    try {
      const execResult = await executeWithTests(code, exercise.tests);
      setResult(execResult);
    } catch (error) {
      setResult({
        success: false,
        output: '',
        error: `Execution error: ${error}`
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, exercise]);

  const handleReset = useCallback(() => {
    if (exercise) {
      setCode(exercise.starterCode);
      setResult(null);
      localStorage.removeItem(`exercise-${id}`);
    }
  }, [exercise, id]);

  const handleShowSolution = useCallback(() => {
    if (exercise) {
      setShowSolution(true);
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
          <Link
            to="/"
            className="text-orange-600 hover:text-orange-700 dark:text-orange-400"
          >
            ← {t('backToExercises')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title={t('backToExercises')}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {localizedExercise.title}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {localizedExercise.category}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <DifficultyBadge difficulty={exercise.difficulty} />
                </div>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left panel - Description and hints */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('description')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {localizedExercise.description}
              </p>
            </div>

            {/* Hints */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('hints')}
                </h2>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400"
                >
                  {showHints ? t('hideHints') : t('showHints')}
                </button>
              </div>
              
              {showHints && (
                <div className="space-y-3">
                  {localizedExercise.hints.slice(0, currentHint + 1).map((hint, index) => (
                    <div
                      key={index}
                      className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                    >
                      <p className="text-sm text-orange-800 dark:text-orange-200">
                        <span className="font-semibold">{t('hint')} {index + 1}:</span> {hint}
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('solution')}
                </h2>
                <button
                  onClick={handleShowSolution}
                  className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400"
                  disabled={showSolution}
                >
                  {showSolution ? t('showingSolution') : t('revealSolution')}
                </button>
              </div>
              
              {showSolution ? (
                <div className="rounded-lg overflow-hidden">
                  <CodeEditor
                    value={exercise.solution}
                    onChange={() => {}}
                    height="200px"
                    readOnly
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('trySolvingFirst')}
                </p>
              )}
            </div>
          </div>

          {/* Right panel - Editor and output */}
          <div className="space-y-6">
            {/* Code editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('yourSolution')}
                </h2>
                <button
                  onClick={handleReset}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {t('resetCode')}
                </button>
              </div>
              
              <CodeEditor
                value={code}
                onChange={setCode}
                height="350px"
              />
              
              <div className="mt-4 flex justify-between items-center">
                <a
                  href={`https://try.ocaml.pro/#code=${encodeURIComponent(code + '\n\n' + exercise.tests)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400"
                >
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {t('testOnTryOCaml')}
                </a>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium rounded-lg transition-colors"
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

            {/* Output */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('output')}
              </h2>
              <OutputPanel result={result} isRunning={isRunning} />
            </div>

            {/* Test code preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('tests')}
              </h2>
              <div className="rounded-lg overflow-hidden">
                <CodeEditor
                  value={exercise.tests}
                  onChange={() => {}}
                  height="150px"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
