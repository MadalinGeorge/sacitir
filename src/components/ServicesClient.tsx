'use client';
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImagePath } from '@/lib/utils';

export default function ServicesClient() {
  const { t, locale } = useLocale();

  const getTranslation = (key: string): string => {
    const translation = t(key);
    return Array.isArray(translation) ? translation[0] : translation;
  };

  const services = [
    {
      key: 'national',
      image: getImagePath('/images/services/services-1.jpg'),
    },
    {
      key: 'refrigerated',
      image: getImagePath('/images/services/services-2.png'),
    },
    {
      key: 'logistics',
      image: getImagePath('/images/services/services-3.png'),
    }
  ];

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
      <section className="relative h-[82vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getImagePath('/images/hero/hero-2.png')})`,
            }}
          />
        </motion.div>

        <div className="relative z-10 text-center text-white mb-80 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="text-4xl text-mainRed sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              {t('services.title')}
            </h1>
            <p className="text-xl text-textWhite sm:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section bg-white">
        <div className="container">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div key={service.key} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack">
                      {t(`services.${service.key}.title`)}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {t(`services.${service.key}.description`)}
                    </p>
                    <div className="space-y-3">
                      {getFeatures(service.key).map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-mainRed" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={`/${locale}/contact`}
                        className="btn-primary-white-bg inline-flex items-center"
                      >
                        {t('services.learnMore')}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                >
                  <Image
                    src={service.image}
                    alt={getTranslation(`services.${service.key}.title`)}
                    width={600}
                    height={400}
                    className="rounded-xl shadow-2xl w-full h-80 lg:h-96 object-cover"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-mainRed relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 text-center text-white"
        >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              {t('services.cta.description')}
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
                  {t('services.cta.button')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/${locale}/about`}
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  {t('services.cta.learnMore')}
                </Link>
              </motion.div>
            </div>
        </motion.div>
      </section>
    </div>
  );
} 