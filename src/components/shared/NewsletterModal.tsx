import { X } from '@phosphor-icons/react'
import { useEffect, useId, useRef, useState } from 'react'
import { subscribe } from '~/server/subscribe'
import { GradientText } from '~/components/shared/GradientText'
import { useLocale } from '~/i18n/locale'
import styles from './NewsletterModal.module.css'
import { NEWSLETTER_MODAL_COPY as COPY } from '~/content/copy'


type Status = 'idle' | 'loading' | 'success' | 'error'

type Props = {
  open: boolean
  onClose: () => void
  /** Optional image on the left panel. Falls back to a brand gradient. */
  image?: string
}

/**
 * Newsletter / first-order-discount capture modal. Image (or brand gradient)
 * on the left, copy + email form on the right. Submits to the existing Resend
 * `subscribe` server fn. Self-contained (no Radix), handles Escape, backdrop
 * click, focus-on-open, and body scroll lock.
 */
export function NewsletterModal({ open, onClose, image }: Props) {
  const t = COPY[useLocale()]
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const titleId = useId()
  const descId = useId()

  // Focus the input on open; lock the page behind the modal.
  // The page scrolls on <html> (and iOS Safari ignores overflow:hidden), so we
  // pin <body> with position:fixed at the current offset, then restore the exact
  // scroll position on close. This stops all background scroll cross-platform.
  useEffect(() => {
    if (!open) return
    const { body } = document
    const scrollY = window.scrollY
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    const t = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.left = prev.left
      body.style.right = prev.right
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      // Jump back instantly (the page has scroll-behavior:smooth otherwise).
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' as ScrollBehavior })
      window.clearTimeout(t)
    }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    try {
      const res = await subscribe({ data: { email } })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={t.close}
        >
          <X size={18} weight="bold" aria-hidden="true" />
        </button>

        <div
          className={styles.media}
          aria-hidden="true"
          style={image ? { backgroundImage: `url(${image})` } : undefined}
        />

        <div className={styles.body}>
          {status === 'success' ? (
            <div className={styles.successState}>
              <h2 id={titleId} className={styles.title}>
                {t.successLead} <GradientText>{t.successWord}</GradientText>
              </h2>
              <p id={descId} className={styles.copy}>
                {t.successCopy}
              </p>
              <button type="button" className={styles.doneBtn} onClick={onClose}>
                {t.done}
              </button>
            </div>
          ) : (
            <>
              <h2 id={titleId} className={styles.title}>
                {t.titleLead} <GradientText>{t.titleWord}</GradientText>
              </h2>
              <p id={descId} className={styles.copy}>
                {t.copy}
              </p>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <input
                  ref={inputRef}
                  type="email"
                  required
                  className={styles.input}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  aria-label={t.emailLabel}
                  aria-invalid={status === 'error'}
                />
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? t.joining : t.submit}
                </button>
              </form>

              {status === 'error' ? (
                <p className={styles.errorMsg} role="alert">
                  {t.error}
                </p>
              ) : (
                <p className={styles.fineprint}>{t.fineprint}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
