'use client';

import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { useLocale } from '@/context/LocaleContext';
import { ArrowRight, CheckCircle, Truck, Snowflake, Package } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        {/* Background Parallax Layers */}
        <Parallax speed={-20} className="absolute inset-0">
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            }}
          />
        </Parallax>

        <Parallax speed={-10} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
        </Parallax>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <Parallax speed={5}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
          </Parallax>
          
          <Parallax speed={10}>
            <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
          </Parallax>

          <Parallax speed={15}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200"
              >
                {t('home.hero.cta')}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link
                href="/about"
                className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-900"
              >
                {t('home.hero.learnMore')}
              </Link>
            </div>
          </Parallax>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Parallax speed={-5}>
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  {t('home.about.title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('home.about.description')}
                </p>
                <div className="flex items-center space-x-2 text-blue-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t('home.about.experience')}</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t('home.about.coverage')}</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t('home.about.support')}</span>
                </div>
              </div>
            </Parallax>

            <Parallax speed={5}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                  alt="SACITIR trucks"
                  className="rounded-xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
                  <div className="text-3xl font-bold">{t('home.about.deliveries')}</div>
                  <div className="text-sm">{t('home.about.deliveriesText')}</div>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.services.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* National Transport */}
            <Parallax speed={-2}>
              <div className="card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                  <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('home.services.national.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('home.services.national.description')}
                </p>
              </div>
            </Parallax>

            {/* Refrigerated Transport */}
            <Parallax speed={0}>
              <div className="card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                  <Snowflake className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('home.services.refrigerated.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('home.services.refrigerated.description')}
                </p>
              </div>
            </Parallax>

            {/* Logistics Solutions */}
            <Parallax speed={2}>
              <div className="card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                  <Package className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('home.services.logistics.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('home.services.logistics.description')}
                </p>
              </div>
            </Parallax>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="btn-primary inline-flex items-center"
            >
              {t('home.services.viewAll')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
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
              {t('home.cta.title')}
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              {t('home.cta.description')}
            </p>
            <Link
              href="/contact"
              className="btn-secondary bg-white text-blue-600 hover:bg-gray-100 inline-flex items-center"
            >
              {t('home.cta.button')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Parallax>
        </div>
      </section>
    </div>
  );
}
