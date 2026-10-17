import type { ReactNode } from 'react'
import styles from './GradientText.module.css'

/**
 * Optional brand-gradient text. Wrap the final line of a headline in this to
 * give it a clipped display gradient. Decorative only, large display headings,
 * never body/UI text.
 *
 * OFF BY DEFAULT. The clipped-gradient last-line look is a strong design
 * fingerprint, not something every site should wear. When disabled (the
 * default), this renders its children as plain text inheriting the heading
 * color, so every existing `<GradientText>` call site keeps working with no
 * visual effect. Flip ENABLE_GRADIENT_TEXT to true per client to turn it on.
 */
export const ENABLE_GRADIENT_TEXT = false

export function GradientText({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const cls = ENABLE_GRADIENT_TEXT
    ? `${styles.text} ${className ?? ''}`.trim()
    : (className ?? undefined)
  return <span className={cls}>{children}</span>
}
