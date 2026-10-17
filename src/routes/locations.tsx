import { createFileRoute, Link } from '@tanstack/react-router'
import { LandingReveal } from '~/components/sections/LandingReveal'
import { LOCATIONS } from '~/data/locations'
import { BUSINESS_NAME, SITE } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

const URL = `${SITE}/locations`
const TITLE = `Service Areas - ${BUSINESS_NAME}`
const DESCRIPTION =
  'Great Bunny LLC provides drain cleaning across Denver, Lakewood, Arvada, and Boulder with emergency and scheduled service.'

export const Route = createFileRoute('/locations')({
  head: () => ({
    meta: [
      ...seo({ title: TITLE, description: DESCRIPTION }),
      { property: 'og:url', content: URL },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: Locations,
})

function Locations() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.section} aria-labelledby="locations-title">
        <LandingReveal className={`${styles.container} ${styles.centerStack}`}>
          <p className={styles.eyebrow}>Service areas</p>
          <h1 id="locations-title" className={styles.title}>
            Drain cleaning across<br />the Denver metro
          </h1>
          <p className={styles.body}>
            Local drain and sewer service for homes and businesses in Denver,
            Lakewood, Arvada, and Boulder.
          </p>
        </LandingReveal>
      </section>

      <section className={`${styles.section} ${styles.tint}`} aria-label="Cities served">
        <div className={`${styles.container} ${styles.containerNarrow} ${styles.grid2}`}>
          {LOCATIONS.map((location) => (
            <LandingReveal className={`${styles.card} ${styles.cardCentered}`} key={location.slug}>
              <img
                className={styles.roundedImage}
                src={location.image}
                alt={`${location.name}, Colorado service area`}
              />
              <h2 className={styles.h3}>{location.name}</h2>
              <p className={styles.muted}>
                Same-day and scheduled drain cleaning for {location.name} homes
                and businesses.
              </p>
              <Link className={styles.textLink} to="/locations/$slug" params={{ slug: location.slug }}>
                See {location.name} coverage
              </Link>
            </LandingReveal>
          ))}
        </div>
      </section>
    </main>
  )
}
