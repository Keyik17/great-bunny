import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { LandingFaqAccordion } from '~/components/sections/LandingFaqAccordion'
import {
  Buildings,
  Calendar,
  CalendarCheck,
  CheckCircle,
  CurrencyDollar,
  DoorOpen,
  Drop,
  Gauge,
  Heart,
  House,
  Stack,
  MapPin,
  Moon,
  Phone,
  SealCheck,
  ShieldCheck,
  ShirtFolded,
  Siren,
  Star,
  Timer,
  Tree,
  TrendUp,
  Users,
  ForkKnife,
  Warning,
  Waves,
  Wrench,
  Lightning,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { JsonLd } from '~/components/shared/JsonLd'
import { LandingReveal } from '~/components/sections/LandingReveal'
import { BUSINESS_NAME, SITE, SITE_CONFIG, TEL_HREF } from '~/config/site'
import { seo } from '~/utils/seo'
import styles from '~/components/sections/InnerPage.module.css'

type Issue = { icon: Icon; title: string; description: string }
type Faq = { question: string; answer: string }
type ServicePage = {
  slug: string
  name: string
  title: [string, string, string]
  description: string
  heroImage: string
  overviewTitle: [string, string]
  overview: string[]
  overviewImage: string
  stats: [string, string][]
  issuesTitle: string
  issuesSub: string
  issues: Issue[]
  processTitle: string
  process: [string, string][]
  signsOne: { title: [string, string]; description: string; items: string[]; image: string }
  signsTwo: { title: string; description: string; items: string[]; image: string }
  whyImage: string
  faqSub: string
  faqs: Faq[]
  ctaTitle: string
  ctaScript: string
  ctaImage: string
}

const sharedStats: [string, string][] = [
  ['Same Day', 'Service'],
  ['7 Days', 'A Week'],
  ['5.0 ★', 'Yelp Rating'],
]

const servicePages: ServicePage[] = [
  {
    slug: 'emergency-drain-cleaning',
    name: 'Emergency Drain Cleaning',
    title: ['Emergency Drain', 'Cleaning,', 'Fast'],
    description:
      'Drain backups can quickly turn into stressful emergencies. Great Bunny provides fast emergency drain cleaning to restore proper flow, including after-hours and weekend service across the Denver metro.',
    heroImage: '/photos/services/1581533946277-1f137a7fbc82.jpg',
    overviewTitle: ['Fast response when', 'You Need It'],
    overview: [
      'Drain backups can quickly turn into stressful emergencies. Great Bunny provides fast emergency drain cleaning services to help homeowners and businesses restore proper flow as quickly as possible.',
      "Whether you're dealing with standing water, overflowing drains, or severe blockages, our team works efficiently to diagnose and resolve the issue. We understand that every minute counts during a drain emergency, so we prioritize rapid response and effective solutions.",
    ],
    overviewImage: '/photos/services/1658893947482-41c55d565163.jpg',
    stats: sharedStats,
    issuesTitle: 'Common drain emergencies we handle',
    issuesSub: "From minor clogs to major sewer backups, we've seen it all and fixed it fast.",
    issues: [
      { icon: Waves, title: 'Overflowing Drains', description: 'Water rising from sinks, tubs, or floor drains threatening damage to your home or business.' },
      { icon: Warning, title: 'Emergency Sewer Backups', description: 'Raw sewage backing up into your property, a health hazard that demands immediate action.' },
      { icon: Drop, title: 'Standing Water Removal', description: 'Pooling water in basements, crawl spaces, or around fixtures causing ongoing damage.' },
      { icon: ShieldCheck, title: 'Severe Drain Blockages', description: 'Complete pipe obstructions that stop all water flow and require professional clearing.' },
      { icon: Timer, title: 'Slow or Clogged Drains', description: 'Gradually worsening flow that signals a deeper issue before it becomes a full emergency.' },
      { icon: Moon, title: 'After-Hours Urgent Issues', description: 'Drain problems that strike at night, on weekends, or holidays when you need help most.' },
      { icon: House, title: 'Kitchen & Bath Emergencies', description: "Critical fixture failures in the most-used rooms that can't wait until business hours." },
      { icon: Wrench, title: 'Fast Diagnostics & Clearing', description: 'Rapid identification of the root cause followed by effective, lasting drain clearing.' },
    ],
    processTitle: 'Our emergency process',
    process: [
      ['Call & Describe', "Give us a call and tell us about your drain emergency. We'll ask a few questions and dispatch help fast."],
      ['We Arrive Fast', "Our technician arrives quickly, inspects the issue, and explains exactly what's going on."],
      ['Diagnose & Clear', 'We identify the root cause and clear the blockage using proven, professional drain cleaning methods.'],
      ['Problem Solved', 'Your drains are flowing properly again. We verify the fix and clean up before we leave.'],
    ],
    signsOne: {
      title: ['Warning', 'Signs'],
      description: "These signs indicate your drain system needs emergency professional attention. Don't ignore them because small issues escalate fast.",
      items: ['Water backing up in multiple fixtures', 'Foul odors coming from drains', 'Gurgling sounds in your pipes'],
      image: '/photos/services/1752188189942-da20edbb0f92.jpg',
    },
    signsTwo: {
      title: 'When every\nminute counts',
      description: "Standing water and sewage backups aren't just inconvenient. They can cause structural damage and health hazards. Call Great Bunny at the first sign of trouble.",
      items: ['Slow drains throughout the house', 'Water pooling around floor drains', 'Visible sewage or waste water'],
      image: '/photos/services/1764551322786-54a994923d8f.jpg',
    },
    whyImage: '/photos/services/1635294084898-9a7ed6559eb4.jpg',
    faqSub: 'Everything you need to know about our emergency drain cleaning services.',
    faqs: [
      { question: 'How quickly can you respond to a drain emergency?', answer: 'We offer same-day and emergency service across the Denver metro area. In most cases, we can be at your door within 1-2 hours of your call.' },
      { question: 'What types of drains do you clean?', answer: "We handle all types: kitchen sinks, bathroom drains, floor drains, main sewer lines, laundry lines, and commercial drains. If it's clogged, we can clear it." },
      { question: 'How much does drain cleaning cost?', answer: 'Pricing depends on the type and severity of the clog. We always provide an accurate, upfront quote before starting work. Returning customers can use the discount code on our website.' },
      { question: 'Do you offer any guarantees?', answer: "We stand behind our work and are committed to making sure you're satisfied with the results. Our BBB 'A' rating and 5.0 Yelp rating reflect our dedication to quality and reliable service." },
      { question: 'Are you licensed and insured?', answer: "Absolutely. Great Bunny LLC is fully licensed, insured, and BBB 'A' rated. You can trust us in your home or business." },
    ],
    ctaTitle: "Don't let a drain\nemergency ruin your day",
    ctaScript: 'Fast, honest emergency drain cleaning',
    ctaImage: '/photos/services/1554863677-92f0b7246976.jpg',
  },
  {
    slug: 'sewer-drain-cleaning',
    name: 'Sewer Drain Cleaning',
    title: ['Professional Sewer', 'Drain Cleaning,', 'Done Right'],
    description:
      'Sewer drain problems can disrupt your entire property if left unresolved. Great Bunny provides reliable sewer drain cleaning services to remove blockages and restore proper drainage across the Denver metro.',
    heroImage: '/photos/services/1736322584712-9f32bd1ee2dd.jpg',
    overviewTitle: ['Reliable service for', 'Your Sewer Lines'],
    overview: [
      'Sewer drain problems can disrupt your entire property if left unresolved. Great Bunny provides reliable sewer drain cleaning services designed to remove blockages and restore proper drainage.',
      'We focus on efficient diagnostics, effective drain clearing, and preventative recommendations that help reduce future drainage issues. From residential homes to commercial properties, our team handles it all.',
    ],
    overviewImage: '/photos/services/1639600993675-2281b2c939f0.jpg',
    stats: sharedStats,
    issuesTitle: 'Our sewer drain services',
    issuesSub: 'Professional solutions for every sewer drain challenge, from routine cleaning to complex blockages.',
    issues: [
      { icon: Drop, title: 'Sewer Line Blockage Removal', description: 'Complete removal of stubborn blockages in your main and secondary sewer lines.' },
      { icon: Stack, title: 'Main Sewer Line Cleaning', description: 'Thorough cleaning of your primary sewer line to restore full flow and prevent backups.' },
      { icon: Wrench, title: 'Recurring Backup Solutions', description: 'Targeted diagnostics and fixes for sewer drains that back up repeatedly.' },
      { icon: ShieldCheck, title: 'Preventative Maintenance', description: 'Scheduled cleaning programs designed to keep your sewer lines clear and trouble-free.' },
      { icon: Gauge, title: 'Drain Flow Inspections', description: 'Professional inspections to assess drain health and catch issues before they escalate.' },
      { icon: Tree, title: 'Root Intrusion Removal', description: 'Clearing tree root growth that invades and obstructs your sewer pipes.' },
      { icon: Buildings, title: 'Residential & Commercial', description: 'Full sewer drain clearing services for homes, offices, restaurants, and multi-unit buildings.' },
      { icon: TrendUp, title: 'Long-Term Improvement', description: "Expert recommendations to improve your drainage system's performance over time." },
    ],
    processTitle: 'Our sewer cleaning process',
    process: [
      ['Call & Describe', "Give us a call and describe the sewer drain issue. We'll ask a few questions and schedule a visit."],
      ['We Arrive Fast', 'Our technician arrives with professional equipment to inspect your sewer system.'],
      ['Diagnose & Clear', 'We identify the root cause and clear the sewer blockage using proven, professional methods.'],
      ['Problem Solved', 'Your sewer drains are flowing properly. We verify the fix and provide maintenance recommendations.'],
    ],
    signsOne: {
      title: ['Signs of a', 'Sewer Problem'],
      description: 'These signs indicate your sewer drain system needs professional attention. Catching them early can prevent costly damage to your property.',
      items: ['Recurring backups in the same drain', 'Foul sewer odors near your property', 'Multiple drains clogging at once'],
      image: '/photos/services/1547022546-89499963077e.jpg',
    },
    signsTwo: {
      title: "Don't wait for\nit to get worse",
      description: 'Sewer drain issues left untreated can lead to property damage, health hazards, and expensive repairs. Great Bunny provides proactive sewer cleaning to keep your system running smoothly.',
      items: ['Slow drains across multiple fixtures', 'Tree roots growing near sewer lines', 'Sewage smells in your yard or basement'],
      image: '/photos/services/1745426863308-308b92bff031.jpg',
    },
    whyImage: '/photos/services/1635294084898-9a7ed6559eb4.jpg',
    faqSub: 'Everything you need to know about our sewer drain cleaning services.',
    faqs: [
      { question: 'How do I know if my sewer line needs cleaning?', answer: "Common signs include recurring backups, slow drains throughout the house, foul odors near drains, and gurgling sounds. If multiple fixtures are affected at once, it's likely a main sewer line issue." },
      { question: 'What methods do you use for sewer drain cleaning?', answer: 'We use professional-grade drain snaking and cabling equipment to diagnose and clear sewer blockages effectively. The method depends on the type and severity of the clog.' },
      { question: 'Can tree roots really damage sewer lines?', answer: 'Yes. Tree roots are one of the most common causes of sewer line blockages. They grow into pipe joints seeking moisture and can cause significant obstruction. We can clear root intrusions and recommend preventive measures.' },
      { question: 'How often should sewer drains be cleaned?', answer: 'For most properties, we recommend professional sewer drain cleaning every 1-2 years as preventive maintenance. Properties with older pipes, nearby trees, or a history of backups may benefit from more frequent service.' },
      { question: 'Do you service both residential and commercial properties?', answer: 'Absolutely. Great Bunny provides sewer drain cleaning for homes, apartment buildings, restaurants, office buildings, and other commercial properties across the entire Denver metro area.' },
    ],
    ctaTitle: 'Ready to get your\nsewer drains flowing?',
    ctaScript: 'Fast, honest sewer drain cleaning',
    ctaImage: '/photos/services/1744484347124-ad6ad1b222aa.jpg',
  },
  {
    slug: 'residential-drain-cleaning',
    name: 'Residential Drain Cleaning',
    title: ['Residential Drain', 'Cleaning,', 'Made Easy'],
    description:
      'Clogged household drains can interfere with everyday life. Great Bunny helps homeowners quickly eliminate stubborn drain problems and restore normal function across the Denver metro.',
    heroImage: '/photos/services/1736390800504-d3963b553aa3.jpg',
    overviewTitle: ["Your home's drains,", 'Our Priority'],
    overview: [
      'Clogged household drains can interfere with everyday life. Our residential drain cleaning services help homeowners quickly eliminate stubborn drain problems and restore normal function.',
      'From kitchen sinks to bathroom showers, we handle every residential drain with care. Our technicians arrive equipped with professional tools to diagnose the issue and get your water flowing again fast and without damage to your home.',
    ],
    overviewImage: '/photos/services/1542013936693-884638332954.jpg',
    stats: sharedStats,
    issuesTitle: 'Residential drain services we offer',
    issuesSub: 'Professional drain cleaning solutions for every room in your home.',
    issues: [
      { icon: ForkKnife, title: 'Kitchen Sink Clogs', description: 'Grease, food particles, and soap buildup cleared from your kitchen drain quickly and effectively.' },
      { icon: Drop, title: 'Bathroom Drain Blockages', description: 'Hair, soap scum, and product buildup removed from shower, tub, and sink drains.' },
      { icon: Gauge, title: 'Slow Drains', description: 'Gradually worsening flow diagnosed and resolved before it becomes a full blockage.' },
      { icon: Drop, title: 'Standing Water', description: 'Pooling water in sinks, tubs, or showers cleared and the underlying cause addressed.' },
      { icon: Wrench, title: 'Recurring Drainage Problems', description: 'Persistent clogs investigated at the source with long-term solutions.' },
      { icon: ShirtFolded, title: 'Laundry Drain Cleaning', description: 'Lint, detergent buildup, and debris cleared from washing machine drains.' },
      { icon: Drop, title: 'Floor Drain Clearing', description: 'Basement and utility room floor drains cleared to prevent water damage and backups.' },
      { icon: ShieldCheck, title: 'Preventative Maintenance', description: "Scheduled drain cleaning to keep your home's plumbing flowing smoothly year-round." },
    ],
    processTitle: 'Our residential process',
    process: [
      ['Call & Describe', "Give us a call and describe your drain issue. We'll ask a few questions and schedule a convenient visit."],
      ['We Arrive Fast', "Our technician arrives at your home, inspects the drain, and explains exactly what's going on."],
      ['Diagnose & Clear', "We identify the clog and clear it using professional methods safe for your home's plumbing."],
      ['Problem Solved', 'Your drains are flowing properly. We clean up and share tips to prevent future clogs.'],
    ],
    signsOne: {
      title: ['Common', 'Warning Signs'],
      description: "These signs indicate your home's drains need professional attention. Catching them early saves time and money.",
      items: ['Kitchen sink draining slowly or not at all', 'Unpleasant odors from bathroom drains', 'Water backing up in the shower or tub'],
      image: '/photos/services/1691848874048-3ae8174727c7.jpg',
    },
    signsTwo: {
      title: "When DIY\nisn't enough",
      description: "Store-bought drain cleaners can damage pipes and often don't reach the real problem. Professional drain cleaning is safer, more effective, and prevents recurring issues.",
      items: ['Standing water in sinks or tubs', 'Multiple drains clogging at the same time', 'Gurgling sounds when water drains'],
      image: '/photos/services/1763160869927-c9719b5d45b8.jpg',
    },
    whyImage: '/photos/services/1643730169312-7a68bedfc067.jpg',
    faqSub: 'Everything you need to know about residential drain cleaning services.',
    faqs: [
      { question: 'Can you clear kitchen sink clogs?', answer: 'Yes. We clear kitchen sink clogs caused by grease, food particles, soap buildup, and other common household debris using professional drain cleaning equipment.' },
      { question: 'Do you clean bathroom and shower drains?', answer: 'Yes. We handle bathroom sinks, tubs, and shower drains, including hair clogs, soap scum buildup, and slow-draining fixtures.' },
      { question: 'How do you handle hair clogs?', answer: 'We use professional snaking and cabling methods to remove hair buildup from the drain line instead of relying on chemical cleaners that can damage pipes.' },
      { question: 'How is residential drain cleaning priced?', answer: 'Pricing depends on the affected fixture, how accessible the drain is, and how severe the clog is. We provide an upfront quote before work starts.' },
      { question: 'Can I schedule residential drain service?', answer: 'Yes. Call or request a quote online to schedule a convenient visit. Same-day service is available in many cases across the Denver metro area.' },
    ],
    ctaTitle: 'Ready to get your\nhome drains flowing?',
    ctaScript: 'Fast, friendly residential drain cleaning',
    ctaImage: '/photos/services/1780445392462-b7761551820c.jpg',
  },
  {
    slug: 'commercial-drain-cleaning',
    name: 'Commercial Drain Cleaning',
    title: ['Commercial Drain', 'Cleaning,', 'Done Right'],
    description:
      'Drainage problems can negatively impact customers, employees, and business operations. Great Bunny provides dependable commercial drain cleaning solutions for businesses needing fast and professional service.',
    heroImage: '/photos/services/1760124056883-ef50b638cfd1.jpg',
    overviewTitle: ['Your business', 'Deserves Better Drains'],
    overview: [
      'Clogged or slow drains can disrupt daily operations, drive away customers, and create health code concerns. Our commercial drain cleaning services keep your business running smoothly.',
      'From restaurants and retail spaces to offices and warehouses, we handle every commercial drain with the speed and professionalism your business demands. We work around your schedule to minimize downtime and keep operations on track.',
    ],
    overviewImage: '/photos/services/1587371169408-7abd77642648.jpg',
    stats: [['Minimal', 'Downtime'], ['7 Days', 'A Week'], ['5.0 ★', 'Yelp Rating']],
    issuesTitle: 'Commercial drain services we offer',
    issuesSub: 'Professional drain solutions tailored to the demands of commercial properties.',
    issues: [
      { icon: Drop, title: 'Drain Clearing', description: 'Fast, effective clearing of clogged commercial drains to restore normal flow and prevent business disruption.' },
      { icon: Wrench, title: 'Sewer Drain Cleaning', description: 'Professional sewer line cleaning for commercial properties to prevent backups and costly damage.' },
      { icon: CalendarCheck, title: 'Preventative Maintenance', description: 'Scheduled drain maintenance programs designed to keep your commercial plumbing running trouble-free.' },
      { icon: Lightning, title: 'Emergency Commercial Service', description: 'Rapid-response drain service when unexpected blockages threaten your business operations.' },
      { icon: ForkKnife, title: 'Restaurant Drain Cleaning', description: 'Grease trap clearing and kitchen drain cleaning to keep food service operations compliant and flowing.' },
      { icon: DoorOpen, title: 'Restroom Drain Services', description: 'High-traffic commercial restroom drains cleared and maintained to prevent backups and odors.' },
      { icon: Drop, title: 'Floor Drain Maintenance', description: 'Warehouse, retail, and facility floor drains cleared to prevent water damage and safety hazards.' },
      { icon: Buildings, title: 'Multi-Unit Drain Service', description: 'Comprehensive drain cleaning for office buildings, apartment complexes, and multi-tenant commercial spaces.' },
    ],
    processTitle: 'Our commercial process',
    process: [
      ['Call & Describe', "Call us and describe your commercial drain issue. We'll ask about your property and schedule service around your business hours."],
      ['We Arrive Fast', 'Our technician arrives on-site, evaluates the drain system, and explains the issue and recommended approach.'],
      ['Diagnose & Clear', 'We clear the blockage using professional commercial-grade equipment, working quickly to minimize disruption.'],
      ['Problem Solved', 'Your drains are flowing. We clean up and can set up a maintenance plan to prevent future issues.'],
    ],
    signsOne: {
      title: ['Common', 'Warning Signs'],
      description: 'These signs mean your commercial property needs professional drain attention. Acting early prevents costly shutdowns.',
      items: ['Slow-draining sinks in break rooms or restrooms', 'Foul odors in customer-facing areas', 'Water pooling near floor drains'],
      image: '/photos/services/1634135214044-7774b415e421.jpg',
    },
    signsTwo: {
      title: "Don't risk\nyour business",
      description: 'Drain problems in commercial settings can lead to health code violations, slip hazards, and lost revenue. Professional service resolves issues fast and keeps your business compliant.',
      items: ['Recurring clogs in high-use restrooms', 'Multiple fixtures backing up simultaneously', 'Gurgling sounds from commercial plumbing'],
      image: '/photos/services/1777244746770-b178e6c69e5a.jpg',
    },
    whyImage: '/photos/services/1709613439193-d645140d243a.jpg',
    faqSub: 'Everything you need to know about our commercial drain cleaning services.',
    faqs: [
      { question: 'What types of commercial properties do you service?', answer: 'We service restaurants, retail stores, office buildings, warehouses, apartment complexes, medical facilities, and more. If your business has drains, we can clean them.' },
      { question: 'Can you work outside of business hours?', answer: "Absolutely. We offer flexible scheduling including evenings, weekends, and early mornings so our work doesn't interfere with your operations or customers." },
      { question: 'How do you minimize disruption to our business?', answer: 'We schedule around your peak hours, use clean and efficient equipment, and work quickly. Most commercial drain cleanings are completed in under two hours with minimal noise and mess.' },
      { question: 'Do you offer maintenance contracts?', answer: "Yes. We offer scheduled maintenance plans tailored to your property's needs. Regular preventative cleaning reduces emergency calls and extends the life of your plumbing system." },
      { question: 'How quickly can you respond to a commercial emergency?', answer: "We prioritize commercial emergencies and offer same-day service across the Denver metro area. Call us and we'll dispatch a technician as quickly as possible to get your business back on track." },
    ],
    ctaTitle: 'Ready to keep your\nbusiness drains clear?',
    ctaScript: 'Reliable commercial drain cleaning for Denver businesses',
    ctaImage: '/photos/services/1758789667762-56175fe4601c.jpg',
  },
]

const whyUs = [
  { icon: Heart, title: 'Family Owned', description: 'Built on trust, integrity, and genuine care for our neighbors.' },
  { icon: Lightning, title: 'Fast Response', description: "Drain emergencies don't wait, and neither should you." },
  { icon: CurrencyDollar, title: 'Honest Pricing', description: 'Transparent quotes with clear approval before work starts.' },
  { icon: Star, title: '5-Star Rated', description: "5.0 on Yelp. BBB 'A' rated. Our reputation speaks for itself." },
  { icon: SealCheck, title: 'Licensed & Insured', description: 'Fully licensed and insured for your peace of mind.' },
  { icon: MapPin, title: 'Denver Local', description: 'Local expertise means faster, smarter solutions.' },
]

function getService(slug: string) {
  return servicePages.find((page) => page.slug === slug)
}

export const Route = createFileRoute('/services_/$slug')({
  head: ({ params }) => {
    const service = getService(params.slug)
    const title = service ? `${service.name} - ${BUSINESS_NAME}` : `Service - ${BUSINESS_NAME}`
    const description = service
      ? `${service.name} from Great Bunny LLC for Denver metro homes and businesses, with clear quotes, same-day scheduling, and professional drain equipment.`
      : 'Great Bunny LLC drain cleaning service page.'
    const url = service ? `${SITE}/services/${service.slug}` : `${SITE}/services`
    return {
      meta: [
        ...seo({ title, description }),
        { property: 'og:url', content: url },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: ServiceDetailPage,
})

function ServiceDetailPage() {
  const { slug } = Route.useParams()
  const service = getService(slug)
  if (!service) throw notFound()

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.name,
    provider: { '@id': `${SITE}/#org`, name: BUSINESS_NAME },
    areaServed: ['Denver', 'Lakewood', 'Arvada', 'Boulder'],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE}/services/${service.slug}#faq`,
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <main id="main" className={styles.page}>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className={styles.section} aria-labelledby="service-title">
        <div className={`${styles.container} ${styles.split}`}>
          <LandingReveal className={styles.heroImage}>
            <img src={service.heroImage} alt={`${service.name} work scene`} />
          </LandingReveal>
          <LandingReveal className={styles.stack}>
            <h1 id="service-title" className={styles.title}>
              {service.title[0]}<br />{service.title[1]} <span className={styles.script}>{service.title[2]}</span>
            </h1>
            <p className={styles.body}>{service.description}</p>
            <div className={styles.actions}>
              <a className={styles.button} href={TEL_HREF}>
                <Phone size={18} weight="regular" aria-hidden="true" />
                {SITE_CONFIG.phone.display}
              </a>
              <Link className={styles.buttonOutline} to="/free-quote">
                Schedule service
              </Link>
            </div>
          </LandingReveal>
        </div>
      </section>

      <section className={styles.page} aria-labelledby="overview-title">
        <div className={styles.rowBand}>
          <div className={styles.rowContent}>
            <h2 id="overview-title" className={styles.sectionTitle}>
              {service.overviewTitle[0]}<br /><span className={styles.script}>{service.overviewTitle[1]}</span>
            </h2>
            {service.overview.map((paragraph) => (
              <p className={styles.body} key={paragraph}>{paragraph}</p>
            ))}
            <div className={styles.stats}>
              {service.stats.map(([value, label]) => (
                <div className={styles.stat} key={label}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.wideImage}>
            <img src={service.overviewImage} alt={`${service.name} drain service overview`} />
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="issues-title">
        <LandingReveal className={`${styles.container} ${styles.centerStack}`}>
          <h2 id="issues-title" className={styles.sectionTitle}>{service.issuesTitle}</h2>
          <p className={styles.body}>{service.issuesSub}</p>
        </LandingReveal>
        <div className={`${styles.container} ${styles.grid4}`}>
          {service.issues.map((issue) => {
            const Icon = issue.icon
            return (
              <LandingReveal className={styles.card} key={issue.title}>
                <span className={styles.iconBox} aria-hidden="true">
                  <Icon size={22} weight="regular" />
                </span>
                <h3 className={styles.h3}>{issue.title}</h3>
                <p className={styles.muted}>{issue.description}</p>
              </LandingReveal>
            )
          })}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="process-title">
        <div className={`${styles.container} ${styles.centerStack}`}>
          <h2 id="process-title" className={styles.sectionTitle}>{service.processTitle}</h2>
          <div className={styles.grid4}>
            {service.process.map(([title, description], index) => (
              <LandingReveal className={styles.card} key={title}>
                <span className={styles.legalNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.h3}>{title}</h3>
                <p className={styles.muted}>{description}</p>
              </LandingReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.page} aria-label="Warning signs">
        <div className={styles.rowBand}>
          <div className={styles.wideImage}>
            <img src={service.signsOne.image} alt={`${service.name} warning sign`} />
          </div>
          <SignsContent
            title={<>{service.signsOne.title[0]} <span className={styles.script}>{service.signsOne.title[1]}</span></>}
            description={service.signsOne.description}
            items={service.signsOne.items}
          />
        </div>
        <div className={styles.rowBand}>
          <SignsContent
            title={service.signsTwo.title.split('\n').map((part, index) => (
              <span key={part}>{part}{index === 0 ? <br /> : null}</span>
            ))}
            description={service.signsTwo.description}
            items={service.signsTwo.items}
          />
          <div className={styles.wideImage}>
            <img src={service.signsTwo.image} alt={`${service.name} professional drain service`} />
          </div>
        </div>
      </section>

      <section className={styles.page} aria-labelledby="why-title">
        <div className={`${styles.rowBand} ${styles.whyBand}`}>
          <div className={styles.wideImage}>
            <img src={service.whyImage} alt="Great Bunny professional drain cleaning equipment" />
          </div>
          <div className={styles.rowContent}>
            <h2 id="why-title" className={styles.sectionTitle}>
              Why choose<br />Great Bunny
            </h2>
            <div className={`${styles.smallStack} ${styles.whyRows}`}>
              {whyUs.map((item) => {
                const Icon = item.icon
                return (
                  <div className={styles.lineCard} key={item.title}>
                    <div className={styles.actions}>
                      <span className={styles.iconBox} aria-hidden="true">
                        <Icon size={22} weight="regular" />
                      </span>
                      <span className={styles.smallStack}>
                        <strong>{item.title}</strong>
                        <span className={styles.muted}>{item.description}</span>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="service-faq-title">
        <div className={`${styles.container} ${styles.narrowSplit}`}>
          <LandingReveal className={styles.stack}>
            <h2 id="service-faq-title" className={styles.sectionTitle}>
              Frequently<br />asked<br />questions
            </h2>
            <p className={styles.body}>{service.faqSub}</p>
            <a className={styles.button} href={TEL_HREF}>
              <Phone size={16} weight="regular" aria-hidden="true" />
              Call now
            </a>
          </LandingReveal>
          <LandingReveal>
            <LandingFaqAccordion
              items={service.faqs.map((faq, index) => ({
                id: `service-faq-${index + 1}`,
                number: String(index + 1).padStart(2, '0'),
                question: faq.question,
                answer: faq.answer,
              }))}
            />
          </LandingReveal>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark} ${styles.compact}`} aria-labelledby="service-cta-title">
        <div className={`${styles.container} ${styles.split}`}>
          <LandingReveal className={styles.stack}>
            <h2 id="service-cta-title" className={styles.sectionTitle}>
              {service.ctaTitle.split('\n').map((part, index) => (
                <span key={part}>{part}{index === 0 ? <br /> : null}</span>
              ))}
            </h2>
            <p className={styles.script}>{service.ctaScript}</p>
            <div className={styles.actions}>
              <Link className={styles.buttonLight} to="/free-quote">
                Book service
              </Link>
              <a className={styles.buttonOutline} href={TEL_HREF}>{SITE_CONFIG.phone.display}</a>
            </div>
          </LandingReveal>
          <LandingReveal className={styles.heroImage}>
            <img src={service.ctaImage} alt={`${service.name} service call`} />
          </LandingReveal>
        </div>
      </section>
    </main>
  )
}

function SignsContent({
  title,
  description,
  items,
}: {
  title: React.ReactNode
  description: string
  items: string[]
}) {
  return (
    <div className={styles.rowContent}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.body}>{description}</p>
      <ul className={styles.checkList}>
        {items.map((item) => (
          <li className={styles.checkItem} key={item}>
            <CheckCircle size={16} weight="regular" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
