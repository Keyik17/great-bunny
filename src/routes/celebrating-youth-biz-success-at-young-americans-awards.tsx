import { createFileRoute } from '@tanstack/react-router'
import { JsonLd } from '~/components/shared/JsonLd'
import { LandingReveal } from '~/components/sections/LandingReveal'
import { BUSINESS_NAME, SITE, SITE_CONFIG } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

const PATH = '/celebrating-youth-biz-success-at-young-americans-awards/'
const URL = `${SITE}${PATH}`
const TITLE = 'Celebrating Youth Biz Success at Young Americans Awards!'
const DESCRIPTION =
  'Great Bunny LLC celebrates Marco Reyes and the company recognition at the Young Americans Youth Biz Awards.'

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${URL}#article`,
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: '2024-10-28',
  dateModified: '2024-10-28',
  author: { '@type': 'Organization', name: BUSINESS_NAME },
  publisher: { '@id': `${SITE}/#org`, name: BUSINESS_NAME },
  image: [
    `${SITE}/photos/team-marcus-centeno-award-event-portrait.png`,
    `${SITE}/photos/team-marcus-centeno-yba-finalist-card.jpg`,
  ],
  mainEntityOfPage: URL,
}

export const Route = createFileRoute('/celebrating-youth-biz-success-at-young-americans-awards')({
  head: () => ({
    meta: [
      ...seo({ title: `${TITLE} - ${BUSINESS_NAME}`, description: DESCRIPTION }),
      { property: 'og:url', content: URL },
      { property: 'article:published_time', content: '2024-10-28' },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: AwardsPost,
})

function AwardsPost() {
  return (
    <main id="main" className={styles.page}>
      <JsonLd data={articleJsonLd} />
      <article>
        <section className={styles.section} aria-labelledby="post-title">
          <LandingReveal className={styles.article}>
            <p className={styles.eyebrow}>Oct 28, 2024</p>
            <h1 id="post-title" className={styles.title}>
              Celebrating Youth Biz Success<br />at Young Americans Awards!
            </h1>
            <figure className={styles.articleFigure}>
              <img
                src="/photos/team-marcus-centeno-award-event-portrait.png"
                alt="Marco Reyes at the Young Americans awards event"
              />
            </figure>
            <p><strong>Great Bunny LLC Celebrates Youth Biz Success at Young Americans Awards!</strong></p>
            <figure className={styles.articleFigure}>
              <img
                src="/photos/team-marcus-centeno-yba-finalist-card.jpg"
                alt="Young Americans Youth Biz finalist card for Great Bunny LLC"
              />
            </figure>
            <p>
              We are thrilled to share some amazing news! <strong>Great Bunny LLC</strong> was recognized at the <strong>Youth Biz Awards</strong>, hosted by Young Americans. Marco Reyes, our leader and founder, received a <strong>$500 prize</strong>. This award is a big achievement for us and highlights all the hard work Marco has put in to make <strong>Great Bunny LLC</strong> one of the top drain cleaning companies around.
            </p>
            <p>
              The event was a wonderful opportunity to meet other young business owners, share our passion for helping people, and raise funds to support future young entrepreneurs. Marco has worked tirelessly to grow <strong>Great Bunny LLC</strong>, and he is deeply committed to providing the best service to our customers. We are incredibly proud of how far he has come and the success the company has achieved.
            </p>
            <p>
              At <strong>Great Bunny LLC</strong>, we are committed to delivering top-quality drain cleaning services to the Lakewood and Morrison community. This recognition from Young Americans inspires us to continue growing and helping even more people. With the holidays coming up, we want to ensure everyone's homes are prepared and free from clogs!
            </p>
            <p>
              We want to extend our heartfelt thanks to everyone who has supported Marco and <strong>Great Bunny LLC</strong>. Your support means everything to us, and we are excited for what the future holds!
            </p>
            <h2 className={styles.h3}>Special Offer for Our Community</h2>
            <p>
              To celebrate this achievement, we are offering a special discount! For a limited time, new and returning customers can get 10% off their next drain cleaning service. Just mention <strong>"YBA424"</strong> when you book your service. This offer is valid until <strong>December 31, 2024. Don't miss out,</strong> let us help you get ready for a <strong>clog-free holiday party and season</strong>!
            </p>
            <p>
              <strong>Visit our website at </strong><a href={SITE}>{SITE}</a><strong> or call us today {SITE_CONFIG.phone.display} to schedule your service.</strong>
            </p>
          </LandingReveal>
        </section>
      </article>
    </main>
  )
}
