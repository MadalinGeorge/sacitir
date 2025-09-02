import { Job } from '@/types';

// Google Sheets integration for client-side (GitHub Pages)
const GOOGLE_SHEETS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
const GOOGLE_SHEETS_ID_EN = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID_EN;
const GOOGLE_SHEETS_ID_ES = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID_ES;
const GOOGLE_SHEETS_RANGE = 'A:J';

// Newsletter subscribers sheet
const NEWSLETTER_SHEET_ID = process.env.NEXT_PUBLIC_SACITIR_NEWSLETTER_LIST;
const NEWSLETTER_SHEET_RANGE = 'A:D';

export async function fetchJobsFromGoogleSheetsClient(locale: 'en' | 'es' = 'en'): Promise<Job[]> {
  try {
    if (!GOOGLE_SHEETS_API_KEY) {
      console.error('❌ Google Sheets: Missing GOOGLE_SHEETS_API_KEY environment variable');
      return [];
    }

    const sheetId = locale === 'es' ? GOOGLE_SHEETS_ID_ES : GOOGLE_SHEETS_ID_EN;
    
    if (!sheetId) {
      console.error(`❌ Google Sheets: Missing ${locale === 'es' ? 'GOOGLE_SHEETS_ID_ES' : 'GOOGLE_SHEETS_ID_EN'} environment variable`);
      return [];
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${GOOGLE_SHEETS_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch jobs from Google Sheets for locale: ${locale} - Status: ${response.status}`);
    }

    const data = await response.json();
    const rows = data.values || [];
    
    if (rows.length === 0) {
      return [];
    }

    // Skip header row and filter only active jobs
    const jobs = rows.slice(1)
      .filter((row: string[]) => {
        // Check if job is active (column I - Status)
        const status = row[8] || '';
        return status.toLowerCase() === 'active' || status.toLowerCase() === 'activo' || status.toLowerCase() === 'true';
      })
      .map((row: string[], index: number) => ({
        id: row[0] || `job-${index}`, // Column A - ID
        title: row[1] || '', // Column B - Title
        department: row[2] || '', // Column C - Department
        location: row[3] || '', // Column D - Location
        type: row[4] || 'Full-time', // Column E - Type
        salary: row[5] || '', // Column F - Salary
        description: row[6] || '', // Column G - Description
        requirements: (row[7] || '').split(',').map((req: string) => req.trim()).filter(Boolean), // Column H - Requirements
        status: (row[8] || '').toLowerCase() === 'active' || (row[8] || '').toLowerCase() === 'activo' || (row[8] || '').toLowerCase() === 'true', // Column I - Status
        posted: row[9] || new Date().toISOString(), // Column J - Posted Date
      }));

    return jobs.filter((job: Job) => job.title && job.description);
  } catch {
    return [];
  }
}

export async function subscribeToNewsletterClient(email: string, locale: 'en' | 'es' = 'en'): Promise<boolean> {
  try {
    if (!GOOGLE_SHEETS_API_KEY) {
      console.error('❌ Newsletter: Missing GOOGLE_SHEETS_API_KEY environment variable');
      return false;
    }
    
    if (!NEWSLETTER_SHEET_ID) {
      console.error('❌ Newsletter: Missing SACITIR_NEWSLETTER_LIST environment variable');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Check if email already exists
    const checkUrl = `https://sheets.googleapis.com/v4/spreadsheets/${NEWSLETTER_SHEET_ID}/values/${NEWSLETTER_SHEET_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;
    const checkResponse = await fetch(checkUrl);
    
    if (checkResponse.ok) {
      const checkData = await checkResponse.json();
      const existingEmails = checkData.values?.slice(1).map((row: string[]) => row[0]) || [];
      
      if (existingEmails.includes(email)) {
        return false; // Email already exists
      }
    }

    // Append new subscriber
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${NEWSLETTER_SHEET_ID}/values/${NEWSLETTER_SHEET_RANGE}:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_API_KEY}`;
    
    const response = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[email, new Date().toISOString(), locale, 'active']]
      })
    });

    return response.ok;
  } catch {
    return false;
  }
}
