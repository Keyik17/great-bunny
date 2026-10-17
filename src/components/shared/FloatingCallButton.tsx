import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useLocale } from '~/i18n/locale'
import styles from './FloatingCallButton.module.css'
import { BUSINESS_NAME, SITE_CONFIG, TEL_HREF } from '~/config/site'

/** Past this fraction of the page, the pill switches from "call" to "free quote". */
const QUOTE_AT = 0.45

/**
 * FloatingCallButton, pinned bottom-right pill (mobile: circle), revealed
 * after the user scrolls past the trigger threshold.
 *
 * Two scroll-driven behaviors:
 *  - It hides once the footer scrolls into view (no overlap with footer CTAs).
 *  - It starts as a click-to-call pill, then swaps to a "Get a free quote" pill
 *    once the reader is ~45% down the page (warmer intent the deeper they go).
 *
 * Entrance: 250ms fade + 16px translateY, ease-out-expo. Reduced motion: instant.
 */
export function FloatingCallButton() {
  const locale = useLocale()
  const es = locale === 'es'

  const [pastTrigger, setPastTrigger] = useState(false)
  const [footerInView, setFooterInView] = useState(false)
  const [mode, setMode] = useState<'call' | 'quote'>('call')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setPastTrigger(y > window.innerHeight)
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? y / scrollable : 0
      setMode(pct >= QUOTE_AT ? 'quote' : 'call')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Hide the pill the moment the footer enters the viewport.
  useEffect(() => {
    const footer = document.getElementById('footer')
    if (!footer) return
    const io = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  const visible = pastTrigger && !footerInView
  const isQuote = mode === 'quote'

  const callLabel = SITE_CONFIG.phone.display
  const quoteLabel = es ? 'Cotización gratis' : 'Get a free quote'
  const quoteTo = '/free-quote'

  const content = (
    <span className={styles.content} key={mode}>
      {isQuote ? (
        <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.59 13.41 11 3.82A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59A2 2 0 0 0 3.59 11l9.59 9.59a2 2 0 0 0 2.83 0l4.58-4.58a2 2 0 0 0 0-2.83Z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          />
          <path d="M7 7h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      )}
      <span className={styles.label}>{isQuote ? quoteLabel : callLabel}</span>
    </span>
  )

  return (
    <div className={`${styles.wrap} ${visible ? styles.visible : ''}`} aria-hidden={!visible}>
      {isQuote ? (
        <Link
          to={quoteTo}
          className={styles.button}
          aria-label={quoteLabel}
          tabIndex={visible ? 0 : -1}
          data-cta="floating"
        >
          {content}
        </Link>
      ) : (
        <a
          href={TEL_HREF}
          className={styles.button}
          aria-label={`Call ${BUSINESS_NAME} at ${SITE_CONFIG.phone.display}`}
          tabIndex={visible ? 0 : -1}
          data-cta="floating"
        >
          {content}
        </a>
      )}
    </div>
  )
}
