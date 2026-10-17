import { createFileRoute } from '@tanstack/react-router'
import { Unsubscribe } from '~/components/sections/Unsubscribe'
import { unsubscribeContact } from '~/server/unsubscribe'
import { seo } from '~/utils/seo'
import { BUSINESS_NAME, SITE } from '~/config/site'


// Email unsubscribe landing. Reads ?email= and removes the contact from the
// Resend audience on load. Not indexed.
export const Route = createFileRoute('/unsubscribe')({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === 'string' ? search.email : '',
  }),
  loaderDeps: ({ search }) => ({ email: search.email }),
  loader: async ({ deps }) => {
    if (deps.email) {
      await unsubscribeContact({ data: { email: deps.email } }).catch(() => undefined)
    }
    return { hasEmail: Boolean(deps.email) }
  },
  head: () => ({
    meta: [
      ...seo({
        title: `Unsubscribe - ${BUSINESS_NAME}`,
        description: `Manage your ${BUSINESS_NAME} email preferences.`,
      }),
      { name: 'robots', content: 'noindex, nofollow' },
      { property: 'og:url', content: `${SITE}/unsubscribe` },
    ],
    links: [{ rel: 'canonical', href: `${SITE}/unsubscribe` }],
  }),
  component: UnsubscribePage,
})

function UnsubscribePage() {
  const { hasEmail } = Route.useLoaderData()
  return (
    <main id="main">
      <Unsubscribe hasEmail={hasEmail} />
    </main>
  )
}
