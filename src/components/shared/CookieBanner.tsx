import { useEffect, useState } from 'react'
import styles from './CookieBanner.module.css'

/**
 * Cookie-consent master switch. OFF BY DEFAULT.
 *
 * Sable sites ship with no analytics by default (cookieless-ready), which needs
 * no consent banner, no Google Consent Mode script, and no cookie policy. When this is
 * false: the banner never renders, the Consent Mode script is omitted from the
 * document, and the cookie-policy link is dropped from the footer + sitemap
 * (the page file stays parked). Flip to true for a client that uses cookie-based
 * analytics/ads (e.g. GA4/GTM) or otherwise needs consent. Footer, SiteMap, and
 * __root all read this flag.
 */
export const ENABLE_COOKIE_CONSENT = false

const STORAGE_KEY = 'cookie-consent'

type Choice = 'accepted' | 'declined'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Push a Consent Mode v2 update so GA4/Ads start (or stay) gated correctly. */
function updateConsent(granted: boolean) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const value = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    ad_storage: value,
    analytics_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  })
}

type Props = {
  /** Path to the cookie policy page (defaults to EN). */
  policyHref?: string
  /** Optional locale-specific copy. */
  locale?: 'en' | 'es'
}

/**
 * Bottom-pinned cookie consent banner. Stores user choice in localStorage.
 *
 * NOT yet wired into __root.tsx. Wire when analytics + the published
 * cookie policy ship together. Until then this is dormant code.
 */
export function CookieBanner({ policyHref, locale = 'en' }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ENABLE_COOKIE_CONSENT) return
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted' || stored === 'declined') return
    const t = setTimeout(() => setVisible(true), 600)
    return () => clearTimeout(t)
  }, [])

  const record = (choice: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // Ignore storage failures (private browsing, etc.). Banner just won't
      // remember the choice across sessions.
    }
    updateConsent(choice === 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  const copy = locale === 'es' ? COPY_ES : COPY_EN
  const href = policyHref ?? (locale === 'es' ? '/es/legal/cookie-policy' : '/legal/cookie-policy')

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label={copy.ariaLabel}>
      <p className={styles.copy}>
        {copy.body1}
        <br className={styles.copyBreak} />{' '}
        {copy.body2} <a href={href}>{copy.linkLabel}</a>
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.decline} onClick={() => record('declined')}>
          {copy.decline}
        </button>
        <button type="button" className={styles.accept} onClick={() => record('accepted')}>
          {copy.accept}
        </button>
      </div>
    </div>
  )
}

const COPY_EN = {
  ariaLabel: 'Cookie consent',
  body1: 'This site uses cookies for essential functionality and analytics to understand how the site is used.',
  body2: 'You can deny non-essential cookies anytime.',
  linkLabel: 'Privacy Policy',
  decline: 'Deny Non-Essential',
  accept: 'Accept',
}

const COPY_ES = {
  ariaLabel: 'Consentimiento de cookies',
  body1: 'Este sitio usa cookies para funciones esenciales y análisis para entender cómo se usa.',
  body2: 'Puedes rechazar las cookies no esenciales en cualquier momento.',
  linkLabel: 'Política de privacidad',
  decline: 'Rechazar no esenciales',
  accept: 'Aceptar',
}
