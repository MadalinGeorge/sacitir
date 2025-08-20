'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Check, Info } from 'lucide-react';
import { 
  CookiePreferences, 
  getStoredConsent, 
  setStoredConsent, 
  clearConsent,
  COOKIE_POLICY_VERSION 
} from '@/lib/cookieUtils';

export default function CookieConsent() {
  const { t } = useLocale();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  });



  useEffect(() => {
    const storedConsent = getStoredConsent();
    
    if (!storedConsent) {
      // No consent stored, show banner
      setShowBanner(true);
    } else if (storedConsent.version !== COOKIE_POLICY_VERSION) {
      // Policy version changed, show banner again
      localStorage.removeItem('cookieConsent');
      setShowBanner(true);
    } else {
      // Valid consent exists, don't show banner
      setPreferences(storedConsent.preferences);
      setShowBanner(false);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    setStoredConsent(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const allRejected = {
      necessary: true, // Always true
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(allRejected);
    setStoredConsent(allRejected);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    setStoredConsent(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Function to manually reset consent (for testing)
  const resetConsent = () => {
    clearConsent();
    setShowBanner(true);
  };

  // Expose reset function for testing (remove in production)
  if (typeof window !== 'undefined') {
    (window as typeof window & { resetCookieConsent: () => void }).resetCookieConsent = resetConsent;
  }

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-mainRed shadow-2xl"
        >
          <div className="container mx-auto px-4 py-6">
            {!showSettings ? (
              // Main banner
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="bg-mainRed/10 p-2 rounded-lg mt-1">
                      <Info className="w-5 h-5 text-mainRed" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondaryBlack mb-2">
                        {t('cookies.title')}
                      </h3>
                      <p className="text-secondaryBlack/80 text-sm leading-relaxed max-w-2xl">
                        {t('cookies.description')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="btn-outline text-sm px-4 py-2"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {t('cookies.customize')}
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="btn-primary-light text-sm px-4 py-2"
                  >
                    {t('cookies.rejectAll')}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    {t('cookies.acceptAll')}
                  </button>
                </div>
              </div>
            ) : (
              // Settings modal
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-secondaryBlack">
                    {t('cookies.customize')}
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-secondaryBlack/60 hover:text-secondaryBlack transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-secondaryPlatinium rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={preferences.necessary}
                          disabled
                          className="w-5 h-5 text-mainRed bg-white border-2 border-mainRed rounded focus:ring-mainRed"
                        />
                        <Check className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondaryBlack">
                          {t('cookies.necessary')}
                        </h4>
                        <p className="text-sm text-secondaryBlack/70 mt-1">
                          {t('cookies.necessaryDesc')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handlePreferenceChange('analytics')}
                        className="w-5 h-5 text-mainRed bg-white border-2 border-gray-300 rounded focus:ring-mainRed"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondaryBlack">
                          {t('cookies.analytics')}
                        </h4>
                        <p className="text-sm text-secondaryBlack/70 mt-1">
                          {t('cookies.analyticsDesc')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handlePreferenceChange('marketing')}
                        className="w-5 h-5 text-mainRed bg-white border-2 border-gray-300 rounded focus:ring-mainRed"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondaryBlack">
                          {t('cookies.marketing')}
                        </h4>
                        <p className="text-sm text-secondaryBlack/70 mt-1">
                          {t('cookies.marketingDesc')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preferences Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={() => handlePreferenceChange('preferences')}
                        className="w-5 h-5 text-mainRed bg-white border-2 border-gray-300 rounded focus:ring-mainRed"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondaryBlack">
                          {t('cookies.preferences')}
                        </h4>
                        <p className="text-sm text-secondaryBlack/70 mt-1">
                          {t('cookies.preferencesDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="btn-primary-light text-sm px-6 py-2"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="btn-primary text-sm px-6 py-2"
                  >
                    {t('cookies.save')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
