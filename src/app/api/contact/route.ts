import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/components/contact/contact.schema'
import { siteConfig } from '@/lib/metadata'

// Two outbound Resend calls per request — guard against a slow third-party response
// silently hitting the platform's default serverless timeout.
export const maxDuration = 10

/**
 * Simple in-memory rate limiter — 5 requests per IP per 10 minutes.
 * For higher-traffic production sites, replace with Upstash Redis:
 * https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) return true

  entry.count += 1
  return false
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  // Parse and validate body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid form data.', issues: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { name, email, phone, interest, message, website } = result.data

  // Honeypot — real users never fill this field
  if (website) {
    // Return 200 so bots don't know they were rejected
    return NextResponse.json({ success: true }, { status: 200 })
  }

  // Validate env vars
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !toEmail || !fromEmail) {
    console.error('[contact] Missing required env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL')
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Interested in: ${interest}`,
    '',
    'Message:',
    message,
  ]
    .filter(Boolean)
    .join('\n')

  // Notify the client and confirm to the submitter concurrently — the confirmation
  // is best-effort and never blocks or fails the response on its own.
  const [notifyResult, confirmResult] = await Promise.allSettled([
    resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: emailBody,
    }),
    resend.emails.send({
      from: fromEmail,
      to: email,
      replyTo: toEmail,
      subject: `We received your message — ${siteConfig.name}`,
      text: [
        `Hi ${name},`,
        '',
        "Thanks for reaching out. We've received your message and will be in touch shortly.",
        '',
        '—',
        siteConfig.name,
      ].join('\n'),
    }),
  ])

  const notifyError =
    notifyResult.status === 'rejected' ? notifyResult.reason : notifyResult.value.error

  if (notifyError) {
    console.error('[contact] Resend notify error:', notifyError)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }

  const confirmError =
    confirmResult.status === 'rejected' ? confirmResult.reason : confirmResult.value.error

  if (confirmError) {
    // Log but don't fail — the client was already notified
    console.error('[contact] Resend confirmation error:', confirmError)
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
