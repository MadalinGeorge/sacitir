'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { CheckCircle, Users, Award, Globe, Truck, Shield, Clock, Heart } from 'lucide-react';
import Link from 'next/link';


export default function About() {
  const { t } = useLocale();

  const stats = [
    { icon: Truck, number: '500+', label: 'Fleet Vehicles' },
    { icon: Users, number: '150+', label: 'Team Members' },
    { icon: Globe, number: '50+', label: 'Cities Served' },
    { icon: Award, number: '20+', label: 'Years Experience' },
  ];

  const values = [
    {
      icon: Shield,
      titleKey: 'about.values.safety.title',
      descriptionKey: 'about.values.safety.description'
    },
    {
      icon: Clock,
      titleKey: 'about.values.reliability.title',
      descriptionKey: 'about.values.reliability.description'
    },
    {
      icon: Heart,
      titleKey: 'about.values.customer.title',
      descriptionKey: 'about.values.customer.description'
    },
    {
      icon: Globe,
      titleKey: 'about.values.sustainability.title',
      descriptionKey: 'about.values.sustainability.description'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-mainRed via-mainRed/90 to-mainRed/80">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/hero/hero-1.png")',
            }}
          />
        </div>

        <div className="relative z-10 text-center text-textWhite px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl text-mainRed sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('about.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-textWhite/90 max-w-2xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-textWhite -mt-16 relative z-10">
        <div className="container">
          <div className="bg-textWhite rounded-2xl shadow-2xl p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-mainRed transition-colors duration-300">
                    <stat.icon className="w-8 h-8 text-mainRed group-hover:text-textWhite" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-secondaryBlack mb-2">
                    {stat.number}
                  </div>
                  <div className="text-secondaryBlack/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section bg-secondaryPlatinium">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack">
                {t('about.history.title')}
              </h2>
              <p className="text-lg text-secondaryBlack/80 leading-relaxed">
                {t('about.history.content')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-mainRed mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondaryBlack">{t('about.heritage.family')}</h4>
                    <p className="text-secondaryBlack/80">{t('about.heritage.familyDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-mainRed mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondaryBlack">{t('about.heritage.growth')}</h4>
                    <p className="text-secondaryBlack/80">{t('about.heritage.growthDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-mainRed mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondaryBlack">{t('about.heritage.leadership')}</h4>
                    <p className="text-secondaryBlack/80">{t('about.heritage.leadershipDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/about/history.jpg"
                alt="SACITIR history"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-textWhite">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card p-8 lg:p-10 h-full">
              <div className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-mainRed" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-secondaryBlack mb-6">
                {t('about.mission.title')}
              </h3>
              <p className="text-lg text-secondaryBlack/80 leading-relaxed">
                {t('about.mission.content')}
              </p>
            </div>

            <div className="card p-8 lg:p-10 h-full">
              <div className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-mainRed" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-secondaryBlack mb-6">
                {t('about.vision.title')}
              </h3>
              <p className="text-lg text-secondaryBlack/80 leading-relaxed">
                {t('about.vision.content')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-secondaryPlatinium">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-lg text-secondaryBlack/80 max-w-2xl mx-auto">
              {t('about.values.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-8 group hover:scale-105 transition-all duration-300">
                <div className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-mainRed transition-colors">
                  <value.icon className="w-8 h-8 text-mainRed group-hover:text-textWhite" />
                </div>
                <h4 className="text-xl font-bold text-secondaryBlack mb-4">
                  {t(value.titleKey)}
                </h4>
                <p className="text-secondaryBlack/80 leading-relaxed">
                  {t(value.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-mainRed relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="container relative z-10 text-center text-textWhite">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t('about.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-textWhite/90 max-w-2xl mx-auto">
            {t('about.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-secondary"
            >
              {t('about.cta.button')}
            </Link>
            <Link
              href="/services"
              className="btn-secondary"
            >
              {t('about.cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

