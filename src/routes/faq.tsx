import { useEffect, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CurrencyDollar, Gift, ListBullets, Phone, Siren, Wrench } from '@phosphor-icons/react'
import { LandingFaqAccordion } from '~/components/sections/LandingFaqAccordion'
import { LandingReveal } from '~/components/sections/LandingReveal'
import { BUSINESS_NAME, SITE, SITE_CONFIG, TEL_HREF } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

const URL = `${SITE}/faq`
const TITLE = `FAQ - ${BUSINESS_NAME}`
const DESCRIPTION =
  'Answers to common questions about Great Bunny drain cleaning services, pricing, service areas, emergency response, and customer discounts.'

const categories = [
  {
    id: 'services',
    label: 'Our Services',
    icon: Wrench,
    items: [
      {
        id: 'types',
        number: '01',
        question: 'What types of drains do you clean?',
        answer:
          'We clean all types: kitchen sinks, bathroom drains, shower drains, floor drains, main sewer lines, and commercial drainage systems.',
      },
      {
        id: 'methods',
        number: '02',
        question: 'What methods do you use to clear drains?',
        answer:
          'Professional drain snaking and cabling equipment. We diagnose the problem first, then apply the most effective solution.',
      },
      {
        id: 'residential-commercial',
        number: '03',
        question: 'Do you serve both residential and commercial?',
        answer:
          'Yes! We handle both residential homes and commercial businesses throughout the Denver metro area.',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing & Areas',
    icon: CurrencyDollar,
    items: [
      {
        id: 'cost',
        number: '01',
        question: 'How much does drain cleaning cost?',
        answer:
          'Pricing varies by type and severity. We provide upfront quotes before starting work. Returning customer discount available.',
      },
      {
        id: 'areas',
        number: '02',
        question: 'What areas do you serve?',
        answer:
          'Denver, Lakewood, Arvada, and Boulder, CO. Call (720) 555-0186 to confirm your area.',
      },
    ],
  },
  {
    id: 'emergencies',
    label: 'Emergencies',
    icon: Siren,
    items: [
      {
        id: 'response',
        number: '01',
        question: 'How quickly can you respond to an emergency?',
        answer:
          'Same-day service in most cases, often within a few hours. After-hours and weekend service available for urgent situations.',
      },
      {
        id: 'waiting',
        number: '02',
        question: 'What should I do while waiting for a technician?',
        answer:
          'Stop using the affected drain, place towels around standing water, and avoid chemical drain cleaners. Our team handles everything from there.',
      },
    ],
  },
  {
    id: 'discounts',
    label: 'Discounts',
    icon: Gift,
    items: [
      {
        id: 'discounts',
        number: '01',
        question: 'Do you offer any discounts?',
        answer:
          'Yes. Returning customer discount with a code on our website. We also offer military discounts for service members and their families.',
      },
    ],
  },
]

export const Route = createFileRoute('/faq')({
  head: () => ({
    meta: [
      ...seo({ title: TITLE, description: DESCRIPTION }),
      { property: 'og:url', content: URL },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: Faq,
})

function sectionId(id: string) {
  return `faq-${id}`
}

function Faq() {
  // Highlights the section you're reading. "all" means you're above the
  // first section.
  const [active, setActive] = useState('all')

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      let current = 'all'
      for (const category of categories) {
        const el = document.getElementById(sectionId(category.id))
        if (el && el.getBoundingClientRect().top <= line) current = category.id
      }
      if (atBottom && current !== 'all') {
        current = categories[categories.length - 1].id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const jumpTo = (id: string) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = document.getElementById(
      id === 'all' ? 'faq-list' : sectionId(id),
    )
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <main id="main" className={styles.page}>
      <section className={styles.section} aria-labelledby="faq-title">
        <LandingReveal className={`${styles.container} ${styles.centerStack}`}>
          <h1 id="faq-title" className={styles.title}>
            Got <span className={styles.script}>Questions?</span>
          </h1>
          <p className={styles.body}>
            Everything you need to know about our drain cleaning services in
            Denver.
          </p>
        </LandingReveal>
      </section>

      <section className={styles.section} aria-label="FAQ categories">
        <div
          id="faq-list"
          className={`${styles.container} ${styles.sidebarLayout} ${styles.faqAnchor}`}
        >
          {/* Menu and help card share one sticky column so they move together. */}
          <div className={`${styles.sidebar} ${styles.sidebarColumn}`}>
            <nav className={styles.sidebarTabs} aria-label="FAQ navigation">
              <div className={styles.sideNav}>
                <button
                  className={`${styles.sideNavItem} ${
                    active === 'all' ? styles.sideNavItemActive : ''
                  }`}
                  type="button"
                  onClick={() => jumpTo('all')}
                  aria-current={active === 'all' ? 'true' : undefined}
                >
                  <ListBullets size={16} weight="regular" aria-hidden="true" />
                  All questions
                </button>
                {categories.map((category) => {
                  const Icon = category.icon
                  const selected = category.id === active
                  return (
                    <button
                      className={`${styles.sideNavItem} ${
                        selected ? styles.sideNavItemActive : ''
                      }`}
                      type="button"
                      key={category.id}
                      onClick={() => jumpTo(category.id)}
                      aria-current={selected ? 'true' : undefined}
                    >
                      <Icon size={16} weight="regular" aria-hidden="true" />
                      {category.label}
                    </button>
                  )
                })}
              </div>
            </nav>

            <div className={`${styles.lineCard} ${styles.sidebarHelp}`}>
              <h2 className={styles.h3}>Need quick help?</h2>
              <p className={styles.muted}>Call us for immediate help.</p>
              <a className={styles.buttonOutline} href={TEL_HREF}>
                <Phone size={16} weight="regular" aria-hidden="true" />
                {SITE_CONFIG.phone.display}
              </a>
            </div>
          </div>

          <LandingReveal className={`${styles.accordionGroup} ${styles.sidebarMain}`}>
            {categories.map((category) => (
              <div
                className={`${styles.smallStack} ${styles.faqAnchor}`}
                id={sectionId(category.id)}
                key={category.id}
              >
                <h2 className={styles.h3}>{category.label}</h2>
                <LandingFaqAccordion items={category.items} />
              </div>
            ))}
          </LandingReveal>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark} ${styles.compact}`} aria-labelledby="faq-cta-title">
        <LandingReveal className={`${styles.container} ${styles.centerStack}`}>
          <h2 id="faq-cta-title" className={styles.sectionTitle}>
            Still have<br />questions
          </h2>
          <p className={styles.body}>
            Our team is ready to help. Give us a call or send us a message.
          </p>
          <div className={styles.actions}>
            <Link className={styles.buttonLight} to="/contact">
              Send a message
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
