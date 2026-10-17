import { Buildings, House, Pipe, Warning } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { LANDING_COPY } from '~/content/copy'
import { LandingReveal } from './LandingReveal'
import styles from './LandingServices.module.css'

const ICONS: Record<string, Icon> = {
  'emergency-drain-cleaning': Warning,
  'sewer-drain-cleaning': Pipe,
  'residential-drain-cleaning': House,
  'commercial-drain-cleaning': Buildings,
}

export function LandingServices() {
  const copy = LANDING_COPY.services

  return (
    <section className={styles.section} aria-labelledby="services-heading">
      <LandingReveal className={styles.header}>
        <h2 id="services-heading" className={styles.title}>
          {copy.title}
        </h2>
        <p className={styles.subhead}>{copy.subhead}</p>
      </LandingReveal>

      <div className={styles.rows}>
        {copy.items.map((service, index) => {
          const Icon = ICONS[service.slug]
          const isEmergency = service.slug === 'emergency-drain-cleaning'
          const image = isEmergency
            ? '/photos/team-marcus-centeno-job-photo-shower-drain.png'
            : service.image
          const alt = isEmergency
            ? 'Marco Reyes of Great Bunny clearing a shower drain'
            : service.alt

          return (
            <LandingReveal
              key={service.slug}
              className={`${styles.row} ${index % 2 === 1 ? styles.rowReverse : ''}`}
            >
              <div className={styles.imageFrame}>
                <img src={image} alt={alt} className={styles.image} />
              </div>
              <div className={styles.copyPanel}>
                <div className={styles.iconWrap}>
                  <Icon size="var(--space-6)" weight="fill" aria-hidden="true" />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className={styles.learnMore}
                >
                  {copy.learnMore}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </LandingReveal>
          )
        })}
      </div>
    </section>
  )
}
