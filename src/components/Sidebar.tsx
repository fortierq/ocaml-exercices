import { NavLink } from 'react-router-dom';
import { exercises, categories, type Exercise } from '../data/exercises';
import { useState } from 'react';
import { useI18n } from '../i18n';
import { useApp } from '../context/AppContext';

function DifficultyDot({ difficulty }: { difficulty: Exercise['difficulty'] }) {
  const colors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500'
  };

  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[difficulty]}`} />
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

export default function Sidebar() {
  const { t, language } = useI18n();
  const { completedExercises } = useApp();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories));
  const [searchQuery, setSearchQuery] = useState('');

  // Get localized category name
  const getLocalizedCategory = (category: string) => {
    const key = category as Parameters<typeof t>[0];
    const translated = t(key);
    return translated !== category ? translated : category;
  };

  // Get localized exercise title
  const getLocalizedTitle = (exercise: Exercise) => {
    return language === 'fr' && exercise.titleFr ? exercise.titleFr : exercise.title;
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Filter exercises by search
  const filteredExercises = searchQuery
    ? exercises.filter(ex => {
        const title = getLocalizedTitle(ex).toLowerCase();
        return title.includes(searchQuery.toLowerCase());
      })
    : exercises;

  // Group exercises by category
  const exercisesByCategory = filteredExercises.reduce((acc, exercise) => {
    if (!acc[exercise.category]) acc[exercise.category] = [];
    acc[exercise.category].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  // Check if exercise is completed
  const isCompleted = (id: string) => completedExercises.has(id);
  const { isDarkMode } = useApp();

  return (
    <aside className={`w-72 flex flex-col h-screen sticky top-0 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900 border-r border-gray-200'}`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-2xl">🐫</span>
          <span className="font-bold text-lg">{t('siteName')}</span>
        </NavLink>
      </div>

      {/* Search */}
      <div className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className={`block w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500' : 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400'}`}
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Exercise list */}
      <nav className="flex-1 overflow-y-auto p-2">
        {categories.map(category => {
          const categoryExercises = exercisesByCategory[category] || [];
          if (categoryExercises.length === 0) return null;
          
          const isExpanded = expandedCategories.has(category);
          const completedCount = categoryExercises.filter(ex => isCompleted(ex.id)).length;

          return (
            <div key={category} className="mb-1">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="flex items-center">
                  <span className="mr-2">{getCategoryIcon(category)}</span>
                  <span>{getLocalizedCategory(category)}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {completedCount}/{categoryExercises.length}
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>

              {/* Exercise items */}
              {isExpanded && (
                <div className="ml-2 mt-1 space-y-0.5">
                  {categoryExercises.map(exercise => (
                    <NavLink
                      key={exercise.id}
                      to={`/exercise/${exercise.id}`}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
                          isActive
                            ? 'bg-orange-600 text-white'
                            : isDarkMode
                              ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`
                      }
                    >
                      <span className="flex-1 truncate flex items-center">
                        {isCompleted(exercise.id) && (
                          <svg className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className="truncate">{getLocalizedTitle(exercise)}</span>
                      </span>
                      <DifficultyDot difficulty={exercise.difficulty} />
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer with stats */}
      <div className={`p-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
        <div className="flex justify-between">
          <span>{exercises.length} {t('totalExercises').toLowerCase()}</span>
          <span>
            {exercises.filter(ex => isCompleted(ex.id)).length} {t('completed') || 'completed'}
          </span>
        </div>
      </div>
    </aside>
  );
}
