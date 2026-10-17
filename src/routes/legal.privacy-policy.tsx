import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '~/components/sections/LegalLayout'
import { BUSINESS_NAME, SITE, SITE_CONFIG } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

const URL = `${SITE}/legal/privacy-policy`
const DESCRIPTION =
  'Privacy Policy for Great Bunny LLC explaining how website and drain cleaning service information is collected, used, shared, and protected.'

const sections = [
  {
    number: '01',
    title: 'Introduction',
    body: 'Great Bunny LLC is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website great-bunny.pages.dev or use our drain cleaning services.',
  },
  {
    number: '02',
    title: 'Information We Collect',
    body: 'We may collect personal information that you voluntarily provide including name, email address, phone number, service address, and details about your plumbing issue.',
  },
  {
    number: '03',
    title: 'How We Use Your Information',
    body: 'To provide and improve our services, respond to inquiries, send confirmations, process payments, communicate about promotions, and comply with applicable laws and regulations.',
  },
  {
    number: '04',
    title: 'Information Sharing',
    body: 'We do not sell, trade, or rent your personal information. We may share information with trusted service providers who assist in operating our business, when required by law, or to protect our rights and safety.',
  },
  {
    number: '05',
    title: 'Data Security',
    body: 'We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    number: '06',
    title: 'Cookies and Tracking',
    body: 'Our website may use cookies and similar tracking technologies to enhance your experience. You can choose to refuse cookies through your browser settings, but some features of the website may not function properly.',
  },
  {
    number: '07',
    title: 'Your Rights',
    body: `You have the right to request access to, correction of, or deletion of your personal information. You may also opt out of marketing communications at any time. Contact us at ${SITE_CONFIG.email} or ${SITE_CONFIG.phone.display} to exercise these rights.`,
  },
  {
    number: '08',
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.',
  },
  {
    number: '09',
    title: 'Contact Us',
    body: `Great Bunny LLC\nEmail: ${SITE_CONFIG.email}\nPhone: ${SITE_CONFIG.phone.display}\nService Area: Denver, Lakewood, Arvada, Boulder, CO`,
  },
]

export const Route = createFileRoute('/legal/privacy-policy')({
  head: () => ({
    meta: [
      ...seo({ title: `Privacy Policy - ${BUSINESS_NAME}`, description: DESCRIPTION }),
      { property: 'og:url', content: URL },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy" lastUpdated="June 27, 2026">
      {sections.map((section) => (
        <section className={styles.legalSection} key={section.number}>
          <h2 className={styles.legalHeading}>
            <span className={styles.legalNumber}>{section.number}</span>
            {section.title}
          </h2>
          <p className={styles.preLine}>{section.body}</p>
        </section>
      ))}
    </LegalLayout>
  )
}
