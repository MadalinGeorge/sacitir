'use client';

import React from 'react';
import { LocaleProvider } from '@/context/LocaleContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ParallaxProvider } from 'react-scroll-parallax';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <ParallaxProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
            <Navigation />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </ParallaxProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

