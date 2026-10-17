import { useState } from 'react'
import { CaretLeft, CaretRight, MapPin } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { useReducedMotion } from 'framer-motion'
import { LANDING_COPY } from '~/content/copy'
import { LandingReveal } from './LandingReveal'
import styles from './LandingServiceAreas.module.css'

export function LandingServiceAreas() {
  const copy = LANDING_COPY.serviceAreas
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)
  const activeSlide = copy.slides[activeIndex]

  const goTo = (index: number) => {
    const total = copy.slides.length
    setActiveIndex((index + total) % total)
  }

  const handlePointerUp = (clientX: number) => {
    if (startX === null) return
    const delta = clientX - startX
    if (Math.abs(delta) > 40) {
      goTo(activeIndex + (delta < 0 ? 1 : -1))
    }
    setStartX(null)
  }

  return (
    <section className={styles.section} aria-label="Service areas">
      <LandingReveal className={styles.carousel}>
        <div className={styles.infoPanel}>
          <div className={styles.pinWrap} aria-hidden="true">
            <MapPin size={24} weight="fill" />
          </div>
          <h2 className={styles.city}>{activeSlide.city}</h2>
          <p className={styles.description}>{activeSlide.description}</p>
          <div className={styles.stats}>
            <Stat label={copy.statLabels.responseTime} value={activeSlide.responseTime} />
            <Stat label={copy.statLabels.services} value={activeSlide.services} />
            <Stat label={copy.statLabels.coverage} value={activeSlide.coverage} />
          </div>
          <Link to="/services" className={styles.outlineCta}>
            {copy.cta}
          </Link>
          <div className={styles.dots} role="tablist" aria-label="Select service area">
            {copy.slides.map((slide, index) => (
              <button
                key={slide.city}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                aria-label={`Show ${slide.city}`}
                aria-selected={index === activeIndex}
                role="tab"
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>

        <div
          className={styles.mapPanel}
          onPointerDown={(event) => setStartX(event.clientX)}
          onPointerUp={(event) => handlePointerUp(event.clientX)}
          onPointerCancel={() => setStartX(null)}
        >
          <div
            className={styles.track}
            style={{
              transform: `translateX(calc(${activeIndex} * -100%))`,
              transition: reduceMotion ? 'none' : undefined,
            }}
          >
            {copy.slides.map((slide) => (
              <div key={slide.city} className={styles.slide}>
                <img src={slide.image} alt={slide.imageAlt} className={styles.image} />
                <div className={styles.label}>
                  <MapPin size={14} weight="fill" aria-hidden="true" />
                  {slide.label}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.arrowGroup}>
            <button
              type="button"
              className={styles.arrowButton}
              aria-label="Previous service area"
              onClick={() => goTo(activeIndex - 1)}
            >
              <CaretLeft size={20} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.arrowButton}
              aria-label="Next service area"
              onClick={() => goTo(activeIndex + 1)}
            >
              <CaretRight size={20} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </LandingReveal>

      {/* Mobile replaces the carousel with a 2x2 grid of city cards. */}
      <LandingReveal className={styles.mobileGrid}>
        <h2 className={styles.mobileTitle}>Areas We Serve</h2>
        <div className={styles.gridCards}>
          {copy.slides.map((slide) => (
            <Link
              key={slide.city}
              to="/locations/$slug"
              params={{ slug: slide.city.toLowerCase() }}
              className={styles.gridCard}
              aria-label={`${slide.city} service area`}
            >
              <img src={slide.image} alt="" aria-hidden="true" className={styles.gridImage} />
              <span className={styles.gridOverlay}>
                <span className={styles.gridCity}>
                  <MapPin size={14} weight="fill" aria-hidden="true" />
                  {slide.city}
                </span>
                <span className={styles.gridMeta}>{slide.responseTime}</span>
              </span>
            </Link>
          ))}
        </div>
      </LandingReveal>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.stat}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
