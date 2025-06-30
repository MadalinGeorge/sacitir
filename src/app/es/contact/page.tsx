import ContactClient from '@/components/ContactClient';

export const metadata = {
  title: 'Contacta con SACITIR | Transporte y Logística',
  description: 'Ponte en contacto con SACITIR para soluciones confiables de transporte y logística. Solicita una cotización o contacta a nuestro equipo para más información.',
  keywords: 'contacto SACITIR, transporte de mercancías, logística, solicitar cotización, empresa de transporte, España',
  alternates: {
    canonical: 'https://sacitir.es/es/contact',
    languages: {
      es: 'https://sacitir.es/es/contact',
      en: 'https://sacitir.com/en/contact'
    }
  },
  openGraph: {
    title: 'Contacta con SACITIR | Transporte y Logística',
    description: 'Ponte en contacto con SACITIR para soluciones confiables de transporte y logística. Solicita una cotización o contacta a nuestro equipo para más información.',
    url: 'https://sacitir.es/es/contact',
    type: 'website',
    locale: 'es_ES',
    siteName: 'SACITIR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacta con SACITIR | Transporte y Logística',
    description: 'Ponte en contacto con SACITIR para soluciones confiables de transporte y logística. Solicita una cotización o contacta a nuestro equipo para más información.',
    site: '@sacitir'
  }
};

export default function Contact() {
  return <ContactClient />;
}

