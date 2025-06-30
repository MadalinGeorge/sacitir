import ContactClient from '@/components/ContactClient';

export const metadata = {
  title: 'Contact SACITIR | Freight Transport & Logistics',
  description: 'Get in touch with SACITIR for reliable freight transport and logistics solutions. Request a quote or contact our team for more information.',
  keywords: 'contact SACITIR, freight transport, logistics, request quote, transport company, Spain',
  alternates: {
    canonical: 'https://sacitir.com/en/contact',
    languages: {
      es: 'https://sacitir.es/es/contact',
      en: 'https://sacitir.com/en/contact'
    }
  },
  openGraph: {
    title: 'Contact SACITIR | Freight Transport & Logistics',
    description: 'Get in touch with SACITIR for reliable freight transport and logistics solutions. Request a quote or contact our team for more information.',
    url: 'https://sacitir.com/en/contact',
    type: 'website',
    locale: 'en_US',
    siteName: 'SACITIR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact SACITIR | Freight Transport & Logistics',
    description: 'Get in touch with SACITIR for reliable freight transport and logistics solutions. Request a quote or contact our team for more information.',
    site: '@sacitir'
  }
};

export default function Contact() {
  return <ContactClient />;
}

