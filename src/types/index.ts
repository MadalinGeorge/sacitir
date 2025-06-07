export type Locale = 'en' | 'es';

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  postedDate: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface JobApplicationData {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface NavItem {
  key: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Theme {
  isDark: boolean;
}

