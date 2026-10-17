/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONFIG, the single source of truth for the business identity.
 *
 * New customer setup, step 1 of the runbook (see README): edit every value in
 * this file. Nothing else in the codebase hardcodes the business name, domain,
 * phone, email, address, rating, or social profiles, they all import from
 * here. If a grep for your placeholder values turns up another file, that's a
 * bug in the template.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SITE_CONFIG = {
  /** Business display name, used in copy, metadata, and schema. */
  name: 'Great Bunny',

  /** Canonical production origin. No trailing slash. VITE_SITE_URL overrides
   *  it for preview deploys so og:image and share cards resolve there. */
  url: (import.meta as any).env?.VITE_SITE_URL ?? 'https://great-bunny.pages.dev',

  phone: {
    /** Human-readable, shown in copy and the navbar. */
    display: '(720) 555-0186',
    /** E.164 for tel: links. */
    e164: '+17205550186',
    /** Hyphenated form used in LocalBusiness JSON-LD. */
    schema: '+1-720-555-0186',
  },

  /** Public contact + lead-notification inbox. */
  email: 'hello@greatbunny.example',

  /** Physical address for NAP consistency (footer, legal, JSON-LD). */
  address: {
    street: '',
    city: 'Lakewood',
    region: 'CO',
    zip: '',
    country: 'US',
    /** One-line form for footers and email signatures. */
    display: 'Lakewood, CO',
  },

  /** Aggregate review rating shown in hero/testimonials and JSON-LD. */
  rating: {
    value: '5.0',
    count: '4',
  },

  social: {
    /** Instagram handle, with the @. */
    instagramHandle: '@greatbunny',
    /**
     * Direct link to the business's Google reviews (the "Read our reviews"
     * CTA target in the hero, testimonials, and footer).
     */
    googleReviewsUrl: 'https://maps.google.com/',
    /** Google Maps business profile link (contact page, footer). */
    googleMapsUrl: 'https://maps.google.com/',
    /**
     * Authoritative business profiles for schema.org sameAs (entity
     * consolidation). Replace with the customer's real profile URLs and add
     * any others they have (Yelp, Nextdoor, BBB, award pages); delete entries
     * they don't have. The footer social icons resolve from this list by
     * hostname.
     */
    sameAs: [
      'https://maps.google.com/',
      'https://www.facebook.com/',
      'https://www.instagram.com/',
    ],
  },
} as const

/** Canonical origin, importable as a bare const (replaces per-route SITE consts). */
export const SITE = SITE_CONFIG.url

/** Bare hostname (no protocol), for analytics hostname guards. */
export const SITE_HOSTNAME = new URL(SITE_CONFIG.url).hostname

/** Business display name shorthand. */
export const BUSINESS_NAME = SITE_CONFIG.name

/** tel: href built from the E.164 number. */
export const TEL_HREF = `tel:${SITE_CONFIG.phone.e164}`
