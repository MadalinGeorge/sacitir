import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import emailjs from '@emailjs/browser';
import { Job, ContactFormData, JobApplicationData } from '@/types';

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
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
}

export async function sendJobApplication(data: JobApplicationData): Promise<boolean> {
  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_JOB,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        position: data.position,
        message: data.message,
      }
    );
    return result.status === 200;
  } catch (error) {
    console.error('Error sending job application:', error);
    return false;
  }
}

// Google Sheets integration for job listings
const GOOGLE_SHEETS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || '';
const GOOGLE_SHEETS_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || '';
const GOOGLE_SHEETS_RANGE = 'Jobs!A:F'; // Adjust range as needed

export async function fetchJobsFromGoogleSheets(): Promise<Job[]> {
  try {
    if (!GOOGLE_SHEETS_API_KEY || !GOOGLE_SHEETS_ID) {
      console.warn('Google Sheets API key or ID not configured');
      return [];
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${GOOGLE_SHEETS_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs from Google Sheets');
    }

    const data = await response.json();
    const rows = data.values || [];
    
    // Skip header row
    const jobs = rows.slice(1).map((row: string[], index: number) => ({
      id: `job-${index}`,
      title: row[0] || '',
      description: row[1] || '',
      requirements: (row[2] || '').split(',').map((req: string) => req.trim()).filter(Boolean),
      location: row[3] || '',
      type: (row[4] || 'Full-time') as 'Full-time' | 'Part-time' | 'Contract',
      postedDate: row[5] || new Date().toISOString(),
    }));

    return jobs.filter(job => job.title && job.description);
  } catch (error) {
    console.error('Error fetching jobs from Google Sheets:', error);
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
  } catch (error) {
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

