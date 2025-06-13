import React from 'react';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from '@/components/ClientProviders';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SACITIR - Reliable Freight Transport Solutions",
  description: "SACITIR provides safe, reliable, and efficient freight transport solutions. Trusted partner for cargo transportation across the nation with over 20 years of experience.",
  keywords: "freight transport, cargo, logistics, shipping, refrigerated transport, national transport, SACITIR",
  authors: [{ name: "SACITIR" }],
  robots: "index, follow",
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo/logo.jpg',
  },
  openGraph: {
    title: "SACITIR - Reliable Freight Transport Solutions",
    description: "SACITIR provides safe, reliable, and efficient freight transport solutions nationwide.",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div id="__next">
          <ClientProviders>
            {children}
          </ClientProviders>
        </div>
      </body>
    </html>
  );
}
