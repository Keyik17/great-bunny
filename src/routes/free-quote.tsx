import { createFileRoute } from '@tanstack/react-router'
import { QuoteWizard } from '~/components/sections/QuoteWizard'
import { JsonLd } from '~/components/shared/JsonLd'
import { seo } from '~/utils/seo'
import { BUSINESS_NAME, SITE, SITE_CONFIG } from '~/config/site'


const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE}/free-quote#contactpage`,
  url: `${SITE}/free-quote`,
  name: `Free quote - ${BUSINESS_NAME}`,
  inLanguage: 'en-US',
  about: {
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#org`,
    name: BUSINESS_NAME,
    telephone: SITE_CONFIG.phone.schema,
    email: SITE_CONFIG.email,
    areaServed: ['Denver, CO', 'Lakewood, CO', 'Arvada, CO', 'Boulder, CO'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Free quote', item: `${SITE}/free-quote` },
  ],
}

export const Route = createFileRoute('/free-quote')({
  head: () => ({
    meta: [
      ...seo({
        title: `Free Quote - ${BUSINESS_NAME}`,
        description:
          'Get a free quote. Tell us about your space and we send back a fixed price before we arrive. Serving your local area.',
      }),
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${SITE}/free-quote` },
    ],
    links: [
      { rel: 'canonical', href: `${SITE}/free-quote` },
      { rel: 'alternate', hrefLang: 'en', href: `${SITE}/free-quote` },
      { rel: 'alternate', hrefLang: 'x-default', href: `${SITE}/free-quote` },
    ],
  }),
  component: FreeQuote,
})

function FreeQuote() {
  return (
    <main id="main">
      <JsonLd data={contactPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <QuoteWizard />
    </main>
  )
}
