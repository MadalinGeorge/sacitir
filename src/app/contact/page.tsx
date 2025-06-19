'use client';

import React, { useState, useRef } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const { t } = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      // EmailJS configuration - Replace with your actual values
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

      if (formRef.current) {
        const result = await emailjs.sendForm(
          serviceId,
          templateId,
          formRef.current,
          publicKey
        );
        
        console.log('Email sent successfully:', result.text);
        setSubmitStatus('success');
        
        // Reset form after successful submission
        setTimeout(() => {
          setSubmitStatus('idle');
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      // Reset status after delay
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl text-mainRed md:text-4xl lg:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-lg text-secondaryBlack/80 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card">
              <h2 className="text-xl font-bold mb-6">{t('contact.getInTouch')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-mainRed/10 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-mainRed" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('contact.email')}</h3>
                    <a href="mailto:info@sacitir.com" className="text-mainRed hover:underline">
                      info@sacitir.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-mainRed/10 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-mainRed" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('contact.phone')}</h3>
                    <a href="tel:+34911234567" className="text-mainRed hover:underline">
                      +34 91 123 4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-mainRed/10 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-mainRed" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('contact.address')}</h3>
                    <p className="text-secondaryBlack/80">
                      Calle Ejemplo 123<br />
                      28001 Madrid, España
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-mainRed/10 p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-mainRed" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('contact.hours')}</h3>
                    <p className="text-secondaryBlack/80">
                      {t('contact.weekdays')}: 9:00 - 18:00<br />
                      {t('contact.weekend')}: {t('contact.closed')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-bold mb-6">{t('contact.sendMessage')}</h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">{t('contact.name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">{t('contact.email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="form-label">{t('contact.subject')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('contact.form.subjectPlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="form-label">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input"
                    rows={4}
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full btn-primary-white-bg disabled:cursor-not-allowed inline-flex items-center justify-center py-4"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-textWhite mr-2"></div>
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
                {submitStatus === 'error' && (
                  <div className="flex items-center p-4 bg-mainRed/10 border border-mainRed/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-mainRed mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-mainRed font-medium">
                        {t('contact.form.error')}
                      </p>
                      <p className="text-mainRed/80 text-sm mt-1">
                        {t('contact.form.errorMessage')}
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

