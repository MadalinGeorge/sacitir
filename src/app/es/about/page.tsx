import About from '@/components/About';

export const metadata = {
  title: "Sobre SACITIR | Expertos en Transporte de Mercancías",
  description: "Conoce la historia, misión, visión y valores de SACITIR. Más de 20 años de experiencia en transporte nacional e internacional de mercancías por carretera.",
  keywords: "sobre SACITIR, historia de la empresa, misión, visión, valores, transporte de mercancías, logística, España, Europa",
  alternates: {
    canonical: "https://sacitir.es/es/about",
    languages: {
      es: "https://sacitir.es/es/about",
      en: "https://sacitir.com/en/about"
    }
  },
  openGraph: {
    title: "Sobre SACITIR | Expertos en Transporte de Mercancías",
    description: "Conoce la historia, misión, visión y valores de SACITIR. Más de 20 años de experiencia en transporte nacional e internacional de mercancías por carretera.",
    url: "https://sacitir.es/es/about",
    type: "website",
    locale: "es_ES",
    siteName: "SACITIR"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre SACITIR | Expertos en Transporte de Mercancías",
    description: "Conoce la historia, misión, visión y valores de SACITIR. Más de 20 años de experiencia en transporte nacional e internacional de mercancías por carretera.",
    site: "@sacitir"
  }
};

export default function AboutPage() {
  return <About />;
}

