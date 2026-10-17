import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import styles from './SectionHeading.module.css'

type Props = {
  /** Sentence-case eyebrow (only the first letter is capitalized). */
  eyebrow?: ReactNode
  /** Headline. Wrap the last line in <GradientText> for the brand gradient. */
  title: ReactNode
  /** id on the <h2>, so the parent SectionShell can aria-labelledby it. */
  titleId?: string
  body?: ReactNode
  align?: 'start' | 'center'
  className?: string
  /** Heading level. Defaults to h2; use h1 for page headers. */
  as?: 'h1' | 'h2'
}

/**
 * Shared heading frame for every section: eyebrow + h2 + body in one
 * consistent vertical rhythm. Sections control only the gap to their content
 * (via className), so every section header looks and spaces identically.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  body,
  align = 'start',
  className,
  as: Heading = 'h2',
}: Props) {
  return (
    <div
      className={`${styles.frame} ${align === 'center' ? styles.center : ''} ${className ?? ''}`}
    >
      {eyebrow ? (
        <Eyebrow variant="title" className={styles.eyebrow}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading id={titleId} className={styles.title}>
        {title}
      </Heading>
      {body ? <p className={styles.body}>{body}</p> : null}
    </div>
  )
}
