'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en';
import es from '@/locales/es';

type TranslationType = Record<string, string | Record<string, string>>;
type Locale = 'en' | 'es';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, TranslationType> = { en, es };

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  t: () => '',
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'es')) {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('locale', locale);
    }
  }, [locale, mounted]);

  // Improved translation function that handles nested keys
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[locale];
    
    for (const k of keys) {
      if (result === undefined) return key;
      result = result[k];
    }
    
    // If result is an object or undefined, return the key as fallback
    if (typeof result !== 'string') {
      console.warn(`Translation key "${key}" returned a non-string value:`, result);
      return key;
    }
    
    return result;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

