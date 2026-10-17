import { useState } from 'react'
import type { FormEvent } from 'react'
import { subscribe } from '~/server/subscribe'
import { useLocale } from '~/i18n/locale'
import styles from './Newsletter.module.css'
import { NEWSLETTER_COPY as COPY } from '~/content/copy'

const EMAIL_RE = /^\S+@\S+\.\S+$/


type Tone = 'on-surface' | 'on-tint'

type Props = {
  /** Visual tone, footer renders on the base background, modal could opt into tinted. */
  tone?: Tone
  /** Override cadence promise. Defaults to monthly per .web-starter.json. */
  cadence?: string
  /** Override the heading. */
  heading?: string
}

/**
 * Newsletter capture, composite component used at every placement (footer, modal).
 *
 * Posts to the Resend Audience via src/server/subscribe.ts. If the env vars
 * aren't set, the server function returns a friendly error and the form
 * displays it inline instead of false success.
 */
export function Newsletter({
  tone = 'on-surface',
  cadence = 'Monthly tips and seasonal reminders. Unsubscribe anytime.',
  heading = 'Stay in the loop',
}: Props) {
  const t = COPY[useLocale()]
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const validate = (value: string): string | null => {
    if (!value.trim()) return t.needEmail
    if (!EMAIL_RE.test(value.trim())) return t.invalidEmail
    return null
  }

  const onBlur = () => {
    const err = validate(email)
    if (err) setError(err)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError(null)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const err = validate(email)
    if (err) {
      setError(err)
      return
    }
    setStatus('submitting')
    try {
      const result = await subscribe({ data: { email: email.trim() } })
      if (result.ok) {
        setStatus('success')
      } else {
        setStatus('idle')
        setError(result.error)
      }
    } catch {
      setStatus('idle')
      setError(t.networkError)
    }
  }

  if (status === 'success') {
    return (
      <div className={`${styles.success} ${styles[tone]}`} role="status">
        <p className={styles.successTitle}>{t.successTitle}</p>
        <p className={styles.successBody}>
          {t.successPrefix} <strong>{email}</strong> {t.successBody}
        </p>
      </div>
    )
  }

  return (
    <form
      className={`${styles.form} ${styles[tone]}`}
      onSubmit={onSubmit}
      noValidate
    >
      <label htmlFor="newsletter-email" className={styles.label}>
        {heading}
      </label>
      <div className={styles.row}>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? 'newsletter-email-error' : 'newsletter-email-help'
          }
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          disabled={status === 'submitting'}
        />
        <button
          type="submit"
          className={styles.submit}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? t.submitting : t.submit}
        </button>
      </div>
      {error ? (
        <p id="newsletter-email-error" className={styles.error} role="alert">
          {error}
        </p>
      ) : (
        <p id="newsletter-email-help" className={styles.help}>
          {cadence}
        </p>
      )}
    </form>
  )
}
