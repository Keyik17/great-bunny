import {
  CurrencyDollar,
  Heart,
  Lightning,
  MapPin,
  ShieldCheck,
  Star,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { LANDING_COPY } from '~/content/copy'
import { LandingReveal } from './LandingReveal'
import styles from './LandingWhyUs.module.css'

const ICONS: Icon[] = [
  Heart,
  Lightning,
  CurrencyDollar,
  Star,
  ShieldCheck,
  MapPin,
]

export function LandingWhyUs() {
  const copy = LANDING_COPY.why

  return (
    <section className={styles.section} aria-labelledby="why-heading">
      <LandingReveal className={styles.imageSide}>
        <img src={copy.image} alt={copy.alt} className={`${styles.image} face-image`} />
      </LandingReveal>
      <LandingReveal className={styles.content}>
        <h2 id="why-heading" className={styles.title}>
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </h2>
        <div className={styles.list}>
          {copy.items.map((item, index) => {
            const Icon = ICONS[index]
            return (
              <article key={item.title} className={styles.row}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon size={22} weight="fill" />
                </span>
                <span className={styles.textBlock}>
                  <span className={styles.rowTitle}>{item.title}</span>
                  <span className={styles.rowDescription}>{item.description}</span>
                </span>
              </article>
            )
          })}
        </div>
        <Link to="/about" className={styles.cta}>
          {copy.cta}
          <span aria-hidden="true">→</span>
        </Link>
      </LandingReveal>
    </section>
  )
}
