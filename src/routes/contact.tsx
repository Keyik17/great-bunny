import { useState } from 'react'
import type { FormEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Alarm, EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react'
import { JsonLd } from '~/components/shared/JsonLd'
import { LandingReveal } from '~/components/sections/LandingReveal'
import { SERVICES } from '~/data/services'
import { submitContact } from '~/server/contact'
import { BUSINESS_NAME, SITE, SITE_CONFIG, TEL_HREF } from '~/config/site'
import { trackEvent } from '~/utils/analytics'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

const URL = `${SITE}/contact`
const TITLE = `Contact ${BUSINESS_NAME}`
const DESCRIPTION =
  'Contact Great Bunny LLC for Denver metro drain cleaning, sewer cleaning, residential drain service, commercial drain service, and same-day scheduling.'
const EMAIL_RE = /^\S+@\S+\.\S+$/

const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${URL}#contactpage`,
  url: URL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: 'en-US',
  about: {
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#org`,
    name: BUSINESS_NAME,
    telephone: SITE_CONFIG.phone.schema,
    email: SITE_CONFIG.email,
    areaServed: ['Denver', 'Lakewood', 'Arvada', 'Boulder'],
  },
}

const infoRows = [
  { icon: Phone, label: 'Phone', value: SITE_CONFIG.phone.display, href: TEL_HREF },
  { icon: EnvelopeSimple, label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: MapPin, label: 'Service Area', value: 'Denver, Lakewood, Arvada, Boulder' },
  { icon: Alarm, label: 'Hours', value: 'Mon-Fri 8am-7pm\nSat-Sun 8am-6pm' },
]

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      ...seo({ title: TITLE, description: DESCRIPTION }),
      { property: 'og:url', content: URL },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: Contact,
})

function Contact() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [hp, setHp] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const name = `${firstName.trim()} ${lastName.trim()}`.trim()
    if (!name || !EMAIL_RE.test(email) || phone.trim().length < 7) {
      setError('Please enter your name, email, and phone number.')
      return
    }

    setError(null)
    setStatus('submitting')
    try {
      const res = await submitContact({
        data: {
          name,
          phone,
          email,
          service,
          message,
          kind: 'general',
          hp,
        },
      })
      if (res.ok) {
        trackEvent('generate_lead', { form: 'contact' })
        setStatus('success')
      } else {
        setStatus('idle')
        setError(res.error)
      }
    } catch {
      setStatus('idle')
      setError('Please try again or call us directly.')
    }
  }

  return (
    <main id="main" className={styles.page}>
      <JsonLd data={contactPageJsonLd} />
      <section className={styles.section} aria-labelledby="contact-title">
        <div className={`${styles.container} ${styles.split}`}>
          <LandingReveal className={styles.stack}>
            <p className={styles.script}>Get in touch</p>
            <h1 id="contact-title" className={styles.title}>
              Let's solve your<br />drain problems
            </h1>
            <div className={styles.smallStack}>
              {infoRows.map((row) => {
                const Icon = row.icon
                const value = row.href ? (
                  <a className={styles.textLink} href={row.href}>
                    {row.value}
                  </a>
                ) : (
                  <span>{row.value}</span>
                )
                return (
                  <div className={styles.lineCard} key={row.label}>
                    <div className={styles.actions}>
                      <span className={styles.iconCircle} aria-hidden="true">
                        <Icon size={20} weight="regular" />
                      </span>
                      <span className={styles.smallStack}>
                        <span className={styles.statLabel}>{row.label}</span>
                        <span className={styles.body}>{value}</span>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </LandingReveal>

          <LandingReveal className={styles.card}>
            {status === 'success' ? (
              <div className={styles.success} role="status">
                <h2 className={styles.h3}>Got it, thank you</h2>
                <p className={styles.body}>
                  We received your message and will follow up as soon as possible.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <div className={styles.smallStack}>
                  <h2 className={styles.h3}>Send us a message</h2>
                  <p className={styles.muted}>
                    Fill out the form and we'll get back to you as soon as possible.
                  </p>
                </div>
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={hp}
                  onChange={(event) => setHp(event.target.value)}
                  hidden
                />
                <div className={styles.formRow}>
                  <label className={styles.field}>
                    <span className={styles.label}>First Name</span>
                    <input
                      className={styles.input}
                      type="text"
                      autoComplete="given-name"
                      placeholder="John"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Last Name</span>
                    <input
                      className={styles.input}
                      type="text"
                      autoComplete="family-name"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </label>
                </div>
                <label className={styles.field}>
                  <span className={styles.label}>Email Address</span>
                  <input
                    className={styles.input}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Phone Number</span>
                  <input
                    className={styles.input}
                    type="tel"
                    autoComplete="tel"
                    placeholder="(720) 555-0000"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Service Needed</span>
                  <select
                    className={styles.select}
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((item) => (
                      <option key={item.slug} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Message</span>
                  <textarea
                    className={styles.textarea}
                    placeholder="Tell us about your drain issue..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </label>
                {error ? <p className={styles.error} role="alert">{error}</p> : null}
                <button className={styles.button} type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </LandingReveal>
        </div>
      </section>
    </main>
  )
}
