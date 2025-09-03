import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getApiTranslations } from '@/lib/apiTranslations';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, position, message, cvFile, locale = 'en' } = await request.json();
    const t = getApiTranslations(locale as 'en' | 'es');
    
    // Validate required fields
    if (!name || !email || !phone || !position || !message) {
      return NextResponse.json(
        { success: false, error: t.api.errors.allFieldsRequired },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: t.api.errors.invalidEmail },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Job Application API: Missing RESEND_API_KEY environment variable');
      return NextResponse.json(
        { success: false, error: t.api.errors.serviceNotConfigured },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SACITIR <noreply@sacitir.com>',
      to: ['hr@sacitir.com'],
      subject: `New Job Application: ${position}`,
      html: `
        <h2>New Job Application Received</h2>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>CV File:</strong> ${cvFile ? cvFile.name : 'No CV attached'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This application was submitted through the SACITIR website.</em></p>
        <p><em>Reply to this email to contact the applicant directly.</em></p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('❌ Job Application API: Resend error:', error);
      return NextResponse.json(
        { success: false, error: t.api.errors.applicationFailed },
        { status: 500 }
      );
    }

    console.log('✅ Job Application API: Application sent successfully:', data);
    return NextResponse.json({ 
      success: true, 
      message: t.api.success.applicationSubmitted,
      id: data?.id 
    });

  } catch (error) {
    console.error('❌ Job Application API: Exception occurred:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
