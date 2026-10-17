import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { TEL_HREF, SITE_CONFIG } from '~/config/site'
import { SERVICES } from '~/data/services'
import { FOOTER_LOCATIONS } from '~/data/locations'
import { FOOTER_COPY } from '~/content/copy'
import styles from './Footer.module.css'

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/legal/privacy-policy' },
  { label: 'Terms & Conditions', href: '/legal/terms-conditions' },
] as const

export function Footer() {
  const t = FOOTER_COPY.en

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.watermark} aria-hidden="true">
        GREAT BUNNY
      </div>

      <div className={styles.top}>
        <div className={styles.brandColumn}>
          <Link to="/" className={styles.logoRow} aria-label="Great Bunny home">
            <img
              src="/brand/logo-bunny-icon-square-512.png"
              alt=""
              aria-hidden="true"
              className={styles.logoIcon}
              width={32}
              height={32}
            />
            <span className={styles.logoText}>Great Bunny</span>
          </Link>
          <p className={styles.brandText}>{t.brandDescription}</p>
        </div>

        <FooterColumn title="Services">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className={styles.footerLink}
            >
              {service.name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Service areas">
          {FOOTER_LOCATIONS.map((location) => (
            <a
              key={location.slug}
              href={`/locations/${location.slug}`}
              className={styles.footerLink}
            >
              {location.name}
            </a>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          {COMPANY_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.footerLink}>
              {link.label}
            </a>
          ))}
        </FooterColumn>
      </div>

      <div className={styles.bottom}>
        <div className={styles.legal}>
          <p className={styles.copyright}>
            © 2026 Great Bunny LLC. All rights reserved.
          </p>
          <span className={styles.contactLink}>
            Made By{' '}
            <a
              href="https://protocoltext.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
              aria-label="Protocol"
            >
              PROTOCO
            </a>
            <a
              href="https://protocolsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
              aria-label="Protocol website"
            >
              L
            </a>
          </span>
        </div>
        <div className={styles.contact}>
          <a href={TEL_HREF} className={styles.contactLink}>
            {SITE_CONFIG.phone.display}
          </a>
          <a href={`mailto:${SITE_CONFIG.email}`} className={styles.contactLink}>
            {SITE_CONFIG.email}
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className={styles.column}>
      <p className={styles.columnTitle}>{title}</p>
      <div className={styles.columnLinks}>{children}</div>
    </div>
  )
}
