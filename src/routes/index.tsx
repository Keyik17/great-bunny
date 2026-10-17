import { createFileRoute } from '@tanstack/react-router'
import { LandingCta } from '~/components/sections/LandingCta'
import { LandingFaq } from '~/components/sections/LandingFaq'
import { LandingHero } from '~/components/sections/LandingHero'
import { LandingHowWeWork } from '~/components/sections/LandingHowWeWork'
import { LandingServiceAreas } from '~/components/sections/LandingServiceAreas'
import { LandingServices } from '~/components/sections/LandingServices'
import { LandingTestimonials } from '~/components/sections/LandingTestimonials'
import { LandingWhyUs } from '~/components/sections/LandingWhyUs'
import { SITE } from '~/config/site'
import { seo } from '~/utils/seo'

const TITLE = "Great Bunny LLC: Experts in unclogging Denver's toughest problems!"
const DESCRIPTION =
  'Denver metro drain cleaning from Great Bunny LLC for urgent clogs, sewer line clearing, residential drains, and commercial drain service. Call today.'
const CANONICAL = `${SITE}/`

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: TITLE,
        description: DESCRIPTION,
        image: `${SITE}/brand/og-image.png`,
      }),
      { property: 'og:url', content: CANONICAL },
    ],
    links: [{ rel: 'canonical', href: CANONICAL }],
  }),
  component: Home,
})

function Home() {
  return (
    <main id="main">
      <LandingHero />
      <LandingServices />
      <LandingHowWeWork />
      <LandingWhyUs />
      <LandingTestimonials />
      <LandingServiceAreas />
      <LandingFaq />
      <LandingCta />
    </main>
  )
}
