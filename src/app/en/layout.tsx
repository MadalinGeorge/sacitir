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
    default: "SACITIR - Road Freight Transport",
    template: "%s | SACITIR"
  },
  description: "SACITIR is a company specialized in national and international transport of refrigerated goods. Over 20 years of experience providing safe, timely, and effective solutions for your cargo.",
  keywords: "national transport, international transport, refrigerated transport, logistics, freight transport, refrigerated trucks, SACITIR, safe transport",
  authors: [{ name: "SACITIR" }],
  robots: "index, follow",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "SACITIR - National and International Freight Transport",
    description: "Trust SACITIR for road freight transport. Specialists in national and international refrigerated transport.",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: "https://sacitir.com",
    siteName: "SACITIR",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SACITIR - Freight Transport"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SACITIR - Road Freight Transport",
    description: "SACITIR is a company specialized in national and international transport of refrigerated goods.",
    site: "@sacitir",
  },
  metadataBase: new URL("https://sacitir.com"),
  alternates: {
    canonical: "https://sacitir.com/en",
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
    <html lang="en">
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
