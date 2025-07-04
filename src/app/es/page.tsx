import HomeClient from '@/components/HomeClient';

export const metadata = {
  title: "SACITIR - Transporte de Mercancías por Carretera | Nacional e Internacional",
  description: "Empresa líder en transporte nacional e internacional de mercancías por carretera. Especialistas en transporte frigorífico, logística y soluciones seguras para tu carga en España y Europa.",
  keywords: "transporte de mercancías, transporte nacional, transporte internacional, transporte frigorífico, logística, camiones, SACITIR, España, soluciones logísticas, carga segura",
  alternates: {
    canonical: "https://sacitir.es/es",
    languages: {
      es: "https://sacitir.es/es",
      en: "https://sacitir.com/en"
    }
  },
  openGraph: {
    title: "SACITIR - Transporte de Mercancías por Carretera | Nacional e Internacional",
    description: "Empresa líder en transporte nacional e internacional de mercancías por carretera. Especialistas en transporte frigorífico, logística y soluciones seguras para tu carga en España y Europa.",
    url: "https://sacitir.es/es",
    type: "website",
    locale: "es_ES",
    siteName: "SACITIR"
  },
  twitter: {
    card: "summary_large_image",
    title: "SACITIR - Transporte de Mercancías por Carretera | Nacional e Internacional",
    description: "Empresa líder en transporte nacional e internacional de mercancías por carretera. Especialistas en transporte frigorífico, logística y soluciones seguras para tu carga en España y Europa.",
    site: "@sacitir"
  }
};

export default function Home() {
  return <HomeClient />;
}
