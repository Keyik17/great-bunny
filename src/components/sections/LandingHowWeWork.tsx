import { LANDING_COPY } from '~/content/copy'
import { LandingReveal } from './LandingReveal'
import styles from './LandingHowWeWork.module.css'

export function LandingHowWeWork() {
  const copy = LANDING_COPY.process

  return (
    <section className={styles.section} aria-labelledby="process-heading">
      <LandingReveal className={styles.header}>
        <h2 id="process-heading" className={styles.title}>
          {copy.title}
        </h2>
        <p className={styles.subhead}>{copy.subhead}</p>
      </LandingReveal>

      <LandingReveal className={styles.steps}>
        {copy.steps.map((step) => (
          <div key={step.number} className={styles.stepGroup}>
            <article className={styles.step}>
              <p className={styles.number}>{step.number}</p>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </article>
          </div>
        ))}
      </LandingReveal>
    </section>
  )
}
