import { Phone } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { LANDING_COPY } from '~/content/copy'
import { TEL_HREF } from '~/config/site'
import { LandingReveal } from './LandingReveal'
import styles from './LandingCta.module.css'

export function LandingCta() {
  const copy = LANDING_COPY.cta

  return (
    <section className={styles.section} aria-labelledby="landing-cta-heading">
      <LandingReveal className={styles.textSide}>
        <h2 id="landing-cta-heading" className={styles.title}>
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </h2>
        <p className={styles.script}>{copy.script}</p>
        <div className={styles.actions}>
          <Link to="/free-quote" className={styles.schedule}>
            {copy.schedule}
          </Link>
          <a href={TEL_HREF} className={styles.phone}>
            <Phone size="1em" weight="fill" aria-hidden="true" />
            {copy.phone}
          </a>
        </div>
      </LandingReveal>
      <LandingReveal className={styles.imageSide}>
        <img src={copy.image} alt={copy.alt} className={styles.image} />
      </LandingReveal>
    </section>
  )
}
