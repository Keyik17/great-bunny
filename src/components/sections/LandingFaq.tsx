import { Phone } from '@phosphor-icons/react'
import { LANDING_COPY } from '~/content/copy'
import { TEL_HREF } from '~/config/site'
import { LandingFaqAccordion } from './LandingFaqAccordion'
import { LandingReveal } from './LandingReveal'
import styles from './LandingFaq.module.css'

export function LandingFaq() {
  const copy = LANDING_COPY.faq
  const items = copy.items.map((item, index) => {
    const number = String(index + 1).padStart(2, '0')

    return {
      id: `faq-${number}`,
      number,
      question: item.question,
      answer: item.answer,
    }
  })

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <LandingReveal className={styles.left}>
        <h2 id="faq-heading" className={styles.title}>
          {copy.title}
        </h2>
        <p className={styles.subhead}>{copy.subhead}</p>
        <a href={TEL_HREF} className={styles.cta}>
          <Phone size="1em" weight="fill" aria-hidden="true" />
          {copy.cta}
        </a>
      </LandingReveal>

      <LandingReveal>
        <LandingFaqAccordion items={items} />
      </LandingReveal>
    </section>
  )
}
