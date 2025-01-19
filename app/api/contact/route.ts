import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as ContactFormData;

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service', 'message'] as const;
    for (const field of requiredFields) {
      if (!body[field]?.trim()) {
        return Response.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // envirotechenquiry@gmail.com
        pass: process.env.SMTP_PASSWORD, // your app password
      },
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('SMTP Verification Error:', error);
      return Response.json(
        { success: false, error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Email content with better formatting
    const mailOptions = {
      from: {
        name: 'Envirotech Website Enquiry',
        address: process.env.SMTP_USER as string
      },
      to: 'support@envirotech-plumbing.co.uk',
      cc: process.env.SMTP_USER as string, // CC the Gmail account
      priority: 'high' as const,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Envirotech-Form': 'website-enquiry'
      },
      subject: `🔧 Urgent: New Plumbing Enquiry - ${body.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #051c2c; border-bottom: 2px solid #051c2c; padding-bottom: 10px;">New Website Enquiry</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #051c2c; margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
            <p><strong>Address:</strong> ${body.address}</p>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #051c2c; margin-top: 0;">Service Details</h3>
            <p><strong>Service Required:</strong> ${body.service}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${body.message}</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This is an urgent enquiry submitted through the Envirotech Plumbing website contact form. Please respond as soon as possible.
          </p>
        </div>
      `,
      text: `
New Website Enquiry

Customer Details:
Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone}
Address: ${body.address}

Service Details:
Service Required: ${body.service}
Message:
${body.message}

This is an urgent enquiry submitted through the Envirotech Plumbing website contact form. Please respond as soon as possible.
      `,
      replyTo: body.email,
    };

    // Send email with detailed error logging
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info);
      return Response.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    } catch (sendError) {
      console.error('Email sending error:', sendError);
      return Response.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 