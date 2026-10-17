export type Location = {
  slug: string
  name: string
  /**
   * Bare county/region id, e.g. 'Your'. Copy formats it for display
   * ("Your" → "Denver County" / "Denver County"), so leave " County" off.
   */
  county: string
  type: 'city' | 'neighborhood'
  /** Mega-menu / card image for this city. */
  image: string
  /** Whether this appears in the navbar's mega menu as a featured entry. */
  featured?: boolean
}

/**
 * Master location list. Placeholder service areas for the baseline template,
 * swap these for the customer's real cities/regions. Featured locations appear
 * in the navbar mega menu and drive the /locations index + individual city
 * pages.
 */
export const LOCATIONS: Location[] = [
  { slug: 'denver', name: 'Denver', county: 'Denver', type: 'city', image: '/photos/landing/service-area-denver-skyline.jpg', featured: true },
  { slug: 'lakewood', name: 'Lakewood', county: 'Jefferson', type: 'city', image: '/photos/locations/area-lakewood.jpg', featured: true },
  { slug: 'arvada', name: 'Arvada', county: 'Jefferson', type: 'city', image: '/photos/locations/area-arvada.jpg', featured: true },
  { slug: 'boulder', name: 'Boulder', county: 'Boulder', type: 'city', image: '/photos/locations/area-boulder.jpg', featured: true },
]

export const FEATURED_LOCATIONS = LOCATIONS.filter((l) => l.featured)

/** Locations surfaced in the footer column. */
export const FOOTER_LOCATIONS: Location[] = FEATURED_LOCATIONS

/**
 * County/region groups for the /locations index, derived from LOCATIONS in
 * first-appearance order, so the grouping can never go stale.
 */
export const COUNTIES: { id: string; number: string }[] = [
  ...new Set(LOCATIONS.map((l) => l.county)),
].map((id, i) => ({ id, number: String(i + 1).padStart(2, '0') }))
