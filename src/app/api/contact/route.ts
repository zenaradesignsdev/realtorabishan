import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/components/contact/contact.schema'
import { businessInfo, siteConfig } from '@/lib/metadata'

// Two outbound Resend calls per request — guard against a slow third-party response
// silently hitting the platform's default serverless timeout.
export const maxDuration = 10

/**
 * Resend's shared sender. It needs no DNS setup, so a deployment with only
 * RESEND_API_KEY set has a working pipeline — but it will only deliver to the
 * Resend account owner's own address. Set CONTACT_FROM_EMAIL to an address on a
 * domain verified in Resend before launch, or real enquiries will silently fail.
 */
const FALLBACK_FROM = 'onboarding@resend.dev'

/**
 * The payload is a 2000-character message plus a handful of short fields, so
 * anything past this is either malformed or an attempt to make the route read a
 * large body into memory before Zod ever sees it. Checked against Content-Length
 * so an oversized body is never buffered at all.
 */
const MAX_BODY_BYTES = 16 * 1024

/**
 * In-memory rate limiter — 5 requests per IP per 10 minutes.
 *
 * Per-instance, not global: a serverless platform may run several instances
 * concurrently, so the effective ceiling is the limit times the instance count,
 * and a cold start resets it. That is the right trade-off here — it costs
 * nothing, needs no external service, and this form sees a handful of genuine
 * submissions a week. Swap in Upstash Redis if it ever needs a hard global
 * limit: https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
/**
 * A warm instance can live for hours. Without a sweep the map keeps one entry per
 * IP that has ever hit the route for the life of that instance — an unbounded
 * allocation an attacker controls simply by varying the source address.
 */
const RATE_LIMIT_MAX_ENTRIES = 10_000

type RateLimitResult = { limited: false } | { limited: true; retryAfterSeconds: number }

function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now()

  // Drop everything already expired before considering the caller. O(n), but it
  // only runs once the map has grown, and n is bounded by the cap itself.
  if (rateLimitMap.size >= RATE_LIMIT_MAX_ENTRIES) {
    for (const [key, value] of rateLimitMap) {
      if (now > value.resetAt) rateLimitMap.delete(key)
    }
    // Still full means the window is saturated with live entries; refuse rather
    // than let the map grow past the cap.
    if (rateLimitMap.size >= RATE_LIMIT_MAX_ENTRIES) {
      return { limited: true, retryAfterSeconds: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) }
    }
  }

  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { limited: false }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    }
  }

  entry.count += 1
  return { limited: false }
}

/**
 * Strip anything that could break out of a header value.
 *
 * `name` reaches the Subject header. Zod caps its length but permits newlines,
 * and a CR/LF inside a header value is the classic email header-injection
 * vector — everything after it is read as a new header. Other control
 * characters go too; they have no business in a person's name.
 */
function headerSafe(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim()
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  const rateLimit = checkRateLimit(ip)
  if (rateLimit.limited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
    )
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 })
  }

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

  // Honeypot — real users never fill this field. Return 200 so bots cannot tell
  // they were rejected and start probing for what gave them away.
  if (website) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL || FALLBACK_FROM

  if (!apiKey || !toEmail) {
    console.error(
      '[contact] Not configured — RESEND_API_KEY and CONTACT_TO_EMAIL must both be set in the deployment environment.'
    )
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const safeName = headerSafe(name)
  // A display name makes the notification legible in an inbox list; the address
  // itself still has to be one Resend will send from.
  const sender = `${businessInfo.legalName} Website <${fromEmail}>`

  const emailBody = [
    `Name: ${safeName}`,
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
      from: sender,
      to: toEmail,
      replyTo: email,
      subject: `New enquiry from ${safeName} — ${interest}`,
      text: emailBody,
    }),
    resend.emails.send({
      from: sender,
      to: email,
      replyTo: toEmail,
      subject: `We received your message — ${siteConfig.name}`,
      text: [
        `Hi ${safeName.split(' ')[0] || 'there'},`,
        '',
        'Thanks for reaching out. Your message has come through and Abishan will be in touch shortly — usually the same day.',
        '',
        `If it is urgent, call ${businessInfo.phoneDisplay}.`,
        '',
        '—',
        businessInfo.legalName,
        businessInfo.brokerage,
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
    // Log but don't fail — the enquiry itself reached the inbox, which is what matters.
    console.error('[contact] Resend confirmation error:', confirmError)
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
