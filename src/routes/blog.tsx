import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { LandingReveal } from '~/components/sections/LandingReveal'
import { BUSINESS_NAME, SITE } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

const URL = `${SITE}/blog`
const POST_PATH = '/celebrating-youth-biz-success-at-young-americans-awards'
const DESCRIPTION =
  'Great Bunny LLC news and customer updates, including the Young Americans Youth Biz Awards recognition for founder Marco Reyes.'

export const Route = createFileRoute('/blog')({
  head: () => ({
    meta: [
      ...seo({ title: `Blog - ${BUSINESS_NAME}`, description: DESCRIPTION }),
      { property: 'og:url', content: URL },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: Blog,
})

function Blog() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.section} aria-labelledby="blog-title">
        <LandingReveal className={`${styles.container} ${styles.centerStack}`}>
          <p className={styles.eyebrow}>Blog</p>
          <h1 id="blog-title" className={styles.title}>
            Updates from<br />Great Bunny
          </h1>
          <p className={styles.body}>
            Company news, recognition, and seasonal service notes from the
            Great Bunny team.
          </p>
        </LandingReveal>
      </section>
      <section className={`${styles.section} ${styles.tint}`} aria-label="Articles">
        <LandingReveal className={`${styles.container} ${styles.card}`}>
          <p className={styles.eyebrow}>Oct 28, 2024</p>
          <h2 className={styles.sectionTitle}>
            Celebrating Youth Biz Success<br />at Young Americans Awards!
          </h2>
          <p className={styles.body}>
            Great Bunny LLC shares recognition from the Youth Biz Awards hosted
            by Young Americans.
          </p>
          <Link className={styles.textLink} to={POST_PATH}>
            Read article <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </LandingReveal>
      </section>
    </main>
  )
}
