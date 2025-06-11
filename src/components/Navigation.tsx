'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { Menu, X, Globe, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { locale, setLocale, t } = useLocale();

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.services', href: '/services' },
    { key: 'nav.career', href: '/career' },
    { key: 'nav.contact', href: '/contact' },
  ];

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set initial scroll state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'es' : 'en');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        mounted && isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold text-gray-900">
              SACITIR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title={t('nav.language')}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium uppercase">{locale}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

