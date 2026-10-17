import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

/**
 * Unsubscribe, server-side handler.
 *
 * Marks the contact as unsubscribed in the Resend Audience (a reversible flag,
 * so they stay on the list but stop receiving broadcasts). Triggered from the
 * /unsubscribe page, which is linked from the email footer + List-Unsubscribe
 * header. Always resolves softly: a backend hiccup is logged, never surfaced,
 * since the page should reassure the visitor either way.
 *
 * Required env vars (shared with the newsletter signup):
 *  - RESEND_API_KEY
 *  - RESEND_AUDIENCE_ID
 */

const inputSchema = z.object({ email: z.string().email() })

export const unsubscribeContact = createServerFn({ method: 'POST' })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!apiKey || !audienceId) {
      console.warn('[unsubscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID is not set.')
      return { ok: false }
    }
    try {
      const res = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(data.email)}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ unsubscribed: true }),
        },
      )
      // 404 = not on the list; treat as already-unsubscribed (success).
      if (!res.ok && res.status !== 404) {
        const body = await res.text().catch(() => '')
        console.error('[unsubscribe] Resend API error', res.status, body)
        return { ok: false }
      }
      return { ok: true }
    } catch (err) {
      console.error('[unsubscribe] network error', err)
      return { ok: false }
    }
  })
