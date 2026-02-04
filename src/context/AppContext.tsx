import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface AppContextType {
  completedExercises: Set<string>;
  markCompleted: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize completed exercises from localStorage
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(() => {
    const completed = new Set<string>();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('completed-') && localStorage.getItem(key) === 'true') {
        completed.add(key.replace('completed-', ''));
      }
    }
    return completed;
  });

  // Initialize dark mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const markCompleted = useCallback((id: string) => {
    localStorage.setItem(`completed-${id}`, 'true');
    setCompletedExercises(prev => new Set([...prev, id]));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <AppContext.Provider value={{ completedExercises, markCompleted, isDarkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
