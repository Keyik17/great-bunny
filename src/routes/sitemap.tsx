import { createFileRoute } from '@tanstack/react-router'
import { SiteMap } from '~/components/sections/SiteMap'
import { JsonLd } from '~/components/shared/JsonLd'
import { seo } from '~/utils/seo'
import { BUSINESS_NAME, SITE } from '~/config/site'


const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE}/sitemap#page`,
  url: `${SITE}/sitemap`,
  name: `Site map - ${BUSINESS_NAME}`,
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE}/#org` },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Site map', item: `${SITE}/sitemap` },
  ],
}

export const Route = createFileRoute('/sitemap')({
  head: () => ({
    meta: [
      ...seo({
        title: `Site Map - ${BUSINESS_NAME}`,
        description:
          `Browse every page on the ${BUSINESS_NAME} site: our services, the areas we serve, and our latest articles and guides.`,
      }),
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${SITE}/sitemap` },
    ],
    links: [
      { rel: 'canonical', href: `${SITE}/sitemap` },
      { rel: 'alternate', hrefLang: 'en', href: `${SITE}/sitemap` },
      { rel: 'alternate', hrefLang: 'x-default', href: `${SITE}/sitemap` },
    ],
  }),
  component: SiteMapPage,
})

function SiteMapPage() {
  return (
    <main id="main">
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <SiteMap />
    </main>
  )
}
