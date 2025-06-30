import About from '@/components/About';

export const metadata = {
  title: "About SACITIR | Road Freight Experts",
  description: "Learn about SACITIR's history, mission, vision, and values. Over 20 years of experience in national and international road freight transport.",
  keywords: "about SACITIR, company history, mission, vision, values, road freight, logistics, Spain, Europe",
  alternates: {
    canonical: "https://sacitir.com/en/about",
    languages: {
      es: "https://sacitir.es/es/about",
      en: "https://sacitir.com/en/about"
    }
  },
  openGraph: {
    title: "About SACITIR | Road Freight Experts",
    description: "Learn about SACITIR's history, mission, vision, and values. Over 20 years of experience in national and international road freight transport.",
    url: "https://sacitir.com/en/about",
    type: "website",
    locale: "en_US",
    siteName: "SACITIR"
  },
  twitter: {
    card: "summary_large_image",
    title: "About SACITIR | Road Freight Experts",
    description: "Learn about SACITIR's history, mission, vision, and values. Over 20 years of experience in national and international road freight transport.",
    site: "@sacitir"
  }
};

export default function AboutPage() {
  return <About />;
}

