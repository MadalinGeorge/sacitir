'use client';

import React from 'react';
import { LocaleProvider } from '@/context/LocaleContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <LocaleProvider>
      <div className="min-h-screen bg-white text-gray-900">
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}

