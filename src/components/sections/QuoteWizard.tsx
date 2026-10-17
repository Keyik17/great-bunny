import { useEffect, useRef, useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Buildings, CaretDown, Check, House, ImageSquare, PaperPlaneTilt, Tag, X } from '@phosphor-icons/react'
import { Button } from '~/components/shared/Button'
import { submitContact } from '~/server/contact'
import { useLocale } from '~/i18n/locale'
import { trackEvent } from '~/utils/analytics'
import styles from './QuoteWizard.module.css'
import { BUSINESS_NAME, SITE_CONFIG } from '~/config/site'
import {
  MAX_QUOTE_PHOTOS,
  QUOTE_SERVICE_TILES,
  QUOTE_WIZARD_COPY,
} from '~/content/copy'

/*
 * App-style quote flow: a full-screen, one-question-per-screen experience.
 * Five steps (services, timing, photos, details, review), bilingual, and wired
 * to the Resend lead-notification on submit. On success it routes to /quotesent.
 */

const MAX_PHOTOS = MAX_QUOTE_PHOTOS
const MAX_DIMENSION = 1280
const JPEG_QUALITY = 0.72
const EMAIL_RE = /^\S+@\S+\.\S+$/

// Motion-wrapped versions so taps animate on the shared Button and Link too.
const MotionButton = motion.create(Button)
const MotionLink = motion.create(Link)

/* Smooth tap, a subtle press-in scale on the brand expo curve. */
const TAP = { scale: 0.97 }
const TAP_TRANSITION = { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const }

const SERVICE_TILES = QUOTE_SERVICE_TILES

const URGENCY = ['asap', 'week', 'flexible'] as const
type Urgency = (typeof URGENCY)[number]

const SCREENS = ['services', 'timing', 'photos', 'details', 'review'] as const
type Screen = (typeof SCREENS)[number]

type Photo = { id: string; data: string; preview: string; filename: string }

const T = QUOTE_WIZARD_COPY

/* Stable animation props, module scope so framer-motion does not re-run its
   pipeline on every keystroke (controlled inputs re-render a lot). */
const SCREEN_VARIANTS = {
  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 28 : -28 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -28 : 28 }),
}
const SCREEN_VARIANTS_REDUCED = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}
const SCREEN_TRANSITION = { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const }
const SCREEN_TRANSITION_REDUCED = { duration: 0.15, ease: [0.16, 1, 0.3, 1] as const }

async function shrinkImage(file: File): Promise<{ data: string; preview: string } | null> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image()
    el.onload = () => resolve(el)
    el.onerror = reject
    el.src = dataUrl
  })
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height))
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  ctx.drawImage(img, 0, 0, w, h)
  const out = canvas.toDataURL('image/jpeg', JPEG_QUALITY)
  return { preview: out, data: out.split(',')[1] ?? '' }
}

export function QuoteWizard() {
  const reduceMotion = useReducedMotion()
  const router = useRouter()
  const locale = useLocale()
  const es = locale === 'es'
  const t = T[locale]

  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle')
  const [error, setError] = useState<string | null>(null)
  // Which detail inputs failed validation, so we can highlight them in place.
  const [invalid, setInvalid] = useState<string[]>([])

  const fileRef = useRef<HTMLInputElement>(null)
  const photoSeq = useRef(0)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [propertyType, setPropertyType] = useState<'home' | 'business' | ''>('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [urgency, setUrgency] = useState<Urgency | ''>('')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [notes, setNotes] = useState('')
  const [promo, setPromo] = useState('')
  const [promoOpen, setPromoOpen] = useState(false)
  // 10DLC marketing consent. BOTH opt-ins start unchecked: pre-checked
  // marketing consent fails carrier vetting. Checking the box is the user's
  // explicit action, and both states are recorded with the lead.
  const [emailOptIn, setEmailOptIn] = useState(false)
  const [smsOptIn, setSmsOptIn] = useState(false)
  const [hp, setHp] = useState('') // honeypot, stays empty for real people

  // Pre-fill the promo / referral code from the URL (e.g. the welcome email
  // links to /free-quote?code=FRESH2026), and reveal the field so it carries over.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code') || params.get('ref')
    if (code) {
      setPromo(code)
      setPromoOpen(true)
    }
  }, [])

  const screen = SCREENS[index]
  const total = SCREENS.length
  const sc = t.sc[screen]

  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim()
  const serviceLabel = (key: string) => {
    const tile = SERVICE_TILES.find((s) => s.key === key)
    return tile ? tile[locale] : key
  }
  const selectedServiceLabels = services.map(serviceLabel)

  function goTo(nextIndex: number, direction: number) {
    // Clear any stale validation state when changing screens. Intentional
    // error-sets in send() run after their jumpTo() in the same handler, so the
    // later setState wins, these clears do not stomp them.
    setError(null)
    setInvalid([])
    setDir(direction)
    setIndex(Math.max(0, Math.min(total - 1, nextIndex)))
  }
  const back = () => goTo(index - 1, -1)
  function jumpTo(target: Screen) {
    const ti = SCREENS.indexOf(target)
    goTo(ti, ti > index ? 1 : -1)
  }

  function toggleService(key: string) {
    setServices((prev) => (prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]))
    setError((prev) => (prev ? null : prev))
  }

  async function onFiles(list: FileList | null) {
    if (!list?.length) return
    const room = MAX_PHOTOS - photos.length
    const picked = Array.from(list).slice(0, room)
    const shrunk = await Promise.all(picked.map((f) => shrinkImage(f)))
    const added: Photo[] = shrunk
      .filter((r): r is { data: string; preview: string } => !!r && !!r.data)
      .map((r) => {
        photoSeq.current += 1
        return {
          id: `p${photoSeq.current}`,
          data: r.data,
          preview: r.preview,
          filename: `photo-${photoSeq.current}.jpg`,
        }
      })
    setPhotos((prev) => [...prev, ...added])
    if (fileRef.current) fileRef.current.value = ''
  }

  function removePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  // Which required detail fields are missing/invalid (for inline highlighting).
  function detailsInvalid(): string[] {
    const bad: string[] = []
    if (firstName.trim().length === 0) bad.push('firstName')
    if (phone.trim().length < 7) bad.push('phone')
    if (!EMAIL_RE.test(email.trim())) bad.push('email')
    if (!propertyType) bad.push('propertyType')
    return bad
  }

  // The right message for the details step: if home/business is the only thing
  // missing, say so specifically; otherwise the generic contact prompt.
  function detailsError(bad: string[]): string {
    return bad.length === 1 && bad[0] === 'propertyType' ? t.errPropertyType : t.errContact
  }

  // Editing a field clears its highlight and any visible error.
  function clearFieldError(field: string) {
    setInvalid((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : prev))
    setError((prev) => (prev ? null : prev))
  }

  // Gate the current screen before advancing. Returns true when it may proceed.
  function validateCurrent(): boolean {
    if (screen === 'details') {
      const bad = detailsInvalid()
      if (bad.length) {
        setInvalid(bad)
        setError(detailsError(bad))
        return false
      }
    }
    if (screen === 'services' && services.length === 0) {
      setError(t.errServices)
      return false
    }
    if (screen === 'timing' && !urgency) {
      setError(t.errTiming)
      return false
    }
    return true
  }

  async function send() {
    // Final guard: re-validate every required step, since review is reachable by
    // jumping back. Checked in screen order so the user lands on the earliest
    // incomplete step, not a later one.
    if (services.length === 0) {
      jumpTo('services')
      setError(t.errServices)
      return
    }
    if (!urgency) {
      jumpTo('timing')
      setError(t.errTiming)
      return
    }
    const bad = detailsInvalid()
    if (bad.length) {
      jumpTo('details')
      setInvalid(bad)
      setError(detailsError(bad))
      return
    }
    setError(null)
    setStatus('submitting')
    try {
      const res = await submitContact({
        data: {
          name: fullName,
          phone,
          email,
          propertyType: propertyType === 'business' ? 'Business' : 'Home',
          services: selectedServiceLabels,
          urgency: urgency ? t.urgency[urgency].label : '',
          message: notes,
          promo: promo.trim(),
          photos: photos.map((p) => ({ filename: p.filename, data: p.data })),
          emailOptIn,
          smsOptIn,
          kind: 'quote',
          hp,
        },
      })
      if (res.ok) {
        trackEvent('generate_lead', {
          form: 'quote',
          service_count: selectedServiceLabels.length,
          urgency: urgency ?? '',
        })
        router.navigate({ to: '/quotesent' })
      } else {
        setStatus('idle')
        setError(res.error)
      }
    } catch {
      setStatus('idle')
      setError(t.errGeneric)
    }
  }

  const next = () => {
    if (index === total - 1) {
      void send()
      return
    }
    if (!validateCurrent()) return
    goTo(index + 1, 1)
  }

  const variants = reduceMotion ? SCREEN_VARIANTS_REDUCED : SCREEN_VARIANTS
  const transition = reduceMotion ? SCREEN_TRANSITION_REDUCED : SCREEN_TRANSITION
  const privacyTo = '/legal/privacy-policy'

  return (
    <div className={styles.app}>
      {/* Honeypot, off-screen, ignored by people, filled by bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      {/* Top bar, return home (left), logo (center), progress (right) */}
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <MotionLink
            to={'/'}
            className={styles.returnHome}
            aria-label={t.returnHome}
            whileTap={TAP}
            transition={TAP_TRANSITION}
          >
            <ArrowLeft size={16} weight="bold" />
            <span className={styles.returnHomeLabel}>{t.returnHome}</span>
          </MotionLink>

          <Link to={'/'} className={styles.logo} aria-label={BUSINESS_NAME}>
            <img
              src="/brand/logo-bunny-icon-square-512.png"
              alt=""
              aria-hidden="true"
              className={styles.logoMark}
              width={28}
              height={28}
            />
            <span className={styles.logoText}>Great Bunny</span>
          </Link>

          <div
            className={styles.progress}
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={index + 1}
          >
            {SCREENS.map((s, i) => (
              <span
                key={s}
                className={styles.segment}
                data-state={i < index ? 'done' : i === index ? 'active' : 'todo'}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Stage, the current question */}
      <div className={styles.scroll}>
        <div className={styles.stage}>
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={screen}
              className={styles.screen}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <p className={styles.eyebrow}>{sc.eyebrow}</p>
              <h1 className={styles.title}>{sc.title}</h1>
              <p className={styles.sub}>{sc.sub}</p>

              <div className={styles.field}>
                {screen === 'details' && (
                  <div className={styles.detailsGrid}>
                    <div className={styles.row2}>
                      <label className={styles.labeled}>
                        <span className={styles.fieldLabel}>{t.firstName}</span>
                        <input
                          className={styles.input}
                          type="text"
                          autoComplete="given-name"
                          placeholder={t.firstName}
                          value={firstName}
                          data-invalid={invalid.includes('firstName')}
                          onChange={(e) => {
                            setFirstName(e.target.value)
                            clearFieldError('firstName')
                          }}
                          autoFocus
                        />
                      </label>
                      <label className={styles.labeled}>
                        <span className={styles.fieldLabel}>{t.lastName}</span>
                        <input
                          className={styles.input}
                          type="text"
                          autoComplete="family-name"
                          placeholder={t.lastName}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </label>
                    </div>
                    <label className={styles.labeled}>
                      <span className={styles.fieldLabel}>{t.phone}</span>
                      <input
                        className={styles.input}
                        type="tel"
                        autoComplete="tel"
                        placeholder={SITE_CONFIG.phone.display}
                        value={phone}
                        data-invalid={invalid.includes('phone')}
                        onChange={(e) => {
                          setPhone(e.target.value)
                          clearFieldError('phone')
                        }}
                      />
                    </label>
                    <label className={styles.labeled}>
                      <span className={styles.fieldLabel}>{t.email}</span>
                      <input
                        className={styles.input}
                        type="email"
                        autoComplete="email"
                        placeholder={t.emailPh}
                        value={email}
                        data-invalid={invalid.includes('email')}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          clearFieldError('email')
                        }}
                      />
                    </label>

                    <div className={styles.labeled}>
                      <span className={styles.fieldLabel}>{t.propertyTypeLabel}</span>
                      <div
                        className={styles.propToggle}
                        role="group"
                        aria-label={t.propertyTypeLabel}
                        data-invalid={invalid.includes('propertyType')}
                      >
                        {(['home', 'business'] as const).map((value) => {
                          const on = propertyType === value
                          const Icon = value === 'home' ? House : Buildings
                          return (
                            <motion.button
                              key={value}
                              type="button"
                              className={styles.propOption}
                              data-selected={on}
                              aria-pressed={on}
                              onClick={() => {
                                setPropertyType(value)
                                clearFieldError('propertyType')
                              }}
                              whileTap={TAP}
                              transition={TAP_TRANSITION}
                            >
                              <Icon size={20} weight={on ? 'fill' : 'regular'} />
                              <span>{value === 'home' ? t.home : t.business}</span>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    {/* 10DLC consent, inline in the form so it scrolls with
                        the fields rather than living in the sticky footer. */}
                    <div className={styles.consent}>
                      <label className={styles.consentCheck}>
                        <input
                          type="checkbox"
                          className={styles.consentCheckbox}
                          checked={emailOptIn}
                          onChange={(e) => setEmailOptIn(e.target.checked)}
                        />
                        <span className={styles.consentText}>{t.consent.email}</span>
                      </label>
                      <label className={styles.consentCheck}>
                        <input
                          type="checkbox"
                          className={styles.consentCheckbox}
                          checked={smsOptIn}
                          onChange={(e) => setSmsOptIn(e.target.checked)}
                        />
                        <span className={styles.consentText}>{t.consent.sms}</span>
                      </label>
                      <Link to={privacyTo} className={styles.consentLink} target="_blank">
                        {t.consent.privacy}
                      </Link>
                    </div>
                  </div>
                )}

                {screen === 'services' && (
                  <ul className={styles.tiles}>
                    {SERVICE_TILES.map((tile) => {
                      const on = services.includes(tile.key)
                      return (
                        <li key={tile.key}>
                          <motion.button
                            type="button"
                            className={styles.tile}
                            data-selected={on}
                            onClick={() => toggleService(tile.key)}
                            aria-pressed={on}
                            whileTap={TAP}
                            transition={TAP_TRANSITION}
                          >
                            <img className={styles.tileImg} src={tile.image} alt="" loading="lazy" />
                            <span className={styles.tileScrim} aria-hidden="true" />
                            <span className={styles.tileCheck} data-on={on} aria-hidden="true">
                              {on && <Check size={14} weight="bold" />}
                            </span>
                            <span className={styles.tileLabel}>{tile[locale]}</span>
                          </motion.button>
                        </li>
                      )
                    })}
                  </ul>
                )}

                {screen === 'timing' && (
                  <>
                    <ul className={styles.options}>
                      {URGENCY.map((value) => {
                        const on = urgency === value
                        const opt = t.urgency[value]
                        return (
                          <li key={value}>
                            <motion.button
                              type="button"
                              className={styles.option}
                              data-selected={on}
                              onClick={() => {
                                setUrgency(value)
                                setError((prev) => (prev ? null : prev))
                              }}
                              aria-pressed={on}
                              whileTap={TAP}
                              transition={TAP_TRANSITION}
                            >
                              <span className={styles.optionText}>
                                <span className={styles.optionLabel}>{opt.label}</span>
                                <span className={styles.optionHint}>{opt.hint}</span>
                              </span>
                              <span className={styles.indicator} data-shape="dot">
                                {on && <span className={styles.dot} />}
                              </span>
                            </motion.button>
                          </li>
                        )
                      })}
                    </ul>
                    <label className={styles.notesBlock}>
                      <span className={styles.fieldLabel}>{t.notesLabel}</span>
                      <textarea
                        className={styles.textarea}
                        rows={4}
                        placeholder={t.notesPh}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </label>
                  </>
                )}

                {screen === 'photos' && (
                  <div className={styles.photoBlock}>
                    <motion.button
                      type="button"
                      className={styles.dropzone}
                      onClick={() => fileRef.current?.click()}
                      whileTap={TAP}
                      transition={TAP_TRANSITION}
                    >
                      <span className={styles.dropIcon} aria-hidden="true">
                        <ImageSquare size={26} weight="regular" />
                      </span>
                      <span className={styles.dropTitle}>{t.addPhotos}</span>
                      <span className={styles.dropHint}>{t.photoHint}</span>
                    </motion.button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={(e) => onFiles(e.target.files)}
                    />
                    {photos.length > 0 && (
                      <ul className={styles.thumbs}>
                        {photos.map((p) => (
                          <li key={p.id} className={styles.thumb}>
                            <img src={p.preview} alt="" />
                            <motion.button
                              type="button"
                              className={styles.thumbRemove}
                              onClick={() => removePhoto(p.id)}
                              aria-label="Remove photo"
                              whileTap={TAP}
                              transition={TAP_TRANSITION}
                            >
                              <X size={13} weight="bold" />
                            </motion.button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {photos.length > 0 && <p className={styles.photoCount}>{t.photoCount(photos.length)}</p>}
                  </div>
                )}

                {screen === 'review' && (
                  <>
                  <dl className={styles.review}>
                    <ReviewRow label={t.rev.name} value={fullName} empty={t.rev.notAdded} edit={t.rev.edit} onEdit={() => jumpTo('details')} />
                    <ReviewRow label={t.rev.phone} value={phone} empty={t.rev.notAdded} edit={t.rev.edit} onEdit={() => jumpTo('details')} />
                    <ReviewRow label={t.rev.email} value={email} empty={t.rev.notAdded} edit={t.rev.edit} onEdit={() => jumpTo('details')} />
                    <ReviewRow
                      label={t.rev.propertyType}
                      value={propertyType === 'home' ? t.home : propertyType === 'business' ? t.business : ''}
                      empty={t.rev.notAdded}
                      edit={t.rev.edit}
                      onEdit={() => jumpTo('details')}
                    />
                    <ReviewRow
                      label={t.rev.services}
                      value={selectedServiceLabels.join(', ')}
                      empty={t.rev.notAdded}
                      edit={t.rev.edit}
                      onEdit={() => jumpTo('services')}
                    />
                    <ReviewRow
                      label={t.rev.howSoon}
                      value={urgency ? t.urgency[urgency].label : ''}
                      empty={t.rev.notAdded}
                      edit={t.rev.edit}
                      onEdit={() => jumpTo('timing')}
                    />
                    <ReviewRow
                      label={t.rev.photos}
                      value={photos.length ? t.rev.photosN(photos.length) : ''}
                      empty={t.rev.notAdded}
                      edit={t.rev.edit}
                      onEdit={() => jumpTo('photos')}
                    />
                    <ReviewRow label={t.rev.details} value={notes} empty={t.rev.notAdded} edit={t.rev.edit} onEdit={() => jumpTo('timing')} />
                  </dl>
                  <div className={styles.promo}>
                    <motion.button
                      type="button"
                      className={styles.promoToggle}
                      data-open={promoOpen}
                      aria-expanded={promoOpen}
                      onClick={() => setPromoOpen((v) => !v)}
                      whileTap={TAP}
                      transition={TAP_TRANSITION}
                    >
                      <Tag size={16} weight="regular" />
                      <span>{t.promoToggle}</span>
                      <CaretDown size={14} weight="bold" className={styles.promoCaret} />
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {promoOpen && (
                        <motion.div
                          key="promo-field"
                          className={styles.promoReveal}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className={styles.promoFieldInner}>
                            <input
                              className={styles.input}
                              type="text"
                              aria-label={t.promoLabel}
                              placeholder={t.promoPh}
                              value={promo}
                              onChange={(e) => setPromo(e.target.value)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer, nav only; consent lives inline in the details form. */}
      <footer className={styles.footer}>
        <div className={styles.nav}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.navRow}>
            {index > 0 && (
              <motion.button
                type="button"
                className={styles.backBtn}
                onClick={back}
                whileTap={TAP}
                transition={TAP_TRANSITION}
              >
                {t.back}
              </motion.button>
            )}
            <MotionButton
              variant="primary"
              size="md"
              onClick={next}
              className={styles.nextBtn}
              loading={status === 'submitting'}
              whileTap={TAP}
              transition={TAP_TRANSITION}
            >
              {screen === 'review' ? (
                status === 'submitting' ? (
                  t.sending
                ) : (
                  <>
                    <PaperPlaneTilt size={17} weight="fill" />
                    {t.send}
                  </>
                )
              ) : screen === 'photos' && photos.length === 0 ? (
                t.skip
              ) : (
                t.next
              )}
            </MotionButton>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ReviewRow({
  label,
  value,
  empty,
  edit,
  onEdit,
}: {
  label: string
  value: string
  empty: string
  edit: string
  onEdit: () => void
}) {
  return (
    <motion.button
      type="button"
      className={styles.reviewRow}
      onClick={onEdit}
      whileTap={TAP}
      transition={TAP_TRANSITION}
    >
      <dt className={styles.reviewLabel}>{label}</dt>
      <dd className={styles.reviewValue} data-empty={!value}>
        {value || empty}
      </dd>
      <span className={styles.reviewEdit}>{edit}</span>
    </motion.button>
  )
}
