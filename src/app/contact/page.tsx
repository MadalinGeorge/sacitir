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
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address'),
      content: '123 Main Street\nCity, State 12345\nUnited States',
      link: 'https://maps.google.com'
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      content: 'info@sacitir.com',
      link: 'mailto:info@sacitir.com'
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      content: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed',
      link: null
    }
  ];

  const quickActions = [
    {
      icon: Phone,
      titleKey: 'contact.quickActions.call.title',
      descriptionKey: 'contact.quickActions.call.description',
      buttonKey: 'contact.quickActions.call.button',
      link: 'tel:+15551234567'
    },
    {
      icon: Mail,
      titleKey: 'contact.quickActions.email.title',
      descriptionKey: 'contact.quickActions.email.description',
      buttonKey: 'contact.quickActions.email.button',
      link: 'mailto:quotes@sacitir.com'
    },
    {
      icon: MessageSquare,
      titleKey: 'contact.quickActions.chat.title',
      descriptionKey: 'contact.quickActions.chat.description',
      buttonKey: 'contact.quickActions.chat.button',
      link: null
    }
  ];

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('contact.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8 lg:p-10">
              <div className="flex items-center mb-8">
                <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  {t('contact.form.title')}
                </h2>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('contact.form.success')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('contact.form.successMessage')}
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder={t('contact.form.subjectPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      rows={6}
                      name="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full btn-primary bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center py-4"
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
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
                    <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-red-600 dark:text-red-400 font-medium">
                          {t('contact.form.error')}
                        </p>
                        <p className="text-red-500 dark:text-red-500 text-sm mt-1">
                          {t('contact.form.errorMessage')}
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  {t('contact.getInTouch.title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  {t('contact.getInTouch.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group">
                    {info.link ? (
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="card p-6 block hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                      >
                        <div className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                            <info.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {info.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                              {info.content}
                            </p>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="card p-6">
                        <div className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
                            <info.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {info.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                              {info.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contact.location.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('contact.location.description')}
            </p>
          </div>
          
          {/* Map Placeholder - Replace with actual map integration */}
          <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {t('contact.location.mapPlaceholder')}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  {t('contact.location.mapNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('contact.immediateAssistance.title')}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('contact.immediateAssistance.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <div key={index} className="text-center">
                <action.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t(action.titleKey)}</h3>
                <p className="text-blue-100 mb-4">{t(action.descriptionKey)}</p>
                {action.link ? (
                  <a
                    href={action.link}
                    className="btn-secondary bg-white text-blue-600 hover:bg-gray-100 inline-flex items-center"
                  >
                    {t(action.buttonKey)}
                    <action.icon className="w-4 h-4 ml-2" />
                  </a>
                ) : (
                  <button className="btn-secondary bg-white text-blue-600 hover:bg-gray-100 inline-flex items-center">
                    {t(action.buttonKey)}
                    <action.icon className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

