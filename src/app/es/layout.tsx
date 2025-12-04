import '../globals.css';
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import ClientProviders from '@/components/ClientProviders';
import type { Viewport, Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "SACITIR - Transporte de Mercancías por Carretera",
    template: "%s | SACITIR"
  },
  description: "SACITIR es una empresa especializada en transporte nacional e internacional de mercancías refrigeradas. Más de 20 años de experiencia ofreciendo soluciones seguras, puntuales y eficaces para tu carga.",
  keywords: "transporte nacional, transporte internacional, transporte frigorífico, logística, transporte de mercancías, camiones frigoríficos, SACITIR, transporte seguro",
  authors: [{ name: "SACITIR" }],
  robots: "index, follow",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "SACITIR - Transporte Nacional e Internacional de Mercancías",
    description: "Confía en SACITIR para el transporte de mercancías por carretera. Especialistas en transporte frigorífico nacional e internacional.",
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: "https://sacitir.es",
    siteName: "SACITIR",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SACITIR - Transporte de Mercancías"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SACITIR - Transporte de Mercancías por Carretera",
    description: "SACITIR es una empresa especializada en transporte nacional e internacional de mercancías refrigeradas.",
    site: "@sacitir",
  },
  metadataBase: new URL("https://sacitir.es"),
  alternates: {
    canonical: "https://sacitir.es/es",
    languages: {
      es: "https://sacitir.es/es",
      en: "https://sacitir.com/en"
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <div id="__next">
          <ClientProviders>
            {children}
          </ClientProviders>
        </div>
      </body>
    </html>
  );
}
