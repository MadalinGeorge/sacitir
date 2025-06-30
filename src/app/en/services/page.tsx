import ServicesClient from '@/components/ServicesClient';

export const metadata = {
  title: "Freight Transport Services | SACITIR Spain",
  description: "Discover all SACITIR services: national and international transport, refrigerated transport, logistics, and comprehensive solutions for your cargo. Over 20 years of experience in the sector.",
  keywords: "freight services, refrigerated transport, national transport, international transport, logistics, SACITIR, trucks, logistics solutions, Spain",
  alternates: {
    canonical: "https://sacitir.com/en/services",
    languages: {
      es: "https://sacitir.es/es/services",
      en: "https://sacitir.com/en/services"
    }
  },
  openGraph: {
    title: "Freight Transport Services | SACITIR Spain",
    description: "Discover all SACITIR services: national and international transport, refrigerated transport, logistics, and comprehensive solutions for your cargo. Over 20 years of experience in the sector.",
    url: "https://sacitir.com/en/services",
    type: "website",
    locale: "en_US",
    siteName: "SACITIR"
  },
  twitter: {
    card: "summary_large_image",
    title: "Freight Transport Services | SACITIR Spain",
    description: "Discover all SACITIR services: national and international transport, refrigerated transport, logistics, and comprehensive solutions for your cargo. Over 20 years of experience in the sector.",
    site: "@sacitir"
  }
};

export default function Services() {
  return <ServicesClient />;
}

