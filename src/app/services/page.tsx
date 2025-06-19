'use client';

import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { useLocale } from '@/context/LocaleContext';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const { t } = useLocale();

  const services = [
    {
      key: 'national',
      image: '/images/services/services-1.jpg',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      cardAccent: 'bg-blue-600'
    },
    {
      key: 'refrigerated',
      image: '/images/services/services-2.png',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-700',
      cardAccent: 'bg-cyan-600'
    },
    {
      key: 'logistics',
      image: '/images/services/services-3.jpg',
      buttonBg: 'bg-green-600 hover:bg-green-700',
      cardAccent: 'bg-green-600'
    }
  ];

  // Helper function to safely get features array
  const getFeatures = (key: string): string[] => {
    try {
      const features = t(`services.${key}.features`);
      if (Array.isArray(features)) {
        return features;
      }
      return [];
    } catch (error) {
      console.error(`Error getting features for ${key}:`, error);
      return [];
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <Parallax speed={-20} className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/hero/hero-2.png")',
            }}
          />
        </Parallax>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Parallax speed={5}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('services.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </Parallax>
        </div>
      </section>

      {/* Main Services */}
      <section className="section bg-white">
        <div className="container">
          <div className="space-y-32"> {/* Increased spacing between service items */}
            {services.map((service, index) => (
              <div key={service.key} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <Parallax speed={index % 2 === 0 ? -5 : 5}>
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      {t(`services.${service.key}.title`)}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {t(`services.${service.key}.description`)}
                    </p>
                    <div className="space-y-3">
                      {getFeatures(service.key).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="btn-primary  text-secondaryBlack inline-flex items-center"
                    >
                      {t('services.learnMore')}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </Parallax>

                <Parallax speed={index % 2 === 0 ? 5 : -5}>
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <img
                      src={service.image}
                      alt={t(`services.${service.key}.title`)}
                      className="rounded-xl shadow-2xl w-full h-80 lg:h-96 object-cover"
                    />
                  </div>
                </Parallax>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section gradient-primary relative overflow-hidden">
        <Parallax speed={-15} className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20" />
        </Parallax>
        
        <div className="container relative z-10 text-center text-white">
          <Parallax speed={5}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              {t('services.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-secondary bg-white text-blue-600 hover:bg-gray-100 inline-flex items-center justify-center"
              >
                {t('services.cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/about"
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-900 inline-flex items-center justify-center"
              >
                {t('services.cta.learnMore')}
              </Link>
            </div>
          </Parallax>
        </div>
      </section>
    </div>
  );
}

