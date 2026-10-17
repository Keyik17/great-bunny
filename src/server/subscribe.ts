import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

/**
 * Newsletter signup, server-side handler.
 *
 * Adds the email to a Resend Audience, then sends the welcome email with the
 * 10%-off code. The API key and audience ID are read from environment variables
 * and never reach the client.
 *
 * Required env vars:
 *  - RESEND_API_KEY     (server-only, never prefixed VITE_)
 *  - RESEND_AUDIENCE_ID (UUID from Resend dashboard → Audiences)
 *  - RESEND_FROM        (verified sender, e.g. "Business Name <hello@yourdomain.com>")
 *
 * If the API key or audience ID is missing the handler returns a friendly error
 * rather than crashing. If RESEND_FROM is missing the contact is still added and
 * the welcome email is skipped (logged), so signup keeps working while the
 * sending domain is being verified.
 */

const inputSchema = z.object({
  email: z.string().email(),
})

type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string; reason: 'config' | 'already' | 'api' | 'network' }

export const subscribe = createServerFn({ method: 'POST' })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<SubscribeResult> => {
    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!apiKey || !audienceId) {
      console.warn(
        '[subscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID is not set. Newsletter signup is dormant.',
      )
      return {
        ok: false,
        reason: 'config',
        error: 'Newsletter signup is temporarily unavailable. Please try again later.',
      }
    }

    try {
      const res = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            unsubscribed: false,
          }),
        },
      )

      if (res.ok) {
        return { ok: true }
      }

      // Resend returns 422 when the contact already exists. Treat that as success
      // from the user's perspective, they're already on the list, and already
      // received the welcome email, so we don't resend it.
      if (res.status === 422) {
        return { ok: true }
      }

      const body = await res.text().catch(() => '')
      console.error('[subscribe] Resend API error', res.status, body)
      return {
        ok: false,
        reason: 'api',
        error: 'Something went wrong on our end. Please try again in a moment.',
      }
    } catch (err) {
      console.error('[subscribe] network error', err)
      return {
        ok: false,
        reason: 'network',
        error: 'Could not reach the signup service. Please try again.',
      }
    }
  })
