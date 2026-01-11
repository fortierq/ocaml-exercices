import { Link } from 'react-router-dom';
import { exercises, categories, type Exercise } from '../data/exercises';
import { useState } from 'react';
import { useI18n, useLocalizedExercise } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

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

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const isCompleted = localStorage.getItem(`completed-${exercise.id}`) === 'true';
  const { title, description, category } = useLocalizedExercise(exercise);

  return (
    <Link
      to={`/exercise/${exercise.id}`}
      className="exercise-card block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {isCompleted && (
          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {category}
        </span>
        <DifficultyBadge difficulty={exercise.difficulty} />
      </div>
    </Link>
  );
}

// Helper to get category icon
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Basics': '📝',
    'Recursion': '🔄',
    'Lists': '📋',
    'Higher-Order Functions': '⚡',
    'Trees': '🌳',
    'Options': '❓',
    'Sorting': '📊',
    'Interpreters': '🔧',
    'Binary Search Trees': '🌲',
    'Heaps': '📚',
    'Hash Tables': '🗂️',
    'Graphs': '🕸️',
  };
  return icons[category] || '📄';
}

export default function ExerciseList() {
  const { t, language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Exercise['difficulty'] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get localized category name
  const getLocalizedCategory = (category: string) => {
    // Cast to any to allow dynamic key access
    const key = category as Parameters<typeof t>[0];
    const translated = t(key);
    return translated !== category ? translated : category;
  };

  const filteredExercises = exercises.filter(exercise => {
    if (selectedCategory && exercise.category !== selectedCategory) return false;
    if (selectedDifficulty && exercise.difficulty !== selectedDifficulty) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const title = language === 'fr' && exercise.titleFr ? exercise.titleFr : exercise.title;
      const desc = language === 'fr' && exercise.descriptionFr ? exercise.descriptionFr : exercise.description;
      if (!title.toLowerCase().includes(query) && !desc.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  });

  const exercisesByCategory = selectedCategory 
    ? { [selectedCategory]: filteredExercises }
    : filteredExercises.reduce((acc, exercise) => {
        if (!acc[exercise.category]) acc[exercise.category] = [];
        acc[exercise.category].push(exercise);
        return acc;
      }, {} as Record<string, Exercise[]>);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero section */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🐫 {t('siteName')}
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              {t('siteDescription')}
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">{t('searchPlaceholder')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category filter */}
            <div>
              <label htmlFor="category" className="sr-only">{t('allCategories')}</label>
              <select
                id="category"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">{t('allCategories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{getLocalizedCategory(category)}</option>
                ))}
              </select>
            </div>

            {/* Difficulty filter */}
            <div>
              <label htmlFor="difficulty" className="sr-only">{t('allDifficulties')}</label>
              <select
                id="difficulty"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedDifficulty || ''}
                onChange={(e) => setSelectedDifficulty(e.target.value as Exercise['difficulty'] || null)}
              >
                <option value="">{t('allDifficulties')}</option>
                <option value="easy">{t('easy')}</option>
                <option value="medium">{t('medium')}</option>
                <option value="hard">{t('hard')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {exercises.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('totalExercises')}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {exercises.filter(e => e.difficulty === 'easy').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('easy')}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {exercises.filter(e => e.difficulty === 'medium').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('medium')}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {exercises.filter(e => e.difficulty === 'hard').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('hard')}</div>
          </div>
        </div>

        {/* Exercise list grouped by category */}
        {Object.entries(exercisesByCategory).map(([category, categoryExercises]) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">{getCategoryIcon(category)}</span>
              {getLocalizedCategory(category)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryExercises.map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          </div>
        ))}

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {t('noExercisesFound')}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>{t('builtWith')}</p>
            <p className="mt-2">
              <a 
                href="https://ocaml.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 dark:text-orange-400"
              >
                {t('learnMore')}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
