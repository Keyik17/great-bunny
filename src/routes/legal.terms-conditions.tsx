import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '~/components/sections/LegalLayout'
import { BUSINESS_NAME, SITE, SITE_CONFIG } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

const URL = `${SITE}/legal/terms-conditions`
const DESCRIPTION =
  'Terms and Conditions for Great Bunny LLC drain cleaning services, scheduling, payment, customer responsibilities, and website use.'

const sections = [
  {
    number: '01',
    title: 'Agreement to Terms',
    body: 'By accessing or using the Great Bunny LLC website (great-bunny.pages.dev) and our drain cleaning services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website or services.',
  },
  {
    number: '02',
    title: 'Services',
    body: 'Great Bunny LLC provides drain cleaning and sewer services for residential and commercial properties in the Denver metropolitan area, including Denver, Lakewood, Arvada, and Boulder, CO. Our services include but are not limited to emergency drain cleaning, sewer drain cleaning, residential drain cleaning, and commercial drain cleaning. All services are subject to availability and scheduling.',
  },
  {
    number: '03',
    title: 'Pricing and Payment',
    body: 'We provide accurate project quotes before any work begins. Prices may vary depending on the type of service, severity of the issue, location, and time of service. Payment is due upon completion of service unless otherwise agreed in writing. We accept credit cards and other standard payment methods.',
  },
  {
    number: '04',
    title: 'Scheduling and Cancellations',
    body: `Service appointments can be scheduled by calling ${SITE_CONFIG.phone.display} or through our website contact form. We ask that you provide at least 24 hours notice for cancellations when possible. Emergency services are available and may be subject to different scheduling terms.`,
  },
  {
    number: '05',
    title: 'Customer Responsibilities',
    body: 'Customers are responsible for providing accurate information about the plumbing issue, ensuring safe and reasonable access to the work area, informing our technicians of any known hazards, being present or having an authorized adult present during service, and making timely payment for services rendered.',
  },
  {
    number: '06',
    title: 'Warranty and Liability',
    body: 'Great Bunny LLC strives to provide the highest quality drain cleaning services. We stand behind our work and will address any concerns promptly. However, we are not liable for pre-existing conditions, damage caused by aging or deteriorated plumbing systems, or issues arising from factors beyond our control. Our liability is limited to the cost of the services provided.',
  },
  {
    number: '07',
    title: 'Promotions and Discounts',
    body: 'From time to time, we may offer promotional discounts including our returning customer discount. Promotions are subject to terms specified at the time of the offer and may be modified or discontinued at our discretion. Discount codes must be presented at the time of service.',
  },
  {
    number: '08',
    title: 'Intellectual Property',
    body: 'All content on the Great Bunny LLC website, including text, graphics, logos, and images, is the property of Great Bunny LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without written permission.',
  },
  {
    number: '09',
    title: 'Website Use',
    body: "You agree to use our website only for lawful purposes and in accordance with these Terms. You may not use the site in any way that could damage, disable, or impair the website or interfere with any other party's use of the site.",
  },
  {
    number: '10',
    title: 'Governing Law',
    body: 'These Terms & Conditions are governed by and construed in accordance with the laws of the State of Colorado, without regard to its conflict of law principles. Any disputes arising from these terms shall be resolved in the courts of Denver County, Colorado.',
  },
  {
    number: '11',
    title: 'Changes to Terms',
    body: 'We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.',
  },
  {
    number: '12',
    title: 'Contact Information',
    body: `For questions about these Terms & Conditions, please contact us:\n\nGreat Bunny LLC\nEmail: ${SITE_CONFIG.email}\nPhone: ${SITE_CONFIG.phone.display}`,
  },
]

export const Route = createFileRoute('/legal/terms-conditions')({
  head: () => ({
    meta: [
      ...seo({ title: `Terms & Conditions - ${BUSINESS_NAME}`, description: DESCRIPTION }),
      { property: 'og:url', content: URL },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: TermsConditions,
})

function TermsConditions() {
  return (
    <LegalLayout eyebrow="Legal" title="Terms & Conditions" lastUpdated="June 27, 2026">
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
