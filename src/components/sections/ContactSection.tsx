import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { Clock, Phone, EnvelopeSimple, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { Button } from '~/components/shared/Button'
import { Container } from '~/components/shared/Container'
import { Eyebrow } from '~/components/shared/Eyebrow'
import { GradientText } from '~/components/shared/GradientText'
import { SectionShell } from '~/components/shared/SectionShell'
import { SERVICES } from '~/data/services'
import { submitContact } from '~/server/contact'
import { useLocale } from '~/i18n/locale'
import { trackEvent } from '~/utils/analytics'
import styles from './ContactSection.module.css'
import { CONTACT_VARIANT_COPY as VARIANT_COPY } from '~/content/copy'
import { SITE_CONFIG, TEL_HREF } from '~/config/site'

const PHONE_DISPLAY = SITE_CONFIG.phone.display
const PHONE_HREF = TEL_HREF
const EMAIL = SITE_CONFIG.email

const EMAIL_RE = /^\S+@\S+\.\S+$/

/** Strings shared by both the quote and the general variant. */
const SHARED = {
  en: {
    hoursLabel: 'Hours',
    hoursValue: 'Open 7 days by appointment',
    hoursNote: 'Same-day service available',
    phoneLabel: 'Call or text',
    emailLabel: 'Email',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    submitting: 'Sending…',
    successTitle: 'Got it, thank you.',
  },
  es: {
    hoursLabel: 'Horario',
    hoursValue: 'Abierto los 7 días con cita',
    hoursNote: 'Servicio el mismo día disponible',
    phoneLabel: 'Llama o escribe',
    emailLabel: 'Correo',
    name: 'Nombre',
    phone: 'Teléfono',
    email: 'Correo',
    submitting: 'Enviando…',
    successTitle: 'Listo, gracias.',
  },
}


type Props = {
  /** 'quote' = lead-gen form (free-quote page). 'general' = contact us page. */
  variant?: 'quote' | 'general'
}

export function ContactSection({ variant = 'quote' }: Props) {
  const locale = useLocale()
  const s = SHARED[locale]
  const t = VARIANT_COPY[locale][variant]
  const es = locale === 'es'
  const isQuote = variant === 'quote'

  const titleId = isQuote ? 'quote-title' : 'contact-title'
  const sectionId = isQuote ? 'quote' : 'contact'
  const nudgeTo = isQuote ? '/contact' : '/free-quote'

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [hp, setHp] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const phoneOk = phone.trim().length >= 7
    if (!name.trim() || !EMAIL_RE.test(email) || !phoneOk) {
      setError(t.required)
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
          service: isQuote ? service : '',
          message,
          kind: variant,
          hp,
        },
      })
      if (res.ok) {
        trackEvent('generate_lead', { form: variant === 'quote' ? 'contact_quote' : 'contact' })
        setStatus('success')
      } else {
        setStatus('idle')
        setError(res.error)
      }
    } catch {
      setStatus('idle')
      setError(t.required)
    }
  }

  return (
    <SectionShell id={sectionId} labelledBy={titleId} surface="bg">
      <Container>
        <div className={styles.layout}>
          {/* Left, headline + reach-us details */}
          <div className={styles.info}>
            <Eyebrow variant="title" className={styles.eyebrow}>
              {t.eyebrow}
            </Eyebrow>
            <h1 className={styles.title} id={titleId}>
              {t.titleLead} <GradientText>{t.titleGradient}</GradientText>
            </h1>
            <p className={styles.body}>{t.body}</p>

            <p className={styles.nudge}>
              {t.nudgeText}{' '}
              <Link to={nudgeTo} className={styles.nudgeLink}>
                {t.nudgeLabel}
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </Link>
            </p>

            <ul className={styles.details}>
              <li className={styles.detail}>
                <span className={styles.detailIcon} aria-hidden="true">
                  <Clock size={22} weight="regular" />
                </span>
                <span className={styles.detailText}>
                  <span className={styles.detailLabel}>{s.hoursLabel}</span>
                  <span className={styles.detailValue}>{s.hoursValue}</span>
                  <span className={styles.detailNote}>{s.hoursNote}</span>
                </span>
              </li>
              <li className={styles.detail}>
                <span className={styles.detailIcon} aria-hidden="true">
                  <Phone size={22} weight="regular" />
                </span>
                <span className={styles.detailText}>
                  <span className={styles.detailLabel}>{s.phoneLabel}</span>
                  <a className={styles.detailLink} href={PHONE_HREF}>
                    {PHONE_DISPLAY}
                  </a>
                </span>
              </li>
              <li className={styles.detail}>
                <span className={styles.detailIcon} aria-hidden="true">
                  <EnvelopeSimple size={22} weight="regular" />
                </span>
                <span className={styles.detailText}>
                  <span className={styles.detailLabel}>{s.emailLabel}</span>
                  <a className={styles.detailLink} href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Right, form */}
          <div className={styles.formCard}>
            {status === 'success' ? (
              <div className={styles.success} role="status">
                <p className={styles.successTitle}>{s.successTitle}</p>
                <p className={styles.successBody}>{t.successBody}</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                {/* Honeypot, hidden from people, irresistible to bots. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                  }}
                />
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="cf-name">
                    {s.name}
                    <span className={styles.req} aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="cf-name"
                    className={styles.input}
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {isQuote ? (
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="cf-phone">
                        {s.phone}
                        <span className={styles.req} aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="cf-phone"
                        className={styles.input}
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="cf-email">
                        {s.email}
                        <span className={styles.req} aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="cf-email"
                        className={styles.input}
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="cf-phone">
                        {s.phone}
                        <span className={styles.req} aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="cf-phone"
                        className={styles.input}
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="cf-email">
                        {s.email}
                        <span className={styles.req} aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="cf-email"
                        className={styles.input}
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                {isQuote ? (
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="cf-service">
                      {t.service}
                    </label>
                    <select
                      id="cf-service"
                      className={styles.select}
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option value="">{t.servicePlaceholder}</option>
                      {SERVICES.map((sv) => {
                        const label = es ? sv.nameEs : sv.name
                        return (
                          <option key={sv.slug} value={label}>
                            {label}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                ) : null}

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="cf-message">
                    {t.message}
                  </label>
                  <textarea
                    id="cf-message"
                    className={styles.textarea}
                    rows={isQuote ? 4 : 6}
                    placeholder={t.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {error ? (
                  <p className={styles.error} role="alert">
                    {error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className={styles.submit}
                  loading={status === 'submitting'}
                >
                  {status === 'submitting' ? s.submitting : t.submit}
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </SectionShell>
  )
}
