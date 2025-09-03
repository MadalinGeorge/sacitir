import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getApiTranslations } from '@/lib/apiTranslations';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, locale = 'en' } = await request.json();
    const t = getApiTranslations(locale as 'en' | 'es');
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
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
      console.error('❌ Contact API: Missing RESEND_API_KEY environment variable');
      return NextResponse.json(
        { success: false, error: t.api.errors.serviceNotConfigured },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SACITIR <noreply@sacitir.com>',
      to: ['info@sacitir.com'],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This email was sent from the SACITIR website contact form.</em></p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('❌ Contact API: Resend error:', error);
      return NextResponse.json(
        { success: false, error: t.api.errors.sendFailed },
        { status: 500 }
      );
    }

    console.log('✅ Contact API: Email sent successfully:', data);
    return NextResponse.json({ 
      success: true, 
      message: t.api.success.messageSent,
      id: data?.id 
    });

  } catch (error) {
    console.error('❌ Contact API: Exception occurred:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
