import en from '@/locales/en';
import es from '@/locales/es';

export function getApiTranslations(locale: 'en' | 'es' = 'en') {
  return locale === 'es' ? es : en;
}

export type ApiTranslations = typeof en;
