import { useEffect } from 'react'

/**
 * Minimal GA4 event helper. Pushes through the gtag/dataLayer set up in the
 * root document. Safe to call anywhere: it no-ops during SSR, and gtag only
 * forwards to GA on the production hostname, so dev and preview builds stay quiet.
 */
type EventParams = Record<string, string | number | boolean | undefined>

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Array<Record<string, unknown>>
  }
  const clean: Record<string, string | number | boolean> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') clean[k] = v
  }
  if (typeof w.gtag === 'function') {
    w.gtag('event', name, clean)
  } else if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: name, ...clean })
  }
}

/**
 * Site-wide click tracking. A single delegated listener captures every quote
 * CTA, WhatsApp, and email click without per-component wiring, so new buttons
 * are covered automatically. (Phone taps are tracked by the existing call_click
 * tag, so they're intentionally left out here.) Add `data-cta="<name>"` to any
 * element to label where the click happened. Mounted once in the root document.
 */
export function useClickTracking(): void {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const el = target?.closest('a, button') as HTMLElement | null
      if (!el) return
      const anchor = el.closest('a') as HTMLAnchorElement | null
      const href = anchor?.getAttribute('href') ?? ''
      const link_text = (el.textContent ?? '').trim().slice(0, 80)
      const location = el.getAttribute('data-cta') ?? undefined
      const page = window.location.pathname

      if (/wa\.me|api\.whatsapp\.com|whatsapp\.com/i.test(href)) {
        trackEvent('click_whatsapp', { location, link_text, page })
      } else if (href.startsWith('mailto:')) {
        trackEvent('click_email', { email: href.slice(7), location, link_text, page })
      } else if (/\/free-quote(?:$|[/?#])/.test(href)) {
        // Feeds the existing "quote_cta_click" key event. Phone taps are left to
        // the existing call_click tag so calls aren't double-counted.
        trackEvent('quote_cta_click', { location, link_text, page })
      }
    }
    // Capture phase so the event still fires for clicks on inner elements (icons,
    // spans) and before any handler navigates away.
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
}
