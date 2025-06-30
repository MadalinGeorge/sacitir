import HomeClient from '@/components/HomeClient';

export const metadata = {
  title: "SACITIR - Road Freight Transport | National & International",
  description: "Leading company in national and international road freight transport. Specialists in refrigerated transport, logistics, and secure solutions for your cargo in Spain and Europe.",
  keywords: "freight transport, national transport, international transport, refrigerated transport, logistics, trucks, SACITIR, Spain, logistics solutions, secure cargo",
  alternates: {
    canonical: "https://sacitir.com/en",
    languages: {
      es: "https://sacitir.es/es",
      en: "https://sacitir.com/en"
    }
  },
  openGraph: {
    title: "SACITIR - Road Freight Transport | National & International",
    description: "Leading company in national and international road freight transport. Specialists in refrigerated transport, logistics, and secure solutions for your cargo in Spain and Europe.",
    url: "https://sacitir.com/en",
    type: "website",
    locale: "en_US",
    siteName: "SACITIR"
  },
  twitter: {
    card: "summary_large_image",
    title: "SACITIR - Road Freight Transport | National & International",
    description: "Leading company in national and international road freight transport. Specialists in refrigerated transport, logistics, and secure solutions for your cargo in Spain and Europe.",
    site: "@sacitir"
  }
};

export default function Home() {
  return <HomeClient />;
}
