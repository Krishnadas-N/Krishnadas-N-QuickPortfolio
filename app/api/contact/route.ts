import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'

// In-memory rate limiting (simple implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }) // 1 hour
    return true
  }

  if (limit.count >= 5) {
    return false // Rate limit exceeded
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const myEmail = process.env.MY_EMAIL

    if (!myEmail) {
      return NextResponse.json(
        { error: 'Email configuration missing' },
        { status: 500 }
      )
    }

    // Email content
    const emailSubject = `Portfolio Contact: ${subject}`
    const emailText = `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f1a; color: #ffffff; padding: 20px; border-radius: 8px;">
        <h2 style="color: #00E5FF; margin-bottom: 20px;">New Contact Form Submission</h2>
        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 6px; margin-bottom: 15px;">
          <p style="margin: 8px 0;"><strong style="color: #7C4DFF;">Name:</strong> <span style="color: #ffffff;">${name}</span></p>
          <p style="margin: 8px 0;"><strong style="color: #7C4DFF;">Email:</strong> <span style="color: #ffffff;">${email}</span></p>
          <p style="margin: 8px 0;"><strong style="color: #7C4DFF;">Subject:</strong> <span style="color: #ffffff;">${subject}</span></p>
        </div>
        <hr style="border: 1px solid rgba(124, 77, 255, 0.3); margin: 20px 0;" />
        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 6px;">
          <p style="color: #7C4DFF; font-weight: bold; margin-bottom: 10px;">Message:</p>
          <p style="white-space: pre-wrap; color: #ffffff; line-height: 1.6;">${message}</p>
        </div>
      </div>
    `

    // Try SendGrid first (if configured)
    const sendGridKey = process.env.SENDGRID_API_KEY
    if (sendGridKey) {
      try {
        sgMail.setApiKey(sendGridKey)

        const msg = {
          to: myEmail,
          from: myEmail,
          replyTo: email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        }

        await sgMail.send(msg)
        return NextResponse.json({ ok: true, message: 'Email sent successfully via SendGrid' })
      } catch (error: any) {
        console.error('SendGrid error:', error)
        // Fall through to Brevo/SMTP
      }
    }

    // Try Brevo (free SMTP service) - preferred fallback
    const brevoKey = process.env.BREVO_SMTP_KEY
    const brevoUser = process.env.BREVO_SMTP_USER

    if (brevoKey && brevoUser) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp-relay.brevo.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: brevoUser,
            pass: brevoKey,
          },
        })

        const mailOptions = {
          from: `"${name}" <${brevoUser}>`,
          to: myEmail,
          replyTo: email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        }

        await transporter.sendMail(mailOptions)
        return NextResponse.json({ ok: true, message: 'Email sent successfully via Brevo' })
      } catch (error: any) {
        console.error('Brevo error:', error)
        // Fall through to generic SMTP
      }
    }

    // Generic SMTP fallback (for any SMTP provider)
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort),
          secure: smtpPort === '465', // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })

        const mailOptions = {
          from: `"${name}" <${smtpUser}>`,
          to: myEmail,
          replyTo: email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        }

        await transporter.sendMail(mailOptions)
        return NextResponse.json({ ok: true, message: 'Email sent successfully via SMTP' })
      } catch (error: any) {
        console.error('SMTP error:', error)
        return NextResponse.json(
          { error: `Failed to send email: ${error.message}` },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Email service not configured. Please set up Brevo, SendGrid, or SMTP credentials.' },
      { status: 500 }
    )
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

