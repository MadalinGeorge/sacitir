// Cookie utility functions for managing consent and preferences

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface StoredConsent {
  preferences: CookiePreferences;
  version: string;
  timestamp: number;
  expiresAt: number;
}

export const COOKIE_POLICY_VERSION = '1.0';
export const CONSENT_EXPIRY_DAYS = 365;

// Get cookie value by name
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

// Set cookie with options
export const setCookie = (name: string, value: string, days: number = 365): void => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

// Delete cookie
export const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=; max-age=0; path=/`;
};

// Get stored consent from localStorage
export const getStoredConsent = (): StoredConsent | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('cookieConsent');
    if (!stored) return null;
    
    const parsed = JSON.parse(stored) as StoredConsent;
    
    // Check if consent has expired
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem('cookieConsent');
      deleteCookie('cookieConsent');
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error('Error parsing stored consent:', error);
    localStorage.removeItem('cookieConsent');
    deleteCookie('cookieConsent');
    return null;
  }
};

// Set stored consent in both localStorage and cookies
export const setStoredConsent = (preferences: CookiePreferences): void => {
  if (typeof window === 'undefined') return;
  
  const consent: StoredConsent = {
    preferences,
    version: COOKIE_POLICY_VERSION,
    timestamp: Date.now(),
    expiresAt: Date.now() + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
  };
  
  localStorage.setItem('cookieConsent', JSON.stringify(consent));
  setCookie('cookieConsent', JSON.stringify(consent), CONSENT_EXPIRY_DAYS);
};

// Clear all consent data
export const clearConsent = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('cookieConsent');
  deleteCookie('cookieConsent');
};

// Check if consent is valid and current
export const hasValidConsent = (): boolean => {
  const storedConsent = getStoredConsent();
  return storedConsent !== null && storedConsent.version === COOKIE_POLICY_VERSION;
};

// Get current consent preferences
export const getCurrentPreferences = (): CookiePreferences | null => {
  const storedConsent = getStoredConsent();
  return storedConsent?.preferences || null;
};

// Check if a specific cookie type is allowed
export const isCookieAllowed = (type: keyof CookiePreferences): boolean => {
  const preferences = getCurrentPreferences();
  return preferences ? preferences[type] : false;
};
