import type { CSSProperties, ReactNode } from 'react'
import styles from './Eyebrow.module.css'

type Props = {
  children: ReactNode
  /** 'caps' = ALL CAPS. 'sentence' = as-typed (first letter only). 'title' = Title Case every word. */
  variant?: 'caps' | 'sentence' | 'title'
  className?: string
  id?: string
  /** Inline overrides (e.g. color on a dark hero), applied at first paint, no FOUC. */
  style?: CSSProperties
}

const VARIANT_CLASS = {
  caps: styles.caps,
  sentence: styles.sentence,
  title: styles.title,
} as const

/**
 * House eyebrow. Plain text doing the work, no chip, no rule, no indicator
 * dot, no positive letter-spacing. The most common generic-template tell
 * is "designed" eyebrows above every section; we ship the opposite.
 */
export function Eyebrow({ children, variant = 'caps', className, id, style }: Props) {
  return (
    <p
      id={id}
      style={style}
      className={`${styles.eyebrow} ${VARIANT_CLASS[variant]} ${className ?? ''}`}
    >
      {children}
    </p>
  )
}
