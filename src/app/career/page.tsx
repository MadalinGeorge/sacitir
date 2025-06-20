'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { Briefcase, MapPin, Clock, DollarSign, Users, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import * as motion from 'motion/react-client';

interface JobOffer {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  salary?: string;
  description: string;
  requirements: string[];
  posted: string;
}

export default function Career() {
  const { t } = useLocale();
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simulate fetching jobs from Google Sheets API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual Google Sheets API call
        // const response = await fetch('/api/jobs'); // Your API endpoint
        // const data = await response.json();
        
        // Mock data for now - remove when implementing Google Sheets
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        const mockJobs: JobOffer[] = [
          {
            id: '1',
            title: 'Truck Driver',
            department: 'Operations',
            location: 'Nationwide',
            type: 'Full-time',
            salary: '$50,000 - $65,000',
            description: 'We are seeking experienced truck drivers to join our growing fleet.',
            requirements: ['Valid CDL license', '2+ years experience', 'Clean driving record'],
            posted: '2024-01-15'
          },
          {
            id: '2',
            title: 'Logistics Coordinator',
            department: 'Logistics',
            location: 'Main Office',
            type: 'Full-time',
            salary: '$45,000 - $55,000',
            description: 'Coordinate shipments and manage logistics operations.',
            requirements: ['Bachelor\'s degree preferred', 'Experience in logistics', 'Strong communication skills'],
            posted: '2024-01-10'
          }
        ];
        setJobs(mockJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job: JobOffer) => {
    setSelectedJob(job);
    setApplicationData(prev => ({ ...prev, position: job.title }));
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      // TODO: Implement form submission to your backend/email service
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate submission
      setSubmitStatus('success');
      setTimeout(() => {
        setShowApplicationForm(false);
        setSubmitStatus('idle');
        setApplicationData({ name: '', email: '', phone: '', position: '', message: '' });
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'bg-mainRed/10 text-mainRed';
      case 'part-time': return 'bg-mainRed/10 text-mainRed';
      case 'contract': return 'bg-mainRed/10 text-mainRed';
      default: return 'bg-secondaryPlatinium text-secondaryBlack';
    }
  };

  return (
    <div className="min-h-screen bg-textWhite">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-mainRed via-mainRed/90 to-mainRed/80 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center text-textWhite"
          >
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              {t('career.title')}
            </motion.h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                type: "spring",
                stiffness: 50
              }}
              className="text-xl sm:text-2xl text-textWhite/90 max-w-3xl mx-auto leading-relaxed"
            >
              {t('career.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="section bg-textWhite">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondaryBlack mb-4">
              {t('career.currentOpenings')}
            </h2>
            <p className="text-lg text-secondaryBlack/80 max-w-2xl mx-auto">
              {t('career.joinTeam')}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="rounded-full h-12 w-12 border-b-2 border-mainRed"
              ></motion.div>
              <span className="ml-4 text-secondaryBlack/80">{t('common.loading')}</span>
            </div>
          ) : jobs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="bg-secondaryPlatinium p-12 rounded-2xl shadow-lg inline-block">
                <motion.div
                  initial={{ y: 10 }}
                  animate={{ y: [10, -10, 10] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Briefcase className="w-16 h-16 text-mainRed mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-secondaryBlack mb-4">
                  {t('career.noJobs')}
                </h3>
                <p className="text-secondaryBlack/80 mb-6">
                  {t('career.checkBack')}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="btn-primary-white-bg inline-flex items-center"
                  >
                    {t('career.contactUs')}
                    <Send className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {jobs.map((job, index) => (
                <motion.div 
                  key={job.id} 
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -30 : 30,
                    y: 50
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    y: 0
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 50
                  }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="card p-8 group transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-secondaryBlack mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center text-secondaryBlack/80 mb-2">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center text-secondaryBlack/80 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.type)}`}>
                      {job.type}
                    </span>
                  </div>

                  {job.salary && (
                    <div className="flex items-center text-secondaryBlack/80 mb-4">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="font-medium">{job.salary}</span>
                    </div>
                  )}

                  <p className="text-secondaryBlack/80 mb-6 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-secondaryBlack mb-3">
                      {t('career.requirements')}
                    </h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, idx) => (
                        <motion.li 
                          key={idx} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 + (idx * 0.1) }}
                          className="flex items-start"
                        >
                          <CheckCircle className="w-4 h-4 text-mainRed mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-secondaryBlack/80 text-sm">{req}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-secondaryPlatinium">
                    <div className="flex items-center text-sm text-secondaryBlack/60">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Posted {job.posted}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleApply(job)}
                      className="btn-primary-white-bg bg-mainRed hover:bg-mainRed/90 inline-flex items-center"
                    >
                      {t('career.apply')}
                      <Send className="w-4 h-4 ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="bg-textWhite rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-secondaryBlack">
                  {t('career.applicationForm.title')}
                </h3>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setShowApplicationForm(false)}
                  className="text-secondaryBlack/60 hover:text-secondaryBlack"
                >
                  ✕
                </motion.button>
              </div>

              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-16 h-16 text-mainRed mx-auto mb-4" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-secondaryBlack mb-2">
                    {t('career.applicationForm.success')}
                  </h4>
                  <p className="text-secondaryBlack">
                    We'll be in touch soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-secondaryBlack mb-2">
                        {t('career.applicationForm.name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={applicationData.name}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-secondaryPlatinium rounded-lg focus:ring-2 focus:ring-mainRed focus:border-transparent bg-textWhite text-secondaryBlack"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-secondaryBlack mb-2">
                        {t('career.applicationForm.email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={applicationData.email}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-secondaryPlatinium rounded-lg focus:ring-2 focus:ring-mainRed focus:border-transparent bg-textWhite text-secondaryBlack"
                      />
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-secondaryBlack mb-2">
                        {t('career.applicationForm.phone')}
                      </label>
                      <input
                        type="tel"
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-secondaryPlatinium rounded-lg focus:ring-2 focus:ring-mainRed focus:border-transparent bg-textWhite text-secondaryBlack"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-secondaryBlack mb-2">
                        {t('career.applicationForm.position')}
                      </label>
                      <input
                        type="text"
                        required
                        value={applicationData.position}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, position: e.target.value }))}
                        className="w-full px-4 py-3 border border-secondaryPlatinium rounded-lg focus:ring-2 focus:ring-mainRed focus:border-transparent bg-textWhite text-secondaryBlack"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-secondaryBlack mb-2">
                      {t('career.applicationForm.message')}
                    </label>
                    <textarea
                      rows={4}
                      value={applicationData.message}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondaryPlatinium rounded-lg focus:ring-2 focus:ring-mainRed focus:border-transparent bg-textWhite text-secondaryBlack"
                      placeholder="Tell us why you're interested in this position..."
                    />
                  </motion.div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="flex-1 px-6 py-3 border border-secondaryPlatinium text-secondaryBlack rounded-lg hover:bg-secondaryPlatinium transition-colors"
                    >
                      {t('common.cancel')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="flex-1 btn-primary-white-bg bg-mainRed hover:bg-mainRed/90 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ 
                              duration: 1, 
                              repeat: Infinity, 
                              ease: "linear" 
                            }}
                            className="rounded-full h-4 w-4 border-b-2 border-textWhite mr-2"
                          ></motion.div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          {t('career.applicationForm.submit')}
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Why Work With Us Section */}
      <section className="section bg-mainRed">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl text-textWhite lg:text-4xl font-bold text-gray-900 mb-4">
              {t('career.whyWork.title')}
            </h2>
            <p className="text-lg text-textWhite max-w-2xl mx-auto">
              {t('career.whyWork.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1,
                type: "spring",
                stiffness: 50
              }}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="card p-8 text-center"
            >
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Users className="w-12 h-12 text-mainRed mx-auto mb-6" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('career.whyWork.team.title')}
              </h3>
              <p className="text-gray-600">
                {t('career.whyWork.team.description')}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                type: "spring",
                stiffness: 50
              }}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="card p-8 text-center"
            >
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <DollarSign className="w-12 h-12 text-mainRed mx-auto mb-6" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('career.whyWork.benefits.title')}
              </h3>
              <p className="text-gray-600">
                {t('career.whyWork.benefits.description')}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                type: "spring",
                stiffness: 50
              }}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="card p-8 text-center"
            >
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Briefcase className="w-12 h-12 text-mainRed mx-auto mb-6" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('career.whyWork.growth.title')}
              </h3>
              <p className="text-gray-600">
                {t('career.whyWork.growth.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
