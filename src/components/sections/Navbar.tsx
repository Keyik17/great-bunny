import { Link, useRouterState } from '@tanstack/react-router'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { TEL_HREF, SITE_CONFIG } from '~/config/site'
import { SERVICES } from '~/data/services'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Service Areas', to: '/locations' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
] as const

type MobilePanel = 'main' | 'services'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('main')
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const firstMobileActionRef = useRef<HTMLAnchorElement | null>(null)
  const servicesBackRef = useRef<HTMLButtonElement | null>(null)
  const hadMobileOpenRef = useRef(false)

  useEffect(() => {
    setMobileOpen(false)
    setMobilePanel('main')
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) {
      if (hadMobileOpenRef.current) {
        triggerRef.current?.focus()
      }
      hadMobileOpenRef.current = false
      setMobilePanel('main')
      return
    }

    hadMobileOpenRef.current = true
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return

    const animationFrame = window.requestAnimationFrame(() => {
      // preventScroll: focusing inside the overflow-hidden panels wrap would
      // otherwise scroll it sideways and double-shift the slide transform.
      if (mobilePanel === 'services') {
        servicesBackRef.current?.focus({ preventScroll: true })
      } else {
        firstMobileActionRef.current?.focus({ preventScroll: true })
      }
      const wrap = servicesBackRef.current?.closest(`.${styles.mobilePanelsWrap}`)
      if (wrap) wrap.scrollLeft = 0
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [mobileOpen, mobilePanel])

  return (
    <header className={styles.nav} aria-label="Primary navigation">
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Great Bunny home">
          <img
            src="/brand/logo-bunny-icon-square-512.png"
            alt=""
            aria-hidden="true"
            className={styles.brandIcon}
            width={32}
            height={32}
          />
          <span className={styles.brandText}>Great Bunny</span>
        </Link>

        <nav className={styles.links} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.link}
              activeProps={{ className: `${styles.link} ${styles.linkActive}` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.ctaGroup}>
          <Link to="/free-quote" className={styles.cta}>
            Schedule Service
          </Link>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((isOpen) => !isOpen)}
        >
          <span className={styles.menuLines} aria-hidden="true">
            <span data-line="top" data-open={mobileOpen} />
            <span data-line="mid" data-open={mobileOpen} />
            <span data-line="bot" data-open={mobileOpen} />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
      >
        <div className={styles.mobilePanelsWrap}>
          <div className={styles.mobilePanels} data-panel={mobilePanel}>
            <nav
              className={styles.mobilePanel}
              aria-label="Mobile navigation"
              aria-hidden={mobilePanel !== 'main'}
            >
              {NAV_LINKS.map((link, index) => {
                if (link.to === '/services') {
                  return (
                    <button
                      key={link.to}
                      type="button"
                      className={styles.mobileLink}
                      aria-label="Open services menu"
                      onClick={() => setMobilePanel('services')}
                      tabIndex={mobileOpen && mobilePanel === 'main' ? 0 : -1}
                    >
                      <span>{link.label}</span>
                      <CaretRight size={20} weight="bold" aria-hidden="true" />
                    </button>
                  )
                }

                return (
                  <Link
                    key={link.to}
                    ref={index === 0 ? firstMobileActionRef : undefined}
                    to={link.to}
                    className={styles.mobileLink}
                    activeProps={{ className: `${styles.mobileLink} ${styles.mobileLinkActive}` }}
                    tabIndex={mobileOpen && mobilePanel === 'main' ? 0 : -1}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <nav
              className={styles.mobilePanel}
              aria-label="Services navigation"
              aria-hidden={mobilePanel !== 'services'}
            >
              <button
                ref={servicesBackRef}
                type="button"
                className={styles.mobileBack}
                aria-label="Back to main menu"
                onClick={() => setMobilePanel('main')}
                tabIndex={mobileOpen && mobilePanel === 'services' ? 0 : -1}
              >
                <CaretLeft size={20} weight="bold" aria-hidden="true" />
                <span>Back</span>
              </button>

              <div className={styles.mobileServiceGrid}>
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className={styles.mobileServiceCard}
                    style={{ backgroundImage: `url(${service.image})` }}
                    tabIndex={mobileOpen && mobilePanel === 'services' ? 0 : -1}
                  >
                    <span className={styles.mobileServiceName}>{service.name}</span>
                  </Link>
                ))}
              </div>

              <Link
                to="/services"
                className={styles.mobileAllServices}
                tabIndex={mobileOpen && mobilePanel === 'services' ? 0 : -1}
              >
                <span>All services</span>
                <CaretRight size={20} weight="bold" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </div>

        <div className={styles.mobileFooter}>
          <Link to="/free-quote" className={styles.mobileCta} tabIndex={mobileOpen ? 0 : -1}>
            Schedule Service
          </Link>
          <a
            href={TEL_HREF}
            className={styles.mobileCtaSecondary}
            tabIndex={mobileOpen ? 0 : -1}
            onClick={() => setMobileOpen(false)}
          >
            Call {SITE_CONFIG.phone.display}
          </a>
        </div>
      </div>
    </header>
  )
}
