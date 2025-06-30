import CareerClient from '@/components/CareerClient';

export const metadata = {
  title: 'Trabaja en empresa de transporte | Empleo de camionero y logística en SACITIR',
  description: '¿Buscas trabajo en una empresa de transporte? Únete a SACITIR y encuentra ofertas de empleo para camioneros, logística y administración. Crece profesionalmente en una empresa líder del sector.',
  keywords: 'trabajar en empresa de transporte, empleo camionero, empleo logística, trabajo transporte, ofertas de trabajo transporte, SACITIR, empleo camiones, empleo logística Madrid, empleo transporte nacional, empleo transporte internacional',
  alternates: {
    canonical: 'https://sacitir.es/es/career',
    languages: {
      es: 'https://sacitir.es/es/career',
      en: 'https://sacitir.com/en/career'
    }
  },
  openGraph: {
    title: 'Trabaja en empresa de transporte | Empleo de camionero y logística en SACITIR',
    description: '¿Buscas trabajo en una empresa de transporte? Únete a SACITIR y encuentra ofertas de empleo para camioneros, logística y administración. Crece profesionalmente en una empresa líder del sector.',
    url: 'https://sacitir.es/es/career',
    type: 'website',
    locale: 'es_ES',
    siteName: 'SACITIR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trabaja en empresa de transporte | Empleo de camionero y logística en SACITIR',
    description: '¿Buscas trabajo en una empresa de transporte? Únete a SACITIR y encuentra ofertas de empleo para camioneros, logística y administración. Crece profesionalmente en una empresa líder del sector.',
    site: '@sacitir'
  }
};

export default function Career() {
  return <CareerClient />;
}
