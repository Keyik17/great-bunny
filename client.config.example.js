/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CLIENT CONFIG, the input to `npm run init-client`.
 *
 * 1. Copy this file to `client.config.js` (gitignored).
 * 2. Fill in the customer's details.
 * 3. Run `npm run init-client`.
 *
 * The script deterministically writes the IDENTITY layer for you: src/config/
 * site.ts, package.json + wrangler.jsonc names, public/site.webmanifest,
 * public/llms.txt, and (if `cities` is set) the service-area data files. Then it
 * regenerates the sitemap. It does NOT write services, marketing copy, photos,
 * or brand colors, that's the content pass (done by hand or the /new-client
 * skill) after init.
 *
 * Anything you omit keeps its current placeholder, so a minimal config is fine.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default {
  /** Business display name. Used everywhere; also slugified for the project name. */
  name: 'Acme Window Cleaning',

  /** Production domain, no protocol, no trailing slash. */
  domain: 'acmewindows.com',

  /** Human-readable phone. The e164 (+1…) and schema (+1-…) forms are derived. */
  phone: '(402) 555-0123',

  /** Public contact + lead-notification inbox. */
  email: 'hello@acmewindows.com',

  address: {
    street: '123 Main St',
    city: 'Omaha',
    region: 'NE',
    zip: '68102',
    country: 'US',
  },

  /** Optional. Omit to keep the placeholder 4.9 / 270 until real reviews exist. */
  rating: { value: '5.0', count: '120' },

  /** Optional. Omit any field to keep its placeholder. */
  social: {
    instagramHandle: '@acmewindows',
    googleReviewsUrl: 'https://maps.google.com/?cid=REPLACE',
    googleMapsUrl: 'https://maps.google.com/?cid=REPLACE',
    sameAs: [
      'https://www.facebook.com/acmewindows',
      'https://www.instagram.com/acmewindows',
    ],
  },

  /**
   * Optional. When set, regenerates src/data/locations.ts + location-content.tsx
   * with one service-area page per city. Each entry can be a bare string (city
   * name) or an object for finer control. Neighborhoods/zips default to
   * placeholders you fill in later.
   */
  cities: [
    'Omaha',
    {
      name: 'Lincoln',
      county: 'Lancaster',
      neighborhoods: ['Haymarket', 'University Place', 'Near South'],
      zips: ['68508', '68510'],
      featured: true,
    },
    'Bellevue',
  ],
}
