"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "@/context/LocaleContext";
import { Briefcase, MapPin, Clock, DollarSign, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface JobOffer {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements: string[];
  posted: string;
}

export default function CareerClient() {
  const { t, locale } = useLocale();
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockJobs: JobOffer[] = [
          {
            id: "1",
            title: locale === "es" ? "Conductor de camión" : "Truck Driver",
            department: locale === "es" ? "Operaciones" : "Operations",
            location: locale === "es" ? "Toda España" : "Nationwide",
            type: locale === "es" ? "Tiempo completo" : "Full-time",
            salary: locale === "es" ? "25.000€ - 35.000€" : "$50,000 - $65,000",
            description: locale === "es"
              ? "Buscamos conductores de camión con experiencia para unirse a nuestra flota en crecimiento."
              : "We are seeking experienced truck drivers to join our growing fleet.",
            requirements: locale === "es"
              ? ["Carnet C+E", "2+ años de experiencia", "Historial de conducción limpio"]
              : ["Valid CDL license", "2+ years experience", "Clean driving record"],
            posted: "2024-01-15"
          },
          {
            id: "2",
            title: locale === "es" ? "Coordinador/a de logística" : "Logistics Coordinator",
            department: locale === "es" ? "Logística" : "Logistics",
            location: locale === "es" ? "Oficina central" : "Main Office",
            type: locale === "es" ? "Tiempo completo" : "Full-time",
            salary: locale === "es" ? "22.000€ - 28.000€" : "$45,000 - $55,000",
            description: locale === "es"
              ? "Coordina envíos y gestiona operaciones logísticas."
              : "Coordinate shipments and manage logistics operations.",
            requirements: locale === "es"
              ? ["Grado universitario preferido", "Experiencia en logística", "Habilidades de comunicación"]
              : ["Bachelor's degree preferred", "Experience in logistics", "Strong communication skills"],
            posted: "2024-01-10"
          }
        ];
        setJobs(mockJobs);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [locale]);

  const handleApply = (job: JobOffer) => {
    setApplicationData(prev => ({ ...prev, position: job.title }));
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setTimeout(() => {
        setShowApplicationForm(false);
        setSubmitStatus("idle");
        setApplicationData({ name: "", email: "", phone: "", position: "", message: "" });
      }, 2000);
    } catch {
      setSubmitStatus("error");
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
      case "tiempo completo":
        return "bg-mainRed/10 text-mainRed";
      case "part-time":
      case "media jornada":
        return "bg-mainRed/10 text-mainRed";
      case "contract":
      case "contrato":
        return "bg-mainRed/10 text-mainRed";
      default:
        return "bg-secondaryPlatinium text-secondaryBlack";
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
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              {t("career.title")}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
              className="text-xl sm:text-2xl text-textWhite/90 max-w-3xl mx-auto leading-relaxed"
            >
              {t("career.subtitle")}
            </motion.p>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 50 }}
              className="text-lg text-textWhite/80 max-w-2xl mx-auto mt-4"
            >
              {t("career.description")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-secondaryPlatinium">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-mainRed mb-6 text-center">{locale === "es" ? "¿Por qué trabajar con nosotros?" : "Why work with us?"}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <li className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <Briefcase className="w-8 h-8 text-mainRed" />
              <span>{t("career.benefits.stability")}</span>
            </li>
            <li className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <Users className="w-8 h-8 text-mainRed" />
              <span>{t("career.benefits.environment")}</span>
            </li>
            <li className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <Clock className="w-8 h-8 text-mainRed" />
              <span>{t("career.benefits.training")}</span>
            </li>
            <li className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <DollarSign className="w-8 h-8 text-mainRed" />
              <span>{t("career.benefits.salary")}</span>
            </li>
          </ul>
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
              {t("career.currentOpenings")}
            </h2>
            <p className="text-lg text-secondaryBlack/80 max-w-2xl mx-auto">
              {t("career.joinTeam")}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-b-2 border-mainRed"
              ></motion.div>
              <span className="ml-4 text-secondaryBlack/80">{t("common.loading")}</span>
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
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  <Briefcase className="w-12 h-12 text-mainRed mx-auto mb-4" />
                </motion.div>
                <p className="text-xl font-semibold text-secondaryBlack mb-2">{t("career.noJobs")}</p>
                <p className="text-secondaryBlack/80">{t("career.checkBack")}</p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map(job => (
                <div key={job.id} className="bg-white rounded-lg shadow p-8 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-mainRed mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-secondaryBlack/80 mb-2">
                    <span><Briefcase className="inline w-4 h-4 mr-1" /> {job.department}</span>
                    <span><MapPin className="inline w-4 h-4 mr-1" /> {job.location}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded ${getJobTypeColor(job.type)}`}>{job.type}</span>
                    {job.salary && <span><DollarSign className="inline w-4 h-4 mr-1" /> {job.salary}</span>}
                  </div>
                  <p className="mb-2"><strong>{t("career.descriptionLabel")}:</strong> {job.description}</p>
                  <div className="mb-2">
                    <strong>{t("career.requirements")}:</strong>
                    <ul className="list-disc list-inside ml-4">
                      {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                  </div>
                  <button
                    className="mt-auto bg-mainRed text-white px-6 py-2 rounded hover:bg-mainRed/90 transition"
                    onClick={() => handleApply(job)}
                  >
                    {t("career.apply")}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-secondaryBlack hover:text-mainRed"
              onClick={() => setShowApplicationForm(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-mainRed mb-4">{t("career.applicationForm.title")}</h2>
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">{t("career.applicationForm.name")}</label>
                <input
                  type="text"
                  className="form-input w-full"
                  value={applicationData.name}
                  onChange={e => setApplicationData({ ...applicationData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">{t("career.applicationForm.email")}</label>
                <input
                  type="email"
                  className="form-input w-full"
                  value={applicationData.email}
                  onChange={e => setApplicationData({ ...applicationData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">{t("career.applicationForm.phone")}</label>
                <input
                  type="tel"
                  className="form-input w-full"
                  value={applicationData.phone}
                  onChange={e => setApplicationData({ ...applicationData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">{t("career.applicationForm.position")}</label>
                <input
                  type="text"
                  className="form-input w-full"
                  value={applicationData.position}
                  readOnly
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">{t("career.applicationForm.message")}</label>
                <textarea
                  className="form-input w-full"
                  value={applicationData.message}
                  onChange={e => setApplicationData({ ...applicationData, message: e.target.value })}
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="bg-mainRed text-white px-6 py-2 rounded hover:bg-mainRed/90 transition w-full"
                disabled={submitStatus === "loading"}
              >
                {submitStatus === "loading" ? t("common.loading") : t("career.applicationForm.submit")}
              </button>
              {submitStatus === "success" && (
                <div className="flex items-center text-green-600 mt-2">
                  <CheckCircle className="w-5 h-5 mr-2" /> {t("career.applicationForm.success")}
                </div>
              )}
              {submitStatus === "error" && (
                <div className="flex items-center text-red-600 mt-2">
                  <span className="mr-2">!</span> {t("career.applicationForm.error")}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 