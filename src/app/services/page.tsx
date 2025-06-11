'use client';

import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { useLocale } from '@/context/LocaleContext';
import { Truck, Snowflake, Package, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const { t } = useLocale();

  const services = [
    {
      icon: Truck,
      key: 'national',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      cardAccent: 'bg-blue-600'
    },
    {
      icon: Snowflake,
      key: 'refrigerated',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-700',
      cardAccent: 'bg-cyan-600'
    },
    {
      icon: Package,
      key: 'logistics',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
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
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <Parallax speed={-20} className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")',
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
          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={service.key} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <Parallax speed={index % 2 === 0 ? -5 : 5}>
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className={`${service.iconBg} w-16 h-16 rounded-full flex items-center justify-center`}>
                      <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                    </div>
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
                      className={`btn-primary ${service.buttonBg} inline-flex items-center`}
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
                    <div className={`absolute -bottom-6 -right-6 ${service.cardAccent} text-white p-6 rounded-xl shadow-xl`}>
                      <service.icon className="w-8 h-8" />
                    </div>
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

