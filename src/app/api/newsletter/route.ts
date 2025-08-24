import { NextRequest, NextResponse } from 'next/server';

// Newsletter subscription using Google Apps Script webhook
const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || '';
const NEWSLETTER_SECRET_TOKEN = process.env.NEWSLETTER_SECRET_TOKEN || '';

async function subscribeToNewsletter(email: string, locale: 'en' | 'es' = 'en'): Promise<boolean> {
  try {
    console.log('🔍 Newsletter API: Starting subscription for email:', email);
    
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.log('❌ Newsletter API: Missing Google Apps Script URL');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Newsletter API: Invalid email format:', email);
      return false;
    }

    console.log('✅ Newsletter API: Email format is valid');

    // Call Google Apps Script webhook
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        locale: locale,
        timestamp: new Date().toISOString(),
        token: NEWSLETTER_SECRET_TOKEN
      })
    });

    console.log('📡 Newsletter API: Apps Script response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Newsletter API: Apps Script failed:', errorText);
      return false;
    }

    const result = await response.json();
    console.log('✅ Newsletter API: Apps Script result:', result);
    
    return result.success === true;
  } catch (error) {
    console.log('❌ Newsletter API: Exception occurred:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Newsletter API: Received POST request');
    
    const { email, locale } = await request.json();
    console.log('📧 Newsletter API: Request data:', { email, locale });
    
    if (!email) {
      console.log('❌ Newsletter API: Email is missing');
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const success = await subscribeToNewsletter(email, locale || 'en');
    console.log('✅ Newsletter API: Subscription result:', success);
    
    if (success) {
      console.log('🎉 Newsletter API: Successfully subscribed');
      return NextResponse.json({ success: true, message: 'Successfully subscribed to newsletter' });
    } else {
      console.log('❌ Newsletter API: Subscription failed');
      return NextResponse.json({ success: false, error: 'Failed to subscribe or email already exists' }, { status: 400 });
    }
  } catch (error) {
    console.log('❌ Newsletter API: Exception in POST handler:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
