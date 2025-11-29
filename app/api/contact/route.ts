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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Courier New', Courier, monospace;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #000000;">
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #00ff41; border-radius: 4px; overflow: hidden; box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #0a0a0a; padding: 20px; border-bottom: 1px solid #00ff41; text-align: center;">
                    <h1 style="color: #00ff41; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);">&gt; INCOMING_TRANSMISSION</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 30px;">
                    <p style="color: #00ffff; margin-top: 0; margin-bottom: 20px; font-size: 14px;">[SYSTEM_NOTICE]: New message received from portfolio contact form.</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 10px; border-left: 2px solid #00ff41; background-color: rgba(0, 255, 65, 0.05);">
                          <p style="margin: 5px 0; color: #00ff41; font-size: 12px; text-transform: uppercase;">// SENDER_ID</p>
                          <p style="margin: 5px 0; color: #ffffff; font-size: 16px;"><strong>${name}</strong></p>
                        </td>
                      </tr>
                      <tr><td height="10"></td></tr>
                      <tr>
                        <td style="padding: 10px; border-left: 2px solid #00ff41; background-color: rgba(0, 255, 65, 0.05);">
                          <p style="margin: 5px 0; color: #00ff41; font-size: 12px; text-transform: uppercase;">// CONTACT_FREQUENCY</p>
                          <p style="margin: 5px 0; color: #ffffff; font-size: 16px;"><a href="mailto:${email}" style="color: #ffffff; text-decoration: none;">${email}</a></p>
                        </td>
                      </tr>
                      <tr><td height="10"></td></tr>
                      <tr>
                        <td style="padding: 10px; border-left: 2px solid #00ff41; background-color: rgba(0, 255, 65, 0.05);">
                          <p style="margin: 5px 0; color: #00ff41; font-size: 12px; text-transform: uppercase;">// SUBJECT_LINE</p>
                          <p style="margin: 5px 0; color: #ffffff; font-size: 16px;">${subject}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <div style="border: 1px solid #333333; padding: 20px; background-color: #050505; border-radius: 4px;">
                      <p style="margin: 0 0 10px 0; color: #00ffff; font-size: 12px; text-transform: uppercase;">// DECODED_MESSAGE_BODY:</p>
                      <p style="margin: 0; color: #dddddd; line-height: 1.6; white-space: pre-wrap; font-family: sans-serif;">${message}</p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #050505; padding: 15px; text-align: center; border-top: 1px solid #333333;">
                    <p style="color: #666666; margin: 0; font-size: 12px;">&copy; ${new Date().getFullYear()} Krishnadas Portfolio System. All rights reserved.</p>
                    <p style="color: #444444; margin: 5px 0 0 0; font-size: 10px;">SECURE_TRANSMISSION_PROTOCOL_V2</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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

