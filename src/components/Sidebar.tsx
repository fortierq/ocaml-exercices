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

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
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
          <span className="font-bold text-lg">{t('siteName')}</span>
        </NavLink>
      </div>

      {/* Search */}
      <div className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="relative">
          <input
            type="text"
            className={`block w-full pl-3 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500' : 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400'}`}
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
                <span>{getLocalizedCategory(category)}</span>
                <span className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {completedCount}/{categoryExercises.length}
                  </span>
                  <span className="text-xs text-gray-500">{isExpanded ? '-' : '+'}</span>
                </span>
              </button>

              {/* Exercise items */}
              {isExpanded && (
                <div className="ml-2 mt-1 space-y-0.5">
                  {categoryExercises.map(exercise => (
                    <NavLink
                      key={exercise.id}
                      to={`/exercise/${exercise.id}`}
                      onClick={onNavigate}
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
