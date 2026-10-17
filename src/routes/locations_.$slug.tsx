import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Buildings, CheckCircle, House, MapPin, Phone, Siren, Wrench } from '@phosphor-icons/react'
import { JsonLd } from '~/components/shared/JsonLd'
import { LandingReveal } from '~/components/sections/LandingReveal'
import { LOCATIONS } from '~/data/locations'
import { BUSINESS_NAME, SITE, SITE_CONFIG, TEL_HREF } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

type CityPage = {
  slug: string
  name: string
  heroDescription: string
  introTitle: string
  paragraphs: string[]
  neighborhoods: string[]
  image: string
  testimonial?: {
    quote: string
    author: string
  }
}

const cityPages: CityPage[] = [
  {
    slug: 'denver',
    name: 'Denver',
    heroDescription:
      'Professional emergency and scheduled drain cleaning for Denver homes and businesses. Licensed, insured, and locally owned.',
    introTitle: "Denver's trusted\ndrain cleaning experts",
    paragraphs: [
      'Great Bunny LLC provides fast, reliable drain cleaning across Denver and its surrounding neighborhoods. As a locally owned and operated business, we understand the unique plumbing challenges that Denver properties face.',
      "From older Capitol Hill homes to new construction in RiNo, our technicians bring professional-grade equipment and years of experience to every job. We're open Monday through Friday 8am-7pm, and Saturday-Sunday 8am-6pm.",
    ],
    neighborhoods: [
      'Capitol Hill',
      'Five Points',
      'RiNo',
      'Baker',
      'Highland',
      'Wash Park',
      'Congress Park',
      'Cherry Creek',
      "Sloan's Lake",
      'City Park',
      'Park Hill',
      'Stapleton',
    ],
    image: '/photos/landing/service-area-denver-skyline.jpg',
  },
  {
    slug: 'lakewood',
    name: 'Lakewood',
    heroDescription:
      'Reliable drain cleaning for Lakewood homes and businesses. Quick service across Green Mountain, Belmar, and beyond.',
    introTitle: "Lakewood's trusted\ndrain cleaning experts",
    paragraphs: [
      'Great Bunny LLC provides responsive drain cleaning for Lakewood homes, rentals, restaurants, and commercial properties.',
      'From Green Mountain to Belmar, our team handles stubborn clogs, slow drains, and sewer line issues with professional snaking and cabling equipment.',
    ],
    neighborhoods: [
      'Green Mountain',
      'Belmar',
      'Applewood',
      'Eiber',
      'Edgewood',
      'Morse Park',
      'Two Creeks',
      'Daniels',
      'Lakewood Estates',
      'Carmody',
      'Glennon Heights',
      'Bear Creek',
    ],
    image: '/photos/locations/area-lakewood.jpg',
  },
  {
    slug: 'arvada',
    name: 'Arvada',
    heroDescription:
      "Serving Arvada with same-day drain solutions. From Olde Town to Ralston Valley, we're just a call away.",
    introTitle: "Arvada's trusted\ndrain cleaning experts",
    paragraphs: [
      'Great Bunny LLC serves Arvada homes and businesses with practical drain cleaning for backups, slow drains, and sewer issues.',
      'From Olde Town to Ralston Valley, we bring reliable scheduling, clear communication, and professional drain clearing equipment to every job.',
    ],
    neighborhoods: [
      'Olde Town',
      'Ralston Valley',
      'Candelas',
      'Leyden',
      'West Woods',
      'Lake Arbor',
      'Club Crest',
      'Allendale',
      'Arvada West',
      'Scenic Heights',
      'Meadowglen',
      'Ralston Creek',
    ],
    image: '/photos/locations/area-arvada.jpg',
    testimonial: {
      quote:
        "We called Great Bunny to come snake our pipes by our washer, thanks to them we figured out what the problem and a solution. It's really awesome to find good local businesses out there who are trying to do right by others. Would definitely call these guys if I needed them again.",
      author: 'Sophia I., Olde Town Arvada, Yelp Review',
    },
  },
  {
    slug: 'boulder',
    name: 'Boulder',
    heroDescription:
      'Expert drain service extending to the Boulder area. From Pearl Street to University Hill, we handle it all.',
    introTitle: "Boulder's trusted\ndrain cleaning experts",
    paragraphs: [
      'Great Bunny LLC extends professional drain cleaning to Boulder homeowners and businesses that need fast, clear help with clogs and backups.',
      'From Pearl Street to University Hill, we handle kitchen drains, bathroom drains, sewer lines, floor drains, and commercial drainage systems.',
    ],
    neighborhoods: [
      'Pearl Street',
      'University Hill',
      'North Boulder',
      'Gunbarrel',
      'Table Mesa',
      'Chautauqua',
      'Martin Acres',
      'Mapleton Hill',
      'Whittier',
      'Goss Grove',
      'Wonderland Lake',
      'Baseline',
    ],
    image: '/photos/locations/area-boulder.jpg',
    testimonial: {
      quote:
        'Marco was quick to respond and show up. He unclogged our drain very quickly and did a great job! Would absolutely recommend him and utilize his services again in the future.',
      author: 'Paul V., Boulder, Yelp Review',
    },
  },
]

const serviceCards = [
  { number: '01', icon: Siren, title: 'Emergency Drain Cleaning', description: 'Fast response for urgent clogs and backups across the metro area.' },
  { number: '02', icon: Wrench, title: 'Sewer Line Cleaning', description: 'Main line clearing with professional-grade drain equipment.' },
  { number: '03', icon: House, title: 'Residential Drains', description: 'Kitchen, bathroom, and floor drain service for local homes.' },
  { number: '04', icon: Buildings, title: 'Commercial Drains', description: 'Reliable commercial drain service for businesses and properties.' },
]

function getCity(slug: string) {
  return cityPages.find((city) => city.slug === slug)
}

export const Route = createFileRoute('/locations_/$slug')({
  head: ({ params }) => {
    const city = getCity(params.slug)
    const title = city ? `Drain Cleaning in ${city.name} - ${BUSINESS_NAME}` : `Service Area - ${BUSINESS_NAME}`
    const description = city
      ? `Great Bunny LLC provides emergency and scheduled drain cleaning in ${city.name}, Colorado for homes, businesses, sewer lines, and clogged drains.`
      : 'Great Bunny LLC service area page.'
    const url = city ? `${SITE}/locations/${city.slug}` : `${SITE}/locations`
    return {
      meta: [
        ...seo({ title, description }),
        { property: 'og:url', content: url },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: LocationDetailPage,
})

function LocationDetailPage() {
  const { slug } = Route.useParams()
  const city = getCity(slug)
  const location = LOCATIONS.find((item) => item.slug === slug)
  if (!city || !location) throw notFound()

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE}/locations/${city.slug}#service`,
    name: `Drain Cleaning in ${city.name}`,
    serviceType: 'Drain cleaning',
    provider: { '@id': `${SITE}/#org`, name: BUSINESS_NAME },
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: 'CO',
      addressCountry: 'US',
    },
  }

  return (
    <main id="main" className={styles.page}>
      <JsonLd data={serviceJsonLd} />
      <section className={`${styles.section} ${styles.dark}`} aria-labelledby="location-title">
        <LandingReveal className={`${styles.container} ${styles.stack}`}>
          <p className={styles.eyebrow}>{city.name}, Colorado</p>
          <h1 id="location-title" className={styles.title}>
            Drain<br />cleaning <span className={styles.script}>in {city.name}</span>
          </h1>
          <div className={styles.split}>
            <p className={styles.body}>{city.heroDescription}</p>
            <a className={styles.buttonLight} href={TEL_HREF}>
              <Phone size={18} weight="regular" aria-hidden="true" />
              {SITE_CONFIG.phone.display}
            </a>
          </div>
        </LandingReveal>
      </section>

      <div className={styles.strip} aria-label={`${city.name} service area photos`}>
        {[
          location?.image ?? '/photos/locations/strip-skyline.jpg',
          '/photos/locations/strip-editorial-1.jpg',
          '/photos/locations/strip-editorial-2.jpg',
        ].map((src) => (
          <img className={styles.stripImage} src={src} alt="" aria-hidden="true" key={src} />
        ))}
      </div>

      <section className={styles.section} aria-labelledby="location-intro">
        <div className={`${styles.container} ${styles.split}`}>
          <LandingReveal>
            <h2 id="location-intro" className={styles.sectionTitle}>
              {city.introTitle.split('\n').map((part, index) => (
                <span key={part}>
                  {part}
                  {index === 0 ? <br /> : null}
                </span>
              ))}
            </h2>
          </LandingReveal>
          <LandingReveal className={styles.stack}>
            {city.paragraphs.map((paragraph) => (
              <p className={styles.body} key={paragraph}>{paragraph}</p>
            ))}
          </LandingReveal>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="location-services">
        <div className={`${styles.container} ${styles.narrowSplit}`}>
          <LandingReveal className={styles.stack}>
            <h2 id="location-services" className={styles.sectionTitle}>
              Services<br /><span className={styles.script}>in {city.name}</span>
            </h2>
            <p className={styles.body}>
              Professional drain solutions for homes and businesses across
              {` ${city.name}`} and nearby neighborhoods.
            </p>
          </LandingReveal>
          <div className={styles.grid2}>
            {serviceCards.map((card) => {
              const Icon = card.icon
              return (
                <LandingReveal className={styles.card} key={card.title}>
                  <div className={styles.actions}>
                    <span className={styles.legalNumber}>{card.number}</span>
                    <Icon size={22} weight="regular" aria-hidden="true" />
                  </div>
                  <h3 className={styles.h3}>{card.title}</h3>
                  <p className={styles.muted}>{card.description}</p>
                </LandingReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.tint}`} aria-labelledby="neighborhoods-title">
        <div className={`${styles.container} ${styles.stack}`}>
          <div className={styles.neighborhoodHeading}>
            <h2 id="neighborhoods-title" className={styles.sectionTitle}>
              {city.name} neighborhoods<br />we serve
            </h2>
            <p className={styles.muted}>And surrounding areas</p>
          </div>
          <div className={styles.grid3}>
            {city.neighborhoods.map((hood) => (
              <div className={styles.lineCard} key={hood}>
                <span className={styles.plainItem}>
                  <MapPin size={16} weight="regular" aria-hidden="true" />
                  {hood}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {city.testimonial ? (
        <section className={styles.section} aria-labelledby="location-review">
          <LandingReveal className={`${styles.container} ${styles.narrowSplit}`}>
            <div className={styles.stack}>
              <p className={styles.script} aria-hidden="true">"</p>
              <h2 id="location-review" className={styles.h3}>
                Real Yelp review
              </h2>
              <p className={styles.body}>{city.testimonial.quote}</p>
              <p className={styles.muted}>{city.testimonial.author}</p>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}><span className={styles.statValue}>5.0</span><span className={styles.statLabel}>Yelp Rating</span></div>
              <div className={styles.stat}><span className={styles.statValue}>A</span><span className={styles.statLabel}>BBB Rated</span></div>
              <div className={styles.stat}><span className={styles.statValue}>7 Days</span><span className={styles.statLabel}>Open Weekly</span></div>
            </div>
          </LandingReveal>
        </section>
      ) : null}

      <section className={`${styles.section} ${styles.dark} ${styles.compact}`} aria-labelledby="location-cta">
        <div className={`${styles.container} ${styles.split} ${styles.compactSplit}`}>
          <LandingReveal className={styles.stack}>
            <h2 id="location-cta" className={styles.sectionTitle}>
              Ready to book<br />drain service
            </h2>
            <p className={styles.script}>Fast, honest drain cleaning</p>
            <div className={styles.actions}>
              <Link className={styles.buttonLight} to="/free-quote">Schedule service</Link>
              <a className={styles.buttonOutline} href={TEL_HREF}>{SITE_CONFIG.phone.display}</a>
            </div>
          </LandingReveal>
          <LandingReveal className={`${styles.centerStack} ${styles.watermarkColumn}`}>
            <span className={styles.watermark}>720</span>
            <p className={styles.body}>
              5.0 on Yelp, BBB A Rated, Family Owned, Licensed and Insured
            </p>
          </LandingReveal>
        </div>
      </section>
    </main>
  )
}
