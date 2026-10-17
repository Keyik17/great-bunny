/**
 * Server-side spam / junk-input defenses for the contact + quote forms.
 *
 * These run on the server function (Cloudflare Workers in prod, Node in dev) so
 * they cannot be bypassed by editing the client. They add no friction for real
 * visitors: no captcha, no extra fields to fill. The goal is to catch the two
 * things people actually type to dodge a form: a fake email on a domain that
 * cannot receive mail, and a made-up phone number.
 */

/** Throwaway / temp-mail domains we never want a lead from. */
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', 'sharklasers.com',
  '10minutemail.com', '10minutemail.net', 'tempmail.com', 'temp-mail.org',
  'throwawaymail.com', 'yopmail.com', 'getnada.com', 'nada.email', 'maildrop.cc',
  'dispostable.com', 'trashmail.com', 'mailnesia.com', 'fakeinbox.com',
  'mohmal.com', 'emailondeck.com', 'mailcatch.com', 'spamgourmet.com',
  'tempinbox.com', 'mailsac.com', 'inboxkitten.com', 'tempr.email',
  'discard.email', 'mintemail.com', 'maileater.com', 'spam4.me', 'grr.la',
])

/** A practical, strict-enough email shape (one @, a dot in the domain). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function emailDomain(email: string): string {
  return email.split('@')[1]?.trim().toLowerCase() ?? ''
}

export function isWellFormedEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim())
}

export function isDisposableEmail(email: string): boolean {
  return DISPOSABLE_DOMAINS.has(emailDomain(email))
}

/**
 * Confirm the email's domain can actually receive mail, via DNS-over-HTTPS
 * (works in the Workers runtime, no node:dns needed). A domain with no MX and
 * no A/AAAA record is junk (e.g. asdf@asdfasdf.com). On any network/DNS error
 * we FAIL OPEN (return true) so a flaky resolver never costs us a real lead.
 */
export async function domainCanReceiveMail(domain: string): Promise<boolean> {
  if (!domain) return false
  const ask = async (type: 'MX' | 'A') => {
    try {
      const res = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
        { headers: { accept: 'application/dns-json' } },
      )
      if (!res.ok) return null
      const json = (await res.json()) as { Answer?: Array<{ type: number }> }
      return Array.isArray(json.Answer) && json.Answer.length > 0
    } catch {
      return null // network/DNS failure, signal "unknown"
    }
  }
  const mx = await ask('MX')
  if (mx === null) return true // unknown, fail open
  if (mx) return true
  const a = await ask('A')
  if (a === null) return true // unknown, fail open
  return a
}

/** Digits only, dropping a leading US country code. Returns the 10 core digits or ''. */
export function normalizePhone(raw: string): string {
  let d = (raw || '').replace(/\D+/g, '')
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1)
  return d.length === 10 ? d : ''
}

/**
 * A plausible North American number: 10 digits, valid area + exchange codes
 * (both start 2-9 per the numbering plan), and not an obvious filler like
 * 0000000000, 1111111111, or 1234567890.
 */
export function isPlausiblePhone(raw: string): boolean {
  const d = normalizePhone(raw)
  if (!d) return false
  if (/^(\d)\1{9}$/.test(d)) return false // all same digit
  if (d === '1234567890' || d === '0123456789') return false
  const area = d[0]
  const exchange = d[3]
  if (area < '2' || exchange < '2') return false // NANP: N is 2-9
  return true
}
