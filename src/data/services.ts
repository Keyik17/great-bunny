import type { Icon } from '@phosphor-icons/react'
import { Buildings, House, Pipe, Siren } from '@phosphor-icons/react'

export type Service = {
  slug: string
  name: string
  shortDescription: string
  icon: Icon
  /** Card/menu photo: navbar mega menu, catalogs, home cards, quote tiles. */
  image: string
  /** Short editorial tagline (the centered subtitle on home cards). */
  tagline: string
  /** Spanish strings. Rendered when ENABLE_ES is on; keep them filled anyway. */
  nameEs: string
  shortDescriptionEs: string
  taglineEs: string
  /** What goes into this service's price (pricing page). No dollar figures. */
  pricingFactors: string
  pricingFactorsEs: string
}

/**
 * Master service list, the single source of truth for everything a service
 * shows on the site (name, copy, image, taglines, pricing factors, EN + ES).
 * Drives the mega menu, the services index, home cards, the pricing page, the
 * footer, the contact dropdown, and the HTML sitemap. Order = priority
 * (flagship first). Components never keep their own slug-keyed maps; add a
 * field here instead.
 *
 * English-only client: the Es fields mirror English by design until a
 * bilingual pass is scoped.
 */
export const SERVICES: Service[] = [
  {
    slug: 'emergency-drain-cleaning',
    name: 'Emergency Drain Cleaning',
    shortDescription:
      'Fast response for backed-up drains and overflowing fixtures across the Denver metro.',
    icon: Siren,
    image: '/photos/landing/service-emergency-plumber.jpg',
    tagline: 'Help when it cannot wait',
    nameEs: 'Emergency Drain Cleaning',
    shortDescriptionEs:
      'Fast response for backed-up drains and overflowing fixtures across the Denver metro.',
    taglineEs: 'Help when it cannot wait',
    pricingFactors:
      'Time of day, how severe the blockage is, and how far down the line the clog sits. You get a clear price before any work starts.',
    pricingFactorsEs:
      'Time of day, how severe the blockage is, and how far down the line the clog sits. You get a clear price before any work starts.',
  },
  {
    slug: 'sewer-drain-cleaning',
    name: 'Sewer Drain Cleaning',
    shortDescription:
      'Main line clogs, root intrusion, and recurring sewer backups cleared at the source.',
    icon: Pipe,
    image: '/photos/landing/service-sewer-bathtub.jpg',
    tagline: 'Clear to the main line',
    nameEs: 'Sewer Drain Cleaning',
    shortDescriptionEs:
      'Main line clogs, root intrusion, and recurring sewer backups cleared at the source.',
    taglineEs: 'Clear to the main line',
    pricingFactors:
      'Line length and access point, the cable size the job needs, and whether roots or heavy buildup are involved.',
    pricingFactorsEs:
      'Line length and access point, the cable size the job needs, and whether roots or heavy buildup are involved.',
  },
  {
    slug: 'residential-drain-cleaning',
    name: 'Residential Drain Cleaning',
    shortDescription:
      'Kitchen, bathroom, shower, and floor drains snaked clean in homes across Denver and Lakewood.',
    icon: House,
    image: '/photos/landing/service-residential-kitchen-sink.jpg',
    tagline: 'Every drain in the house',
    nameEs: 'Residential Drain Cleaning',
    shortDescriptionEs:
      'Kitchen, bathroom, shower, and floor drains snaked clean in homes across Denver and Lakewood.',
    taglineEs: 'Every drain in the house',
    pricingFactors:
      'Which fixture is affected, how accessible the drain is, and the condition of the pipes.',
    pricingFactorsEs:
      'Which fixture is affected, how accessible the drain is, and the condition of the pipes.',
  },
  {
    slug: 'commercial-drain-cleaning',
    name: 'Commercial Drain Cleaning',
    shortDescription:
      'Scheduled and on-call drain service for restaurants, offices, and commercial properties.',
    icon: Buildings,
    image: '/photos/landing/service-commercial-building.jpg',
    tagline: 'Keep the doors open',
    nameEs: 'Commercial Drain Cleaning',
    shortDescriptionEs:
      'Scheduled and on-call drain service for restaurants, offices, and commercial properties.',
    taglineEs: 'Keep the doors open',
    pricingFactors:
      'Property size, fixture count, and whether you need one-time service or recurring maintenance.',
    pricingFactorsEs:
      'Property size, fixture count, and whether you need one-time service or recurring maintenance.',
  },
]

export type ServiceCategory = {
  id: string
  /** Two-digit index shown beside the label. */
  number: string
  name: string
  nameEs: string
  subtitle: string
  subtitleEs: string
  /** Service slugs in this group, in display order. */
  slugs: string[]
}

/**
 * Catalog groups for the /services index. Order within each group is curated,
 * not the raw SERVICES order. Keep the slugs in sync with SERVICES when
 * retoning for a customer; the catalog skips slugs it cannot find.
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'urgent-response',
    number: '01',
    name: 'Urgent Response',
    nameEs: 'Urgent Response',
    subtitle: 'Backups and blockages handled fast',
    subtitleEs: 'Backups and blockages handled fast',
    slugs: ['emergency-drain-cleaning', 'sewer-drain-cleaning'],
  },
  {
    id: 'homes-and-businesses',
    number: '02',
    name: 'Homes & Businesses',
    nameEs: 'Homes & Businesses',
    subtitle: 'Routine cleaning and recurring maintenance',
    subtitleEs: 'Routine cleaning and recurring maintenance',
    slugs: ['residential-drain-cleaning', 'commercial-drain-cleaning'],
  },
]
