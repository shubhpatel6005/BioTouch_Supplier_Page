// Vercel Serverless Function — POST /api/contact
// Receives the Contact Us form submission and emails it via Resend.
// RESEND_API_KEY / CONTACT_TO_EMAIL live in .env.local (server-side only,
// gitignored) — never expose the Resend key to the browser.
import { Resend } from 'resend'

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'phone', 'companyName', 'message']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Resend's shared test sender — works without verifying a domain, but (per
// Resend's sandbox restriction) can only deliver to the address the Resend
// account itself was signed up with. Once BioTouch verifies a real sending
// domain in Resend, swap this for e.g. "Supplier Contact <contact@biotouchglobal.com>"
// to remove that restriction.
const FROM_ADDRESS = 'BioTouch Supplier Page <onboarding@resend.dev>'

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]
  ))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body || {}
  const missing = REQUIRED_FIELDS.filter((field) => !String(body[field] || '').trim())
  if (missing.length) {
    return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` })
  }
  if (!EMAIL_RE.test(body.email.trim())) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    console.error('Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set')
    return res.status(500).json({ error: 'Contact form is not configured yet' })
  }

  const fields = [
    ['Name', `${body.firstName} ${body.lastName}`],
    ['Email', body.email],
    ['Phone', body.phone],
    ['Company Name', body.companyName],
    ['BioTouch Location Country', body.locationCountry],
    ['BioTouch Location Territory', body.locationProvince],
    ['Category', body.category],
    ['Service Provided', body.serviceType],
  ].filter(([, value]) => String(value || '').trim())

  const textBody = [
    ...fields.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    body.message,
  ].join('\n')

  const htmlBody = `
    <table cellpadding="6" cellspacing="0">
      ${fields.map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`).join('')}
    </table>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(body.message).replace(/\n/g, '<br />')}</p>
  `

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: body.email,
      subject: `Supplier contact form: ${body.companyName} (${body.category || 'General Inquiry'})`,
      text: textBody,
      html: htmlBody,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(502).json({ error: error.message || 'Failed to send email' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form send failed:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
