'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  }, []);

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'es' : 'en');
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-textWhite shadow-lg"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo/logo-full.jpg" 
              alt="SACITIR Logo" 
              width={160} 
              height={40} 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-secondaryBlack hover:text-mainRed font-bold transition-colors relative group py-2"
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 right-0 w-0 h-0.5 bg-mainRed transition-all duration-300 group-hover:w-full mx-auto" />
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 text-secondaryBlack hover:text-mainRed transition-colors"
              title={t('nav.language')}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium uppercase">{locale}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-secondaryPlatinium hover:bg-secondaryPlatinium/80 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-secondaryBlack" />
              ) : (
                <Menu className="w-5 h-5 text-secondaryBlack" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-secondaryPlatinium py-4 space-y-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="px-4 py-3 text-secondaryBlack hover:text-mainRed hover:bg-secondaryPlatinium rounded-lg transition-colors"
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

