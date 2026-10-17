import type { ReactNode } from 'react'
import styles from './LegalLayout.module.css'

type Props = {
  eyebrow: string
  title: string
  lastUpdated: string
  /** Render a pre-publication DRAFT banner. Omit when policies go live. */
  draftLabel?: string
  children: ReactNode
}

export function LegalLayout({
  eyebrow,
  title,
  lastUpdated,
  draftLabel,
  children,
}: Props) {
  return (
    <main id="main" className={styles.main}>
      {draftLabel ? (
        <div className={styles.draftBanner} role="status">
          <strong>Draft</strong>
          {draftLabel}
        </div>
      ) : null}
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.meta}>Last updated: {lastUpdated}</p>
        <div className={styles.body}>{children}</div>
      </div>
    </main>
  )
}
