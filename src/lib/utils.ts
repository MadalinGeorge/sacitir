import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Job } from '@/types';
import { fetchJobsFromGoogleSheetsClient, subscribeToNewsletterClient } from './googleSheetsClient';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

