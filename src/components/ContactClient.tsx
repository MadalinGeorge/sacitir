"use client";

import React, { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const getTranslation = (t: (key: string) => string | string[], key: string): string => {
  const translation = t(key);
  return Array.isArray(translation) ? translation[0] : translation;
};

export default function ContactClient() {
  const { t, locale } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, locale }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message');
        setTimeout(() => {
          setSubmitStatus('idle');
          setErrorMessage('');
        }, 3000);
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl text-mainRed md:text-4xl lg:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-lg text-secondaryBlack/80 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="card">
              <h2 className="text-xl font-bold mb-6">{t('contact.getInTouch')}</h2>
              <p className="text-secondaryBlack/80 mb-6">{t('contact.getInTouchDescription')}</p>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-mainRed/10 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-mainRed" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('contact.info.email')}</h3>
                    <a href="mailto:info@sacitir.com" className="text-mainRed hover:underline">
                      info@sacitir.com
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-mainRed/10 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-mainRed" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('contact.info.phone')}</h3>
                    <a href="tel:+34911234567" className="text-mainRed hover:underline">
                      +34 91 123 4567
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-mainRed/10 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-mainRed" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('contact.info.address')}</h3>
                    <p className="text-secondaryBlack/80">
                      Calle Ejemplo 123<br />
                      28001 Madrid, España
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-mainRed/10 p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-mainRed" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('contact.info.hours')}</h3>
                    <p className="text-secondaryBlack/80">
                      {t('contact.info.weekdays')}: 9:00 - 18:00<br />
                      {t('contact.info.weekend')}: {t('contact.info.closed')}
                    </p>
                  </div>
                </motion.div>
              </div>
              
              {/* Google Map */}
              <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.6!2d-3.7038!3d40.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAwLjUiTiAzwrA0MicxMy43Ilc!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={locale === 'es' ? 'Ubicación de SACITIR' : 'SACITIR Location'}
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <h2 className="text-xl font-bold mb-6">{t('contact.form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label htmlFor="name" className="form-label">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={getTranslation(t, 'contact.form.namePlaceholder')}
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label htmlFor="email" className="form-label">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={getTranslation(t, 'contact.form.emailPlaceholder')}
                      required
                    />
                  </motion.div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label htmlFor="subject" className="form-label">{t('contact.form.subject')}</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={getTranslation(t, 'contact.form.subjectPlaceholder')}
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label htmlFor="message" className="form-label">{t('contact.form.message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={getTranslation(t, 'contact.form.messagePlaceholder')}
                      rows={4}
                      required
                    />
                  </motion.div>
                </div>
                <button
                  type="submit"
                  className="bg-mainRed text-white px-6 py-2 rounded hover:bg-mainRed/90 transition w-full"
                  disabled={submitStatus === 'loading'}
                >
                  {submitStatus === 'loading' ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
                {submitStatus === 'success' && (
                  <div className="flex items-center text-green-600 mt-2">
                    <CheckCircle className="w-5 h-5 mr-2" /> {t('contact.form.success')}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center text-red-600 mt-2">
                    <AlertCircle className="w-5 h-5 mr-2" /> 
                    {errorMessage || t('contact.form.error')}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 