import { useI18n } from '../i18n';
import type { Language } from '../i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  const nextLanguage: Language = language === 'fr' ? 'en' : 'fr';
  const currentFlag = language === 'fr' ? '🇫🇷' : '🇬🇧';
  const title = nextLanguage === 'fr' ? 'Basculer en francais' : 'Switch to English';

  return (
    <button
      onClick={() => setLanguage(nextLanguage)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-semibold"
      title={title}
    >
      <span className="text-base" aria-hidden>
        {currentFlag}
      </span>
    </button>
  );
}
