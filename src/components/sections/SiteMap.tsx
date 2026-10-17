import { CaretRight } from '@phosphor-icons/react'
import { Container } from '~/components/shared/Container'
import { Eyebrow } from '~/components/shared/Eyebrow'
import { SectionShell } from '~/components/shared/SectionShell'
import { ENABLE_COOKIE_CONSENT } from '~/components/shared/CookieBanner'
import { SERVICES } from '~/data/services'
import { LOCATIONS } from '~/data/locations'
import { useLocale } from '~/i18n/locale'
import styles from './SiteMap.module.css'
import { SITEMAP_COPY as COPY } from '~/content/copy'

/**
 * Human-readable HTML sitemap. One crawlable page that links to every service,
 * service area, and article with descriptive anchor text, an internal-linking
 * and discoverability aid that complements the XML sitemap at /sitemap.xml.
 */

type LinkItem = { label: string; href: string }

export function SiteMap() {
  const locale = useLocale()
  const es = locale === 'es'
  const t = COPY[locale]
  const p = (path: string) => (es ? (path === '/' ? '/es' : `/es${path}`) : path)

  const groups: Array<{ heading: string; links: LinkItem[] }> = [
    {
      heading: t.main,
      links: [
        { label: t.pages.home, href: p('/') },
        { label: t.pages.services, href: p('/services') },
        { label: t.pages.pricing, href: p('/pricing') },
        { label: t.pages.locations, href: p('/locations') },
        { label: t.pages.blog, href: p('/blog') },
        { label: t.pages.about, href: p('/about') },
        { label: t.pages.faq, href: p('/faq') },
        { label: t.pages.contact, href: p('/contact') },
        { label: t.pages.quote, href: p('/free-quote') },
      ],
    },
    {
      heading: t.services,
      links: SERVICES.map((s) => ({
        label: es ? s.nameEs : s.name,
        href: p(`/services/${s.slug}`),
      })),
    },
    {
      heading: t.areas,
      links: LOCATIONS.map((l) => ({ label: l.name, href: p(`/locations/${l.slug}`) })),
    },
    {
      heading: t.legal,
      links: [
        { label: t.pages.privacy, href: p('/legal/privacy-policy') },
        { label: t.pages.terms, href: p('/legal/terms-conditions') },
        ...(ENABLE_COOKIE_CONSENT
          ? [{ label: t.pages.cookies, href: p('/legal/cookie-policy') }]
          : []),
      ],
    },
  ]

  return (
    <SectionShell id="sitemap" labelledBy="sitemap-title" surface="bg">
      <Container>
        <header className={styles.head}>
          <Eyebrow variant="title">{t.eyebrow}</Eyebrow>
          <h1 className={styles.title} id="sitemap-title">
            {t.title}
          </h1>
          <p className={styles.intro}>{t.intro}</p>
        </header>

        <div className={styles.grid}>
          {groups.map((group) => (
            <section key={group.heading} className={styles.group}>
              <h2 className={styles.groupTitle}>{group.heading}</h2>
              <ul className={styles.links}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.link}>
                      <CaretRight size={13} weight="bold" className={styles.linkIcon} />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </SectionShell>
  )
}
