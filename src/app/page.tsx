'use client';

import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { useLocale } from '@/context/LocaleContext';
import { ArrowRight, CheckCircle, Truck, Snowflake, Package } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t } = useLocale();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-secondaryBlack/60 to-secondaryBlack/50 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/home/home-1.png')] bg-cover bg-center"></div>

        <div className="container relative z-20 text-textWhite mt-24">
          <div className="max-w-3xl">
            <Parallax speed={-10}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-textWhite/90 mb-10 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex"
                >
                  {t('home.hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/about"
                  className="btn-outline inline-flex"
                >
                  {t('home.hero.learnMore')}
                </Link>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondaryPlatinium">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-gap items-center">
            <div className="space-y-8 mb-12 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack">
                {t('home.about.title')}
              </h2>
              <p className="text-lg text-secondaryBlack/80 leading-relaxed">
                {t('home.about.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-mainRed">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t('home.about.experience')}</span>
                </div>
                <div className="flex items-center space-x-2 text-mainRed">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t('home.about.coverage')}</span>
                </div>
                <div className="flex items-center space-x-2 text-mainRed">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t('home.about.support')}</span>
                </div>
              </div>
            </div>

            <Parallax translateX={[20, 0]} opacity={[0.80, 1]}>
              <div className="relative">
                <img
                  src="/images/home/home-1.png"
                  alt="SACITIR trucks"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondaryPlatinium">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack mb-6">
              {t('home.services.title')}
            </h2>
            <Link
              href="/services"
              className="text-mainRed font-medium inline-flex items-center relative group"
            >
              {t('home.services.viewAll')}
              <ArrowRight className="w-4 h-4 ml-1" />
              <span className="absolute -bottom-1 left-0 right-0 w-0 h-0.5 bg-mainRed transition-all duration-300 group-hover:w-full mx-auto" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* National Transport */}
              <div className="card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-mainRed transition-colors">
                  <Truck className="w-8 h-8 text-mainRed group-hover:text-textWhite" />
                </div>
                <h3 className="text-xl font-bold text-secondaryBlack mb-4">
                  {t('home.services.national.title')}
                </h3>
                <p className="text-secondaryBlack/80">
                  {t('home.services.national.description')}
                </p>
              </div>

            {/* Refrigerated Transport */}
              <div className="card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-mainRed transition-colors">
                  <Snowflake className="w-8 h-8 text-mainRed group-hover:text-textWhite" />
                </div>
                <h3 className="text-xl font-bold text-secondaryBlack mb-4">
                  {t('home.services.refrigerated.title')}
                </h3>
                <p className="text-secondaryBlack/80">
                  {t('home.services.refrigerated.description')}
                </p>
              </div>

            {/* Logistics Solutions */}
              <div className="card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-mainRed transition-colors">
                  <Package className="w-8 h-8 text-mainRed group-hover:text-textWhite" />
                </div>
                <h3 className="text-xl font-bold text-secondaryBlack mb-4">
                  {t('home.services.logistics.title')}
                </h3>
                <p className="text-secondaryBlack/80">
                  {t('home.services.logistics.description')}
                </p>
              </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-mainRed">
        <div className="container relative z-10 text-center text-textWhite">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-10 text-textWhite/90 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </p>
          <Link
            href="/contact"
            className="btn-secondary inline-flex items-center"
          >
            {t('home.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
