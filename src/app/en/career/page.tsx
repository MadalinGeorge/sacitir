import CareerClient from '@/components/CareerClient';

export const metadata = {
  title: 'Work in a Transport Company | Truck Driver & Logistics Jobs at SACITIR',
  description: 'Looking for a job in a transport company? Join SACITIR and discover job opportunities for truck drivers, logistics, and administration. Grow your career in a leading company in the sector.',
  keywords: 'work in transport company, truck driver job, logistics job, transport jobs, transport company jobs, SACITIR, truck jobs, logistics jobs Spain, national transport jobs, international transport jobs',
  alternates: {
    canonical: 'https://sacitir.com/en/career',
    languages: {
      es: 'https://sacitir.es/es/career',
      en: 'https://sacitir.com/en/career'
    }
  },
  openGraph: {
    title: 'Work in a Transport Company | Truck Driver & Logistics Jobs at SACITIR',
    description: 'Looking for a job in a transport company? Join SACITIR and discover job opportunities for truck drivers, logistics, and administration. Grow your career in a leading company in the sector.',
    url: 'https://sacitir.com/en/career',
    type: 'website',
    locale: 'en_US',
    siteName: 'SACITIR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work in a Transport Company | Truck Driver & Logistics Jobs at SACITIR',
    description: 'Looking for a job in a transport company? Join SACITIR and discover job opportunities for truck drivers, logistics, and administration. Grow your career in a leading company in the sector.',
    site: '@sacitir'
  }
};

export default function Career() {
  return <CareerClient />;
}
