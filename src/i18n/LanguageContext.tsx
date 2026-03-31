import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, type Locale } from './translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

// Persist context across HMR to avoid "must be used within Provider" errors
const LanguageContext = (globalThis as any).__LanguageContext ??= createContext<LanguageContextType | undefined>(undefined);


const rtlLocales: Locale[] = ['dv', 'ar'];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('uis-locale');
    return (saved as Locale) || 'en';
  });

  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('uis-locale', newLocale);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[locale]?.[key] || translations['en']?.[key] || key;
  }, [locale]);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale === 'dv' ? 'dv' : locale === 'ar' ? 'ar' : 'en';
  }, [dir, locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
