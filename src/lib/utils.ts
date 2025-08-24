import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import emailjs from '@emailjs/browser';
import { Job, ContactFormData, JobApplicationData } from '@/types';
import { fetchJobsFromGoogleSheetsClient, subscribeToNewsletterClient } from './googleSheetsClient';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID_CONTACT = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT || '';
const EMAILJS_TEMPLATE_ID_JOB = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_JOB || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CONTACT,
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      }
    );
    return result.status === 200;
  } catch {
    return false;
  }
}

export async function sendJobApplication(data: JobApplicationData): Promise<boolean> {
  try {
    // If there's a CV file, we would typically upload it to a file storage service
    // For now, we'll just include the filename in the email
    const cvFileName = data.cvFile ? data.cvFile.name : 'No CV attached';
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_JOB,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        position: data.position,
        message: data.message,
        cv_file: cvFileName,
      }
    );
    return result.status === 200;
  } catch {
    return false;
  }
}

// Helper function to upload CV file to a storage service
export async function uploadCvFile(file: File): Promise<string | null> {
  try {
    // This is a placeholder for actual file upload implementation
    // You would typically upload to services like:
    // - AWS S3
    // - Google Cloud Storage
    // - Firebase Storage
    // - Your own server
    
    // For now, we'll simulate the upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a mock file URL
    return `https://storage.example.com/cv/${Date.now()}-${file.name}`;
  } catch {
    return null;
  }
}



export async function fetchJobsFromGoogleSheets(locale: 'en' | 'es' = 'en'): Promise<Job[]> {
  // Check if we're in a static export (GitHub Pages) or have API routes (Vercel)
  const isStaticExport = process.env.NODE_ENV === 'production' && typeof window !== 'undefined';
  
  try {
    if (isStaticExport) {
      // Use client-side Google Sheets API for GitHub Pages
      return await fetchJobsFromGoogleSheetsClient(locale);
    } else {
      // Use API route for Vercel or development
      const response = await fetch(`/api/jobs?locale=${locale}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs from API for locale: ${locale} - Status: ${response.status}`);
      }

      const data = await response.json();
      return data.jobs || [];
    }
  } catch {
    return [];
  }
}

// Format date helper
export function formatDate(dateString: string, locale: string = 'en'): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

// Scroll to element helper
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Utility function to handle image paths with basePath for GitHub Pages
export function getImagePath(path: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/sacitir' : '';
  return `${basePath}${path}`;
}

// Newsletter subscription function with dual deployment support
export async function subscribeToNewsletter(email: string, locale: 'en' | 'es' = 'en'): Promise<boolean> {
  // Check if we're in a static export (GitHub Pages) or have API routes (Vercel)
  const isStaticExport = process.env.NODE_ENV === 'production' && typeof window !== 'undefined';
  
  try {
    if (isStaticExport) {
      // Use client-side Google Sheets API for GitHub Pages
      return await subscribeToNewsletterClient(email, locale);
    } else {
      // Use API route for Vercel or development
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, locale }),
      });
      
      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.success || false;
    }
  } catch {
    return false;
  }
}

