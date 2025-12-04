"use client";

import React, { useEffect, useRef, useMemo } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { CheckCircle, Award, Globe, Truck, Shield, Clock, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImagePath } from '@/lib/utils';

export default function About() {
  const { t, locale } = useLocale();
  const [counters, setCounters] = React.useState<{
    fleet: number;
    cities: number;
    years: number;
  }>({
    fleet: 0,
    cities: 0,
    years: 0
  });
  const [mounted, setMounted] = React.useState(false);
  const statsRef = useRef(null);

  const stats = useMemo(() => [
    { icon: Truck, number: 20, label: t('about.stats.fleet'), key: 'fleet' as const },
    { icon: Globe, number: 50, label: t('about.stats.cities'), key: 'cities' as const },
    { icon: Award, number: 10, label: t('about.stats.years'), key: 'years' as const },
  ], [t]);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          stats.forEach(({ key, number }) => {
            let startValue = 0;
            const duration = 2000;
            const increment = Math.ceil(number / (duration / 50));
            const timer = setInterval(() => {
              startValue += increment;
              if (startValue > number) {
                startValue = number;
                clearInterval(timer);
              }
              setCounters(prev => ({ ...prev, [key]: startValue }));
            }, 50);
            return () => clearInterval(timer);
          });
        }
      },
      { threshold: 0.5 }
    );
    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [stats]);

  return (
    <div>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-mainRed">
              {t('about.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-secondaryBlack/80 max-w-2xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>
      <section 
        ref={statsRef}
        className="relative py-24 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${getImagePath('/images/hero/hero-1.png')})` }}
      >
        <div className="absolute inset-0 bg-secondaryBlack/70"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-mainRed/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-mainRed transition-colors duration-300"
                >
                  <stat.icon className="w-10 h-10 text-mainRed group-hover:text-textWhite" />
                </motion.div>
                <div className="text-4xl lg:text-5xl font-bold text-textWhite mb-3">
                  {mounted ? counters[stat.key] : 0}+
                </div>
                <div className="text-textWhite/90 text-xl font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-secondaryPlatinium">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack">
                {t('about.history.title')}
              </h2>
              <p className="text-lg text-secondaryBlack/80 leading-relaxed">
                {t('about.history.content')}
              </p>
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-mainRed mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondaryBlack">{t('about.heritage.family')}</h4>
                    <p className="text-secondaryBlack/80">{t('about.heritage.familyDesc')}</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-mainRed mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondaryBlack">{t('about.heritage.growth')}</h4>
                    <p className="text-secondaryBlack/80">{t('about.heritage.growthDesc')}</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-mainRed mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondaryBlack">{t('about.heritage.leadership')}</h4>
                    <p className="text-secondaryBlack/80">{t('about.heritage.leadershipDesc')}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src={getImagePath("/images/about/history.jpg")}
                alt="SACITIR history"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="section bg-textWhite">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card p-8 lg:p-10 h-full"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mb-6"
              >
                <Award className="w-8 h-8 text-mainRed" />
              </motion.div>
              <h3 className="text-2xl lg:text-3xl font-bold text-secondaryBlack mb-6">
                {t('about.mission.title')}
              </h3>
              <p className="text-lg text-secondaryBlack/80 leading-relaxed">
                {t('about.mission.content')}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-8 lg:p-10 h-full"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mb-6"
              >
                <Globe className="w-8 h-8 text-mainRed" />
              </motion.div>
              <h3 className="text-2xl lg:text-3xl font-bold text-secondaryBlack mb-6">
                {t('about.vision.title')}
              </h3>
              <p className="text-lg text-secondaryBlack/80 leading-relaxed">
                {t('about.vision.content')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="section bg-secondaryPlatinium">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-lg text-secondaryBlack/80 max-w-2xl mx-auto">
              {t('about.values.description')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="card p-8 group transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-mainRed transition-colors"
                >
                  <value.icon className="w-8 h-8 text-mainRed group-hover:text-textWhite" />
                </motion.div>
                <h4 className="text-xl font-bold text-secondaryBlack mb-4">
                  {t(value.titleKey)}
                </h4>
                <p className="text-secondaryBlack/80 leading-relaxed">
                  {t(value.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-mainRed relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 text-center text-textWhite"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t('about.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-textWhite/90 max-w-2xl mx-auto">
            {t('about.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/${locale}/contact`}
                className="btn-secondary inline-flex items-center justify-center"
              >
                {t('about.cta.button')}
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/${locale}/services`}
                className="btn-secondary inline-flex items-center justify-center"
              >
                {t('about.cta.learnMore')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 