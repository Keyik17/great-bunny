import { createFileRoute, Link } from '@tanstack/react-router'
import {
  GlobeHemisphereWest,
  HandHeart,
  Heart,
  SealCheck,
  ShieldCheck,
  Timer,
  Users,
} from '@phosphor-icons/react'
import { JsonLd } from '~/components/shared/JsonLd'
import { LandingReveal } from '~/components/sections/LandingReveal'
import { BUSINESS_NAME, SITE, SITE_CONFIG, TEL_HREF } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

const URL = `${SITE}/about`
const TITLE = `About ${BUSINESS_NAME}`
const DESCRIPTION =
  'Meet Marco Reyes, founder of Great Bunny LLC, a Black-owned and Latinx-owned Denver metro drain cleaning company built on trust and service.'

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust',
    description:
      'Customers deserve to feel comfortable with the professionals entering their homes and businesses. We earn trust through transparency and professionalism.',
  },
  {
    icon: Timer,
    title: 'Reliability',
    description:
      "Drain problems need efficient and dependable solutions. When we say we'll be there, we show up on time, every time.",
  },
  {
    icon: HandHeart,
    title: 'Integrity',
    description:
      'We believe in honest communication and fair pricing. Clear quotes, practical guidance, and straightforward service.',
  },
  {
    icon: Heart,
    title: 'Service',
    description:
      'Helping people solve frustrating problems is at the center of everything we do. Your peace of mind is our priority.',
  },
]

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${URL}#aboutpage`,
  url: URL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: 'en-US',
  about: { '@id': `${SITE}/#org` },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE}/about#marcus-centeno`,
  name: 'Marco Reyes',
  jobTitle: 'Founder',
  worksFor: { '@id': `${SITE}/#org`, name: 'Great Bunny LLC' },
  award: 'Young Americans Fully Charged finalist',
}

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      ...seo({ title: TITLE, description: DESCRIPTION }),
      { property: 'og:url', content: URL },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: About,
})

function About() {
  return (
    <main id="main" className={styles.page}>
      <JsonLd data={aboutJsonLd} />
      <JsonLd data={personJsonLd} />

      <section className={styles.section} aria-labelledby="about-title">
        <div className={`${styles.container} ${styles.split}`}>
          <LandingReveal className={styles.heroImage}>
            <img
              src="/photos/about/founder-marcus-portrait.jpg"
              alt="Marco Reyes, founder of Great Bunny LLC"
            />
          </LandingReveal>
          <LandingReveal className={styles.stack}>
            <h1 id="about-title" className={styles.title}>
              Built on hard work,<br />service, and <span className={styles.script}>Trust</span>
            </h1>
            <p className={styles.body}>
              Great Bunny was founded by Marco Reyes with a simple mission:
              provide reliable drain cleaning services while treating every
              customer with honesty and respect.
            </p>
          </LandingReveal>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="started-title">
        <LandingReveal className={`${styles.container} ${styles.centerStack}`}>
          <h2 id="started-title" className={styles.sectionTitle}>
            How it all <span className={styles.script}>Started</span>
          </h2>
          <p className={styles.body}>
            Marco Reyes's passion for service was shaped early in life
            through hard work, responsibility, and a genuine desire to support
            others during difficult times. That foundation led him to the
            plumbing industry, where a mentor provided valuable experience,
            guidance, and equipment that helped launch Great Bunny into what it
            is today. Founded in October 2023, Great Bunny LLC combines years
            of hands-on drain cleaning experience with knowledge developed
            alongside seasoned plumbing professionals.
          </p>
          <div className={styles.stats} aria-label="Company milestones">
            {[
              ['Since 2023', 'In business'],
              ['4', 'Cities served'],
              ['5.0', 'On Yelp'],
              ['A', 'BBB rating'],
            ].map(([value, label]) => (
              <div className={styles.stat} key={label}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </LandingReveal>
      </section>

      <section className={styles.section} aria-labelledby="values-title">
        <div className={`${styles.container} ${styles.centerStack}`}>
          <h2 id="values-title" className={styles.sectionTitle}>
            Our core values
          </h2>
          <div className={styles.grid4}>
            {values.map((value) => {
              const Icon = value.icon
              return (
                <LandingReveal className={styles.card} key={value.title}>
                  <span className={`${styles.iconBox} ${styles.iconCentered}`} aria-hidden="true">
                    <Icon size={24} weight="regular" />
                  </span>
                  <h3 className={styles.h3}>{value.title}</h3>
                  <p className={styles.muted}>{value.description}</p>
                </LandingReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className={styles.page} aria-label="Company identity">
        <div className={styles.rowBand}>
          <div className={styles.wideImage}>
            <img
              src="/photos/about/identity-denver-streetscape.jpg"
              alt="Denver streetscape near the Great Bunny service area"
            />
          </div>
          <div className={styles.rowContent}>
            <h2 className={styles.sectionTitle}>
              Black-owned and<br /><span className={styles.script}>Latinx-owned</span>
            </h2>
            <p className={styles.body}>
              Great Bunny is proudly Black-owned and Latinx-owned, rooted in
              the Denver community with a deep commitment to diversity,
              dedication, and top-notch service on every job.
            </p>
            <div className={styles.badgeRow}>
              <span className={styles.badge}><Heart size={14} />Black-Owned</span>
              <span className={styles.badge}>
                <GlobeHemisphereWest size={14} />Latinx-Owned
              </span>
            </div>
          </div>
        </div>
        <div className={styles.rowBand}>
          <div className={styles.rowContent}>
            <h2 className={styles.sectionTitle}>
              Family first,<br />community always
            </h2>
            <p className={styles.body}>
              Built on family values, Great Bunny treats every customer like a
              neighbor. We're ASL proficient, open to all, and proud to offer
              military discounts because great service should be accessible to
              everyone.
            </p>
            <div className={styles.badgeRow}>
              <span className={styles.badge}><Users size={14} />Family Business</span>
              <span className={styles.badge}><SealCheck size={14} />Military Discount</span>
              <span className={styles.badge}><HandHeart size={14} />ASL Proficient</span>
            </div>
          </div>
          <div className={styles.wideImage}>
            <img
              src="/photos/about/identity-community.jpg"
              alt="Community gathering in the Denver metro area"
            />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark} ${styles.compact}`} aria-labelledby="about-cta-title">
        <LandingReveal className={`${styles.container} ${styles.centerStack}`}>
          <h2 id="about-cta-title" className={styles.sectionTitle}>
            Ready to experience<br />the difference
          </h2>
          <p className={styles.body}>
            Whether it's an emergency backup or routine maintenance, Great Bunny
            is here to help.
          </p>
          <div className={styles.actions}>
            <Link className={styles.buttonLight} to="/free-quote">
              Book the job
            </Link>
            <a className={styles.buttonOutline} href={TEL_HREF}>
              {SITE_CONFIG.phone.display}
            </a>
          </div>
        </LandingReveal>
      </section>
    </main>
  )
}
