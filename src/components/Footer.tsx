'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import { Truck, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const { t } = useLocale();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const navLinks = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.services', href: '/services' },
    { key: 'nav.career', href: '/career' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const services = [
    'services.national.title',
    'services.refrigerated.title',
    'services.logistics.title',
  ];

  return (
    <footer className="bg-secondaryBlack text-textWhite pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Image 
                src="/images/logo/logo-solo-rojo.svg" 
                alt="SACITIR Logo" 
                width={32} 
                height={32} 
                className="w-8 h-8"
              />
              <span className="text-2xl font-bold">SACITIR</span>
            </div>
            <p className="text-textWhite/60 mb-6">
              {t('footer.description')}
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-mainRed mt-1" />
                <span className="text-textWhite/80">
                  {t('footer.address')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-mainRed" />
                <span className="text-textWhite/80">{t('footer.phone')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-mainRed" />
                <span className="text-textWhite/80">{t('footer.email')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-mainRed" />
                <span className="text-textWhite/80">{t('footer.hours')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-textWhite/20 pb-2">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link 
                    href={link.href}
                    className="text-textWhite/80 hover:text-mainRed transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-textWhite/20 pb-2">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    href="/services"
                    className="text-textWhite/80 hover:text-mainRed transition-colors"
                  >
                    {t(service)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-textWhite/20 pb-2">
              {t('footer.newsletter.title')}
            </h3>
            <p className="text-textWhite/60 mb-4">
              {t('footer.newsletter.description')}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="w-full px-4 py-2 bg-secondaryBlack/50 border border-textWhite/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainRed text-textWhite"
              />
              <button
                type="submit"
                className="w-full bg-mainRed hover:bg-mainRed/90 text-textWhite py-2 rounded-lg transition-colors"
              >
                {t('footer.newsletter.button')}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-textWhite/10 pt-8 text-center text-textWhite/60">
          <p>© {year} SACITIR. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

