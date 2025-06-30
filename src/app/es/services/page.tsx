import ServicesClient from '@/components/ServicesClient';

export const metadata = {
  title: "Servicios de Transporte de Mercancías | SACITIR España",
  description: "Descubre todos los servicios de SACITIR: transporte nacional e internacional, transporte frigorífico, logística y soluciones integrales para tu carga. Más de 20 años de experiencia en el sector.",
  keywords: "servicios de transporte, transporte frigorífico, transporte nacional, transporte internacional, logística, SACITIR, camiones, soluciones logísticas, España",
  alternates: {
    canonical: "https://sacitir.es/es/services",
    languages: {
      es: "https://sacitir.es/es/services",
      en: "https://sacitir.com/en/services"
    }
  },
  openGraph: {
    title: "Servicios de Transporte de Mercancías | SACITIR España",
    description: "Descubre todos los servicios de SACITIR: transporte nacional e internacional, transporte frigorífico, logística y soluciones integrales para tu carga. Más de 20 años de experiencia en el sector.",
    url: "https://sacitir.es/es/services",
    type: "website",
    locale: "es_ES",
    siteName: "SACITIR"
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Transporte de Mercancías | SACITIR España",
    description: "Descubre todos los servicios de SACITIR: transporte nacional e internacional, transporte frigorífico, logística y soluciones integrales para tu carga. Más de 20 años de experiencia en el sector.",
    site: "@sacitir"
  }
};

export default function Services() {
  return <ServicesClient />;
}

