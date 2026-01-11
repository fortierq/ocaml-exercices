import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = 'ocaml-exercises-language';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'fr') {
      return stored;
    }
    // Default to French
    return 'fr';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Hook to get localized exercise content
export function useLocalizedExercise(exercise: {
  title: string;
  titleFr?: string;
  description: string;
  descriptionFr?: string;
  category: string;
  categoryFr?: string;
  hints: string[];
  hintsFr?: string[];
}) {
  const { language } = useI18n();
  
  return {
    title: language === 'fr' && exercise.titleFr ? exercise.titleFr : exercise.title,
    description: language === 'fr' && exercise.descriptionFr ? exercise.descriptionFr : exercise.description,
    category: language === 'fr' && exercise.categoryFr ? exercise.categoryFr : exercise.category,
    hints: language === 'fr' && exercise.hintsFr ? exercise.hintsFr : exercise.hints,
  };
}
