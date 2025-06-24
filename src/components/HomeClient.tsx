'use client';
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { ArrowRight, CheckCircle, Truck, Snowflake, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImagePath } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string | string[];
  description: string | string[];
  delay?: number;
}

function ServiceCard({ icon: Icon, title, description, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      className="card p-8 text-center group hover:scale-105 transition-all duration-300"
    >
      <motion.div 
        className="bg-mainRed/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-mainRed transition-colors"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-8 h-8 text-mainRed group-hover:text-textWhite" />
      </motion.div>
      <h3 className="text-xl font-bold text-secondaryBlack mb-4">
        {Array.isArray(title) ? title[0] : title}
      </h3>
      <p className="text-secondaryBlack/80">
        {Array.isArray(description) ? description[0] : description}
      </p>
    </motion.div>
  );
}

export default function HomeClient() {
  const { t } = useLocale();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-secondaryBlack/60 to-secondaryBlack/50 z-10"></div>
        <motion.div 
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            backgroundImage: `url(${getImagePath('/images/home/home-1.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          className="absolute inset-0"
        ></motion.div>

        <div className="container relative z-20 text-textWhite mt-12 md:mt-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className="text-4xl text-mainRed md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
                {t('home.hero.title')}
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <p className="text-xl md:text-2xl text-textWhite/90 mb-8 md:mb-10 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="btn-primary inline-flex"
                >
                  {t('home.hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="btn-primary inline-flex"
                >
                  {t('home.hero.learnMore')}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondaryPlatinium">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-gap items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8 mb-12 lg:mb-0"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack">
                {t('home.about.title')}
              </h2>
              <p className="text-lg text-secondaryBlack/80 leading-relaxed">
                {t('home.about.description')}
              </p>
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center space-x-2 text-mainRed"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t('home.about.experience')}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center space-x-2 text-mainRed"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t('home.about.coverage')}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center space-x-2 text-mainRed"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t('home.about.support')}</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src={getImagePath("/images/home/home-1.png")}
                alt="SACITIR trucks"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondaryPlatinium">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* National Transport */}
            <ServiceCard 
              icon={Truck}
              title={t('home.services.national.title')}
              description={t('home.services.national.description')}
              delay={0}
            />

            {/* Refrigerated Transport */}
            <ServiceCard 
              icon={Snowflake}
              title={t('home.services.refrigerated.title')}
              description={t('home.services.refrigerated.description')}
              delay={1}
            />

            {/* Logistics Solutions */}
            <ServiceCard 
              icon={Package}
              title={t('home.services.logistics.title')}
              description={t('home.services.logistics.description')}
              delay={2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-mainRed">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 text-center text-textWhite"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-10 text-textWhite/90 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="btn-secondary inline-flex items-center"
            >
              {t('home.cta.button')}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
} 