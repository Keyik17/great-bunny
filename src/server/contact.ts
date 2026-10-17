import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'
import { z } from 'zod'
import { BUSINESS_NAME, SITE_CONFIG } from '~/config/site'
import {
  domainCanReceiveMail,
  emailDomain,
  isDisposableEmail,
  isPlausiblePhone,
  isWellFormedEmail,
} from '~/server/spam'

/**
 * Contact / quote request, server-side handler.
 *
 * Emails the submitted lead to the business inbox via Resend, with the
 * customer's address as reply-to so the team can reply directly. The API key
 * and sender are read from the environment and never reach the client.
 *
 * The quote wizard can attach photos: they ride along as base64 and are sent
 * as real email attachments (no R2 round-trip), so the team sees the job right
 * in their inbox. Photos are downscaled on-device before they ever leave the
 * browser, so payloads stay small.
 *
 * Env vars (shared with the newsletter):
 *  - RESEND_API_KEY  (server-only, required)
 *  - RESEND_FROM     (optional; defaults to the Protocol sender below)
 *  - LEAD_EMAIL      (optional; overrides where leads land)
 *
 * If the API key is missing the handler returns a friendly error rather than
 * crashing, so the form fails loud to us (logs) but soft to the visitor.
 */

/**
 * Where leads land. LEAD_EMAIL wins so a deployment can redirect them without
 * a code change, and so a client who does not want their address published can
 * leave SITE_CONFIG.email empty (that value renders into JSON-LD and contact
 * blocks; this one never reaches the browser).
 */
const BUSINESS_EMAIL = process.env.LEAD_EMAIL?.trim() || SITE_CONFIG.email

/**
 * Protocol client sites send from protocoltext.com, never the customer's own
 * domain. One verified sending domain instead of one per client: client domains
 * are usually brand new with no sending reputation, and many clients run their
 * business mail on Gmail, so adding SPF/DKIM to their zone risks breaking mail
 * they already receive. The display name is the business so the owner
 * recognizes it in their inbox; replyTo still carries the visitor's address.
 * Override per deployment with RESEND_FROM only if a client genuinely needs it.
 */
const DEFAULT_FROM = `${BUSINESS_NAME} <quotes@protocoltext.com>`

const photoSchema = z.object({
  filename: z.string().trim().min(1).max(200),
  /** base64 payload, no data-URI prefix. ~6MB encoded ceiling per photo. */
  data: z.string().min(1).max(8_000_000),
})

const inputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().max(40).optional().default(''),
  email: z.string().trim().email(),
  /** "Home" or "Business" (quote wizard). */
  propertyType: z.string().trim().max(40).optional().default(''),
  /** Single service (legacy contact form). */
  service: z.string().trim().max(160).optional().default(''),
  /** Multiple services (quote wizard). */
  services: z.array(z.string().trim().max(160)).max(12).optional().default([]),
  /** How soon they need it (quote wizard). */
  urgency: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().max(4000).optional().default(''),
  /** Optional promo / referral code (quote wizard). */
  promo: z.string().trim().max(80).optional().default(''),
  photos: z.array(photoSchema).max(6).optional().default([]),
  /** 10DLC marketing consent, recorded with the lead for compliance. */
  emailOptIn: z.boolean().optional().default(false),
  smsOptIn: z.boolean().optional().default(false),
  kind: z.enum(['quote', 'general']).optional().default('quote'),
  /** Honeypot, must stay empty. Bots fill it; humans never see it. */
  hp: z.string().max(200).optional().default(''),
})

type ContactResult =
  | { ok: true }
  | { ok: false; error: string; reason: 'config' | 'api' | 'network' | 'invalid' }

export const submitContact = createServerFn({ method: 'POST' })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<ContactResult> => {
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM?.trim() || DEFAULT_FROM

    if (!apiKey) {
      console.warn(
        '[contact] RESEND_API_KEY is not set. Contact form is dormant.',
      )
      return {
        ok: false,
        reason: 'config',
        error: 'The contact form is temporarily unavailable. Please call or text us instead.',
      }
    }

    // Honeypot: a bot filled the hidden field. Pretend success, send nothing.
    if (data.hp.trim()) {
      console.warn('[contact] honeypot tripped, dropping submission')
      return { ok: true }
    }

    // Reject made-up phone numbers (when a phone was provided).
    if (data.phone && !isPlausiblePhone(data.phone)) {
      return {
        ok: false,
        reason: 'invalid',
        error: 'That phone number doesn’t look right. Please double-check it so we can text your quote.',
      }
    }

    // Reject malformed, disposable, or unreachable email domains. The domain
    // check fails open on a DNS hiccup, so real leads are never lost to it.
    const badEmail = {
      ok: false as const,
      reason: 'invalid' as const,
      error: 'That email doesn’t look right. Please check it so we can send your quote.',
    }
    if (!isWellFormedEmail(data.email) || isDisposableEmail(data.email)) {
      return badEmail
    }
    if (!(await domainCanReceiveMail(emailDomain(data.email)))) {
      return badEmail
    }

    // Services: prefer the multi-select list, fall back to the single field.
    const serviceList = data.services.length
      ? data.services
      : data.service
        ? [data.service]
        : []

    const rows: Array<[string, string]> = [['Name', data.name]]
    if (data.phone) rows.push(['Phone', data.phone])
    rows.push(['Email', data.email])
    if (data.propertyType) rows.push(['Property type', data.propertyType])
    if (serviceList.length) rows.push(['Service', serviceList.join(', ')])
    if (data.urgency) rows.push(['How soon', data.urgency])
    if (data.promo) rows.push(['Code', data.promo])
    if (data.photos.length) rows.push(['Photos', `${data.photos.length} attached`])
    if (data.kind === 'quote') {
      rows.push(['Email opt-in', data.emailOptIn ? 'Yes' : 'No'])
      rows.push(['SMS opt-in', data.smsOptIn ? 'Yes' : 'No'])
    }

    const subject =
      data.kind === 'general'
        ? `New message from ${data.name}`
        : `New quote request from ${data.name}`

    const text = [
      ...rows.map(([k, v]) => `${k}: ${v}`),
      '',
      data.message || '(no message)',
    ].join('\n')

    const attachments = data.photos.map((p, i) => ({
      filename: p.filename || `photo-${i + 1}.jpg`,
      content: p.data,
    }))

    try {
      const resend = new Resend(apiKey)
      const { error } = await resend.emails.send({
        from,
        to: BUSINESS_EMAIL,
        replyTo: data.email,
        subject,
        text,
        ...(attachments.length ? { attachments } : {}),
      })

      if (error) {
        console.error('[contact] Resend send error', error)
        return {
          ok: false,
          reason: 'api',
          error: 'Something went wrong sending your request. Please call or text us instead.',
        }
      }
      return { ok: true }
    } catch (err) {
      console.error('[contact] network error', err)
      return {
        ok: false,
        reason: 'network',
        error: 'Could not reach our server. Please try again, or call or text us.',
      }
    }
  })
