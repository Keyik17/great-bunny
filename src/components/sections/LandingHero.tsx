import { Link } from '@tanstack/react-router'
import { LANDING_COPY } from '~/content/copy'
import { SITE_CONFIG, TEL_HREF } from '~/config/site'
import { noWidow } from '~/utils/noWidow'
import { LandingReveal } from './LandingReveal'
import styles from './LandingHero.module.css'

export function LandingHero() {
  const copy = LANDING_COPY.hero

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <LandingReveal className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowStar} aria-hidden="true">★</span>
          {copy.eyebrow}
        </p>
        <h1 id="hero-heading" className={styles.title}>
          <span className={styles.titleLine}>
            <span>{copy.titleLead}</span>
            <span className={styles.script}>{copy.titleAccent}</span>
          </span>
          <span>{noWidow(copy.titleRest)}</span>
        </h1>
        <p className={styles.subhead}>{copy.subhead}</p>
        <div className={styles.actions}>
          <Link to="/free-quote" className={styles.primary}>
            {copy.schedule}
          </Link>
          <a href={TEL_HREF} className={styles.phoneLink}>
            or call {SITE_CONFIG.phone.display}
          </a>
        </div>
      </LandingReveal>
      <LandingReveal className={styles.imageFrame}>
        <img
          src="/photos/landing/service-emergency-plumber.jpg"
          alt="Plumber clearing a kitchen drain"
          className={styles.image}
        />
      </LandingReveal>
    </section>
  )
}
