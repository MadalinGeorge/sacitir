import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, position, message, cvFile } = await request.json();
    
    // Validate required fields
    if (!name || !email || !phone || !position || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Job Application API: Missing RESEND_API_KEY environment variable');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SACITIR <noreply@sacitir.com>', // Update with your verified domain
      to: ['hr@sacitir.com'], // Update with your HR email
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
        { success: false, error: 'Failed to send application' },
        { status: 500 }
      );
    }

    console.log('✅ Job Application API: Application sent successfully:', data);
    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
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
