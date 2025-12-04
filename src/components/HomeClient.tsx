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
  const { t, locale } = useLocale();

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
                  href={`/${locale}/contact`}
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
                  href={`/${locale}/about`}
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
              href={`/${locale}/services`}
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

      {/* Trust Elements - Stats & Certifications */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack mb-4">
              {t('home.trust.title')}
            </h2>
            <p className="text-lg text-secondaryBlack/70 max-w-2xl mx-auto">
              {t('home.trust.description')}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { number: '20+', label: t('home.trust.stats.vehicles') },
              { number: '50+', label: t('home.trust.stats.cities') },
              { number: '500+', label: t('home.trust.stats.deliveries') },
              { number: '98%', label: t('home.trust.stats.satisfaction') },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-secondaryPlatinium/50 border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-mainRed mb-2">{stat.number}</div>
                <div className="text-sm text-secondaryBlack/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Certifications/Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚚', text: t('home.trust.features.euro6') },
              { icon: '📍', text: t('home.trust.features.gps') },
              { icon: '🛡️', text: t('home.trust.features.insurance') },
              { icon: '⏰', text: t('home.trust.features.support') },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-sm font-medium text-secondaryBlack">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondaryPlatinium">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack mb-4">
              {t('home.testimonials.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'María García',
                company: 'Distribuciones García S.L.',
                text: t('home.testimonials.1.text'),
                rating: 5
              },
              {
                name: 'Carlos Rodríguez',
                company: 'Fresh Foods Export',
                text: t('home.testimonials.2.text'),
                rating: 5
              },
              {
                name: 'Ana Martínez',
                company: 'Logística Norte',
                text: t('home.testimonials.3.text'),
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-secondaryBlack/80 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-mainRed/10 rounded-full flex items-center justify-center">
                    <span className="text-mainRed font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-secondaryBlack">{testimonial.name}</p>
                    <p className="text-sm text-secondaryBlack/60">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
              href={`/${locale}/contact`}
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