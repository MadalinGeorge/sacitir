'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en';
import es from '@/locales/es';

type TranslationType = Record<string, any>;
type Locale = 'en' | 'es';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string | string[];
}

const translations: Record<Locale, TranslationType> = { en, es };

const LocaleContext = createContext<LocaleContextType>({
  locale: 'es',
  setLocale: () => {},
  t: () => '',
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es');
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

  // Improved translation function that handles nested keys and arrays
  const t = (key: string): string | string[] => {
    const keys = key.split('.');
    let result: any = translations[locale];
    
    for (const k of keys) {
      if (result === undefined) return key;
      result = result[k];
    }
    
    // If result is undefined, return the key as fallback
    if (result === undefined) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    
    // Allow arrays to be returned (for features lists)
    if (Array.isArray(result) || typeof result === 'string') {
      return result;
    }
    
    // For other non-string values, log warning and return key
    console.warn(`Translation key "${key}" returned a non-string, non-array value:`, result);
    return key;
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

