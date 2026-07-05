import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const subject = String(body.subject ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const msg = String(body.msg ?? '').trim();

    if (!name || !email || !subject || !msg) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const smtpHost = getRequiredEnv('SMTP_HOST');
    const smtpPort = Number(getRequiredEnv('SMTP_PORT'));
    const smtpUser = getRequiredEnv('SMTP_USER');
    const smtpPass = getRequiredEnv('SMTP_PASS');
    const contactTo = process.env.CONTACT_TO_EMAIL ?? smtpUser;
    const smtpFrom = process.env.SMTP_FROM ?? smtpUser;
    const smtpSecure = process.env.SMTP_SECURE === 'true';

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const sentAt = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpFrom}>`,
      to: contactTo,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Subject: ${subject}`,
        `Sent at: ${sentAt}`,
        '',
        'Message:',
        msg,
      ].join('\n'),
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Sent at:</strong> ${sentAt}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${msg.replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 },
    );
  }
}
