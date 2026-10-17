import { Star } from '@phosphor-icons/react'
import { LANDING_COPY } from '~/content/copy'
import { LandingReveal } from './LandingReveal'
import styles from './LandingTestimonials.module.css'

const STARS = Array.from({ length: 5 }, (_, index) => index)

export function LandingTestimonials() {
  const copy = LANDING_COPY.testimonials

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <LandingReveal>
        <h2 id="testimonials-heading" className={styles.title}>
          {copy.title}
        </h2>
      </LandingReveal>
      <div className={styles.cards}>
        {copy.reviews.map((review) => (
          <LandingReveal key={`${review.author}-${review.date}`} className={styles.card}>
            <div className={styles.stars} aria-label={copy.rating}>
              {STARS.map((star) => (
                <Star key={star} size={18} weight="fill" aria-hidden="true" />
              ))}
            </div>
            <blockquote className={styles.quote}>“{review.quote}”</blockquote>
            <p className={styles.author}>
              <strong>{review.author}</strong>
              <span>{review.city}</span>
              <span>{review.date}</span>
              <span>{copy.rating}</span>
            </p>
          </LandingReveal>
        ))}
      </div>
    </section>
  )
}
