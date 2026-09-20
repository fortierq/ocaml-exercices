import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { I18nProvider, useI18n } from './i18n';
import ResizeHandle from './components/ResizeHandle';
import { useLayoutPreference } from './hooks/useLayoutPreference';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import ExerciseView from './components/ExerciseView';
import LanguageSwitcher from './components/LanguageSwitcher';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useApp();
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
    >
      {isDarkMode ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

function GitHubLink() {
  return (
    <a
      href="https://github.com/fortierq/ocaml-exercices"
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      title="GitHub Repository"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    </a>
  );
}

function MpiLink() {
  return (
    <a
      href="https://mpi-lamartin.github.io/mpi-info"
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      title="MPI Info"
    >
      <span className="text-sm font-semibold">MPI</span>
    </a>
  );
}

function AppContent() {
  const { t } = useI18n();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const isDesktop = viewportWidth >= 1024;
  const [sidebarVisible, setSidebarVisible] = useLayoutPreference('layout-sidebar-visible', 1, 0, 1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useLayoutPreference('layout-sidebar-width', 288, 200, 480);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isSidebarOpen = isDesktop ? Boolean(sidebarVisible) : mobileSidebarOpen;
  const maxSidebarWidth = Math.max(200, Math.min(480, isDesktop ? viewportWidth - 640 : viewportWidth - 64));
  const visibleSidebarWidth = Math.min(sidebarWidth, maxSidebarWidth);

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth);
      setMobileSidebarOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeSidebar = () => {
    if (isDesktop) setSidebarVisible(0);
    else setMobileSidebarOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <Router>
      <div className="app-shell bg-gray-100 dark:bg-gray-900" onKeyDown={event => {
        if (event.key === 'Escape' && isSidebarOpen) closeSidebar();
      }}>
        <div className="app-toolbar bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 min-w-0">
            <button
              ref={toggleRef}
              onClick={() => isDesktop ? setSidebarVisible(isSidebarOpen ? 0 : 1) : setMobileSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label={isSidebarOpen ? t('hideSidebar') : t('showSidebar')}
              title={isSidebarOpen ? t('hideSidebar') : t('showSidebar')}
              aria-controls="exercise-navigation"
              aria-expanded={isSidebarOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
                <path d="M9 4v16" strokeWidth="2" />
                <path d={isSidebarOpen ? 'm16 9-3 3 3 3' : 'm13 9 3 3-3 3'} strokeWidth="2" />
              </svg>
            </button>
            <Link to="/" className="site-title font-bold text-lg text-gray-900 dark:text-gray-100 whitespace-nowrap">
              {t('siteName')}
            </Link>
          </div>
          <div className="toolbar-actions flex items-center gap-2">
            <GitHubLink />
            <MpiLink />
            <DarkModeToggle />
            <LanguageSwitcher />
          </div>
        </div>
        <div className="app-body">
          {isSidebarOpen && !isDesktop && (
            <div className="fixed inset-0 top-16 bg-black/50 z-30" onClick={closeSidebar} />
          )}
          <div
            id="exercise-navigation"
            hidden={!isSidebarOpen}
            className={isDesktop ? 'navigation-panel' : 'navigation-panel navigation-drawer'}
            style={{ width: visibleSidebarWidth }}
          >
            <Sidebar onNavigate={() => { if (!isDesktop) closeSidebar(); }} />
            <ResizeHandle
              label={t('resizeNavigation')}
              controls="exercise-navigation"
              value={visibleSidebarWidth}
              min={200}
              max={maxSidebarWidth}
              onChange={setSidebarWidth}
            />
          </div>
          <main className="workspace">
            <Routes>
              <Route path="/" element={<Navigate to="/exercise/factorial" replace />} />
              <Route path="/exercise/:id" element={<ExerciseView />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </AppProvider>
  );
}

export default App;
