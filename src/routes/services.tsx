import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { LandingReveal } from '~/components/sections/LandingReveal'
import { SERVICE_CATEGORIES, SERVICES } from '~/data/services'
import { BUSINESS_NAME, SITE } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

const URL = `${SITE}/services`
const DESCRIPTION =
  'Professional drain cleaning services from Great Bunny LLC for emergency clogs, sewer lines, residential drains, and commercial drain systems.'

const serviceBullets: Record<string, { lead: string; items: string[] }> = {
  'emergency-drain-cleaning': {
    lead: 'We commonly help with:',
    items: [
      'Overflowing drains',
      'Emergency sewer backups',
      'Standing water removal',
      'Severe drain blockages',
      'Slow or completely clogged drains',
      'After-hours urgent drain issues',
      'Kitchen and bathroom drain emergencies',
      'Fast diagnostics and drain clearing',
    ],
  },
  'sewer-drain-cleaning': {
    lead: 'Our sewer drain services include:',
    items: [
      'Sewer line blockage removal',
      'Main sewer line cleaning',
      'Recurring sewer backup solutions',
      'Preventative sewer maintenance',
      'Drain flow inspections',
      'Root intrusion removal assistance',
      'Residential and commercial sewer drain clearing',
      'Long-term drainage improvement recommendations',
    ],
  },
  'residential-drain-cleaning': {
    lead: 'We commonly help with:',
    items: [
      'Kitchen sink clogs',
      'Bathroom drain blockages',
      'Slow drains',
      'Standing water',
      'Recurring drainage problems',
    ],
  },
  'commercial-drain-cleaning': {
    lead: 'Commercial Services Include:',
    items: [
      'Drain clearing',
      'Sewer drain cleaning',
      'Preventative drain maintenance',
      'Emergency commercial drain services',
    ],
  },
}

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      ...seo({ title: 'Services | Great Bunny LLC', description: DESCRIPTION }),
      { property: 'og:url', content: URL },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: Services,
})

function Services() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.section} aria-labelledby="services-title">
        <LandingReveal className={`${styles.container} ${styles.centerStack}`}>
          <p className={styles.eyebrow}>Services</p>
          <h1 id="services-title" className={styles.title}>
            Professional drain<br />cleaning services
          </h1>
          <p className={styles.body}>
            Reliable drain cleaning and sewer drain solutions for homes and
            businesses across Denver, Lakewood, Arvada, and Boulder.
          </p>
        </LandingReveal>
      </section>

      <section className={styles.section} aria-label="Service categories">
        <div className={`${styles.container} ${styles.stack}`}>
          {SERVICE_CATEGORIES.map((category) => (
            <LandingReveal className={styles.lineCard} key={category.id}>
              <div className={styles.narrowSplit}>
                <div className={styles.stack}>
                  <span className={styles.legalNumber}>{category.number}</span>
                  <h2 className={styles.sectionTitle}>{category.name}</h2>
                  <p className={styles.body}>{category.subtitle}</p>
                </div>
                <div className={styles.grid2}>
                  {category.slugs.map((slug) => {
                    const service = SERVICES.find((item) => item.slug === slug)
                    if (!service) return null
                    const Icon = service.icon
                    const bulletGroup = serviceBullets[service.slug]
                    return (
                      <article className={`${styles.card} ${styles.cardStretch}`} key={service.slug}>
                        <span className={styles.iconBox} aria-hidden="true">
                          <Icon size={24} weight="regular" />
                        </span>
                        <h3 className={styles.h3}>{service.name}</h3>
                        <p className={styles.muted}>{service.shortDescription}</p>
                        <p className={styles.body}>{bulletGroup.lead}</p>
                        <ul className={styles.checkList}>
                          {bulletGroup.items.map((item) => (
                            <li className={styles.checkItem} key={item}>
                              <CheckCircle size={16} weight="regular" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <Link
                          className={styles.textLink}
                          to="/services/$slug"
                          params={{ slug: service.slug }}
                        >
                          Learn more <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                      </article>
                    )
                  })}
                </div>
              </div>
            </LandingReveal>
          ))}
        </div>
      </section>
    </main>
  )
}
