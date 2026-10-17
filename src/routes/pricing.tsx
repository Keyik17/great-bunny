import { createFileRoute } from '@tanstack/react-router'
import { StubPage } from '~/components/sections/StubPage'
import { seo } from '~/utils/seo'
import { BUSINESS_NAME } from '~/config/site'

export const Route = createFileRoute('/pricing')({
  head: () => ({
    meta: seo({
      title: `Pricing - ${BUSINESS_NAME}`,
      description: 'Placeholder pricing page. Replace with your own pricing.',
    }),
  }),
  component: Pricing,
})

function Pricing() {
  return (
    <StubPage
      eyebrow="Pricing"
      title="Pricing"
      body="Compose this page by copying blocks from the Protocol web-blocks catalog."
    />
  )
}
