import { Children, isValidElement, type ReactNode } from 'react'
import styles from './Marquee.module.css'

type Props = {
  children: ReactNode
  /** Pixels per second. Default 40 (slow editorial pace). */
  speed?: number
  /** Direction. Default 'left'. */
  direction?: 'left' | 'right'
  /** Pause animation on hover. Default true. */
  pauseOnHover?: boolean
  className?: string
}

/**
 * Edge-masked marquee. Two identical content groups loop seamlessly via
 * CSS keyframes (translateX -50%). Respects prefers-reduced-motion by
 * pausing entirely. No external lib, no rAF, CSS is plenty for a
 * constant-velocity ticker and avoids the jank window of JS animation.
 */
export function Marquee({
  children,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className,
}: Props) {
  const items = Children.toArray(children).filter((c) =>
    isValidElement(c) || typeof c === 'string' || typeof c === 'number',
  )

  // Duration derived from speed, longer track = slower at same pixel/sec.
  // Track width is unknown at SSR, so we fall back to a sensible default
  // and let the user nudge with `speed`.
  const durationSec = Math.max(8, Math.round(items.length * (260 / speed)))

  return (
    <div
      className={`${styles.viewport} ${pauseOnHover ? styles.pauseOnHover : ''} ${className ?? ''}`}
      aria-roledescription="marquee"
    >
      <div
        className={`${styles.track} ${direction === 'right' ? styles.right : styles.left}`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {items.map((child, i) => (
          <span className={styles.item} key={`a-${i}`}>
            {child}
          </span>
        ))}
        {items.map((child, i) => (
          <span className={styles.item} key={`b-${i}`} aria-hidden="true">
            {child}
          </span>
        ))}
      </div>
    </div>
  )
}
