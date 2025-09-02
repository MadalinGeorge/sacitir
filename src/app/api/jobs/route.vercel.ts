import { NextRequest, NextResponse } from 'next/server';

// Google Sheets integration for job listings
const GOOGLE_SHEETS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
const GOOGLE_SHEETS_ID_EN = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID_EN;
const GOOGLE_SHEETS_ID_ES = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID_ES;
const GOOGLE_SHEETS_RANGE = 'A:J';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  status: boolean;
  posted: string;
}

async function fetchJobsFromGoogleSheets(locale: 'en' | 'es' = 'en'): Promise<Job[]> {
  try {
    if (!GOOGLE_SHEETS_API_KEY) {
      console.log('❌ Server: Missing GOOGLE_SHEETS_API_KEY environment variable');
      return [];
    }

    const sheetId = locale === 'es' ? GOOGLE_SHEETS_ID_ES : GOOGLE_SHEETS_ID_EN;
    
    if (!sheetId) {
      console.log(`❌ Server: Missing ${locale === 'es' ? 'GOOGLE_SHEETS_ID_ES' : 'GOOGLE_SHEETS_ID_EN'} environment variable`);
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') as 'en' | 'es' || 'en';
    
    const jobs = await fetchJobsFromGoogleSheets(locale);
    
    return NextResponse.json({ jobs, locale });
  } catch {
    return NextResponse.json({ jobs: [], locale: 'en', error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
