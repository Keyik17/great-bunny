import type { HTMLAttributes, ReactNode } from 'react'
import styles from './SectionShell.module.css'

type Surface = 'bg' | 'tint' | 'white'

type Props = {
  id: string
  /** Used for aria-labelledby. Set to the heading's id. */
  labelledBy?: string
  /** Section background. 'bg' = primary canvas, 'tint' = subtle cool tint, 'white' = pure surface. */
  surface?: Surface
  /** Remove the vertical padding (rare, for hero, which sets its own). */
  flush?: boolean
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Section landmark. Every page section uses this so we get consistent
 * vertical rhythm + alternating surface tinting + a real <section> with
 * an id for skip-links and table-of-contents future-proofing.
 */
export function SectionShell({
  id,
  labelledBy,
  surface = 'bg',
  flush = false,
  children,
  className,
  ...rest
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${styles.section} ${styles[surface]} ${flush ? styles.flush : ''} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </section>
  )
}
