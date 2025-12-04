'use client';

import { useLocale } from '@/context/LocaleContext';

interface StructuredDataProps {
  type?: 'organization' | 'localBusiness' | 'service' | 'jobPosting';
  jobData?: {
    title: string;
    description: string;
    location: string;
    salary?: string;
    type: string;
  };
}

export default function StructuredData({ type = 'organization', jobData }: StructuredDataProps) {
  const { locale } = useLocale();

  const baseUrl = locale === 'es' ? 'https://sacitir.es' : 'https://sacitir.com';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SACITIR",
    "alternateName": "Transportes SACITIR",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo/logo-full.jpg`,
    "description": locale === 'es' 
      ? "Empresa especializada en transporte nacional e internacional de mercancías por carretera. Especialistas en transporte frigorífico."
      : "Company specialized in national and international road freight transport. Specialists in refrigerated transport.",
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "SACITIR Founders"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Transporte 123",
      "addressLocality": "Madrid",
      "postalCode": "28001",
      "addressCountry": "ES"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+34-91-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"],
      "areaServed": ["ES", "EU"]
    },
    "sameAs": [
      "https://twitter.com/sacitir",
      "https://www.linkedin.com/company/sacitir"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    "name": "SACITIR - Transporte de Mercancías",
    "image": `${baseUrl}/images/logo/logo-full.jpg`,
    "telephone": "+34-91-123-4567",
    "email": "info@sacitir.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Transporte 123",
      "addressLocality": "Madrid",
      "postalCode": "28001",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.4168,
      "longitude": -3.7038
    },
    "url": baseUrl,
    "openingHours": "Mo-Fr 08:00-18:00",
    "priceRange": "$$",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 40.4168,
        "longitude": -3.7038
      },
      "geoRadius": "500 km"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'es' ? "Servicios de Transporte" : "Transport Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'es' ? "Transporte Nacional e Internacional" : "National & International Transport"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'es' ? "Transporte Frigorífico" : "Refrigerated Transport"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'es' ? "Soluciones Logísticas" : "Logistics Solutions"
          }
        }
      ]
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": locale === 'es' ? "Transporte de Mercancías" : "Freight Transport",
    "provider": {
      "@type": "Organization",
      "name": "SACITIR"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Spain"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'es' ? "Servicios de Transporte" : "Transport Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": locale === 'es' ? "Transporte Nacional e Internacional" : "National & International Transport",
          "description": locale === 'es' 
            ? "Transporte de mercancías a nivel nacional e internacional con seguimiento GPS."
            : "National and international freight transport with GPS tracking."
        },
        {
          "@type": "OfferCatalog",
          "name": locale === 'es' ? "Transporte Frigorífico" : "Refrigerated Transport",
          "description": locale === 'es'
            ? "Transporte de productos perecederos con control de temperatura."
            : "Transport of perishable products with temperature control."
        },
        {
          "@type": "OfferCatalog",
          "name": locale === 'es' ? "Soluciones Logísticas" : "Logistics Solutions",
          "description": locale === 'es'
            ? "Soluciones logísticas personalizadas para optimizar la cadena de suministro."
            : "Customized logistics solutions to optimize the supply chain."
        }
      ]
    }
  };

  const jobPostingSchema = jobData ? {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": jobData.title,
    "description": jobData.description,
    "datePosted": new Date().toISOString().split('T')[0],
    "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    "employmentType": jobData.type === "Tiempo completo" || jobData.type === "Full-time" ? "FULL_TIME" : "PART_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "SACITIR",
      "sameAs": baseUrl,
      "logo": `${baseUrl}/images/logo/logo-full.jpg`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": jobData.location,
        "addressCountry": "ES"
      }
    },
    ...(jobData.salary && {
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": {
          "@type": "QuantitativeValue",
          "value": jobData.salary,
          "unitText": "YEAR"
        }
      }
    })
  } : null;

  const getSchema = () => {
    switch (type) {
      case 'localBusiness':
        return localBusinessSchema;
      case 'service':
        return serviceSchema;
      case 'jobPosting':
        return jobPostingSchema;
      default:
        return organizationSchema;
    }
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

