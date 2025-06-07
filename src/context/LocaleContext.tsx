'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale } from '@/types';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

// Default context value for SSR
const defaultContextValue: LocaleContextType = {
  locale: 'es',
  setLocale: () => {},
  t: (key: string) => key, // Return key as fallback during SSR
};

const LocaleContext = createContext<LocaleContextType>(defaultContextValue);

const translations = {
  en,
  es,
};

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get locale from localStorage or browser language, default to Spanish
    const savedLocale = localStorage.getItem('locale') as Locale;
    const browserLocale = navigator.language.startsWith('en') ? 'en' : 'es';
    const initialLocale = savedLocale || browserLocale;
    
    // Only update if different from current state to prevent unnecessary re-renders
    if (initialLocale !== locale) {
      setLocaleState(initialLocale);
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  };

  const t = (key: string): string => {
    // Always return from Spanish translations during SSR to ensure consistency
    const currentLocale = mounted ? locale : 'es';
    return getNestedValue(translations[currentLocale], key);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  return context;
}

