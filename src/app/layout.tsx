import React from 'react';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from '@/components/ClientProviders';
import type { Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SACITIR - Transporte de Mercancías por Carretera",
  description: "SACITIR es una empresa especializada en transporte nacional e internacional de mercancías refrigeradas. Más de 20 años de experiencia ofreciendo soluciones seguras, puntuales y eficaces para tu carga.",
  keywords: "transporte nacional, transporte internacional, transporte frigorífico, logística, transporte de mercancías, camiones frigoríficos, SACITIR, transporte seguro",
  authors: [{ name: "SACITIR" }],
  robots: "index, follow",
  icons: {
    icon: '/favicon.ico',
    apple: '/sacitir/images/logo/logo.jpg',
  },
  openGraph: {
    title: "SACITIR - Transporte Nacional e Internacional de Mercancías",
    description: "Confía en SACITIR para el transporte de mercancías por carretera. Especialistas en transporte frigorífico nacional e internacional.",
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: "https://madalingeorge.github.io/sacitir",
    siteName: "SACITIR"
  },
  twitter: {
    card: "summary_large_image",
    title: "SACITIR - Transporte de Mercancías por Carretera",
    description: "SACITIR es una empresa especializada en transporte nacional e internacional de mercancías refrigeradas. Más de 20 años de experiencia ofreciendo soluciones seguras, puntuales y eficaces para tu carga.",
    site: "@sacitir",
  },
  metadataBase: new URL("https://madalingeorge.github.io/sacitir"),
  alternates: {
    canonical: "https://madalingeorge.github.io/sacitir",
    languages: {
      es: "https://madalingeorge.github.io/sacitir",
      en: "https://madalingeorge.github.io/sacitir/en"
    }
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
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
