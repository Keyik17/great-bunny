import { createFileRoute } from '@tanstack/react-router'
import { QuoteSent } from '~/components/sections/QuoteSent'
import { seo } from '~/utils/seo'
import { BUSINESS_NAME, SITE } from '~/config/site'


// Post-submit confirmation. Not indexed (it is a transactional dead-end page).
export const Route = createFileRoute('/quotesent')({
  head: () => ({
    meta: [
      ...seo({
        title: `Request Received - ${BUSINESS_NAME}`,
        description: 'Thanks, your quote request is in. We will text you a fixed price the same day.',
      }),
      { name: 'robots', content: 'noindex, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${SITE}/quotesent` },
    ],
    links: [{ rel: 'canonical', href: `${SITE}/quotesent` }],
  }),
  component: QuoteSentPage,
})

function QuoteSentPage() {
  return (
    <main id="main">
      <QuoteSent />
    </main>
  )
}
