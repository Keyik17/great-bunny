import { useEffect, useRef, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { CaretDown, Check, Globe } from '@phosphor-icons/react'
import { isEsPath, toLocalePath } from '~/i18n/locale'
import styles from './LangDropdown.module.css'

type Tone = 'on-surface' | 'on-dark'
type Align = 'start' | 'end'

type Props = {
  /** Visual tone of the trigger. Popup stays light in both cases. */
  tone?: Tone
  /** Popup alignment relative to the trigger. */
  align?: Align
}

export function LangDropdown({ tone = 'on-surface', align = 'end' }: Props) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const currentLocale: 'en' | 'es' = isEsPath(pathname) ? 'es' : 'en'
  const enHref = toLocalePath(pathname, 'en')
  const esHref = toLocalePath(pathname, 'es')

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const toneClass = tone === 'on-dark' ? styles.toneOnDark : styles.toneOnSurface
  const alignClass = align === 'end' ? styles.dropdownAlignEnd : styles.dropdownAlignStart

  return (
    <div className={styles.wrapper} ref={wrapRef}>
      <button
        type="button"
        ref={triggerRef}
        className={`${styles.trigger} ${toneClass}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Change language"
        onClick={() => setOpen((v) => !v)}
      >
        <Globe size={14} weight="regular" className={styles.globe} aria-hidden="true" />
        <span className={styles.label}>{currentLocale === 'en' ? 'EN' : 'ES'}</span>
        <CaretDown
          size={12}
          weight="bold"
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className={`${styles.dropdown} ${alignClass}`} role="menu">
          <a
            role="menuitem"
            href={enHref}
            className={`${styles.item} ${currentLocale === 'en' ? styles.itemActive : ''}`}
            onClick={() => setOpen(false)}
          >
            <Check size={14} weight="bold" className={styles.check} aria-hidden="true" />
            English
          </a>
          <a
            role="menuitem"
            href={esHref}
            className={`${styles.item} ${currentLocale === 'es' ? styles.itemActive : ''}`}
            onClick={() => setOpen(false)}
          >
            <Check size={14} weight="bold" className={styles.check} aria-hidden="true" />
            Español
          </a>
        </div>
      )}
    </div>
  )
}
