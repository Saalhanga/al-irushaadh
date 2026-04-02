import { useLanguage } from '@/i18n/LanguageContext';
import type { Locale } from '@/i18n/translations';

const languages: { code: Locale; label: string; flag: string; font?: string }[] = [
  { code: 'en', label: 'English', flag: 'gb' },
  { code: 'dv', label: 'ދިވެހި', flag: 'mv', font: "'MV Utheemu', sans-serif" },
  { code: 'ar', label: 'العربية', flag: 'sa' },
];

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`px-3 py-1.5 rounded-md text-sm transition-all duration-200 ${
            locale === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-secondary text-foreground'
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          <img src={`https://flagcdn.com/20x15/${lang.flag}.png`} width={20} height={15} alt={lang.label} className="inline-block sm:mr-1" />
          <span className="hidden sm:inline" style={lang.font ? { fontFamily: lang.font } : undefined}>{lang.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
