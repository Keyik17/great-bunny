/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE COPY, every block's wording, lifted out of the components.
 *
 * New customer setup, step 2 of the runbook (see README): rewrite the copy in
 * this file for the customer's trade and tone of voice. Components import
 * their block's copy from here, so no component file needs editing to retone
 * the site. Each export is keyed `en` / `es`, the `es` side is dormant until
 * ENABLE_ES is turned on (see ~/i18n/locale).
 *
 * Business identity (name, phone, email, address) is NOT written here, it is
 * interpolated from ~/config/site, so editing the config updates the copy.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { GradientText } from '~/components/shared/GradientText'
import { BUSINESS_NAME, SITE_CONFIG } from '~/config/site'

/* ─── AboutStory ────────────────────────────────────────────── */
export const ABOUT_STORY_COPY = {
  en: {
    eyebrow: 'Section label',
    titleLead: 'Drain Cleaning',
    titleGradient: 'Goes Here',
    alt: 'Great Bunny service image',
    paragraphs: [
      `Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ${BUSINESS_NAME}. Ut enim ad minim veniam, quis nostrud exercitation.`,
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit.',
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    ],
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    titleLead: 'Tu titular',
    titleGradient: 'aquí',
    alt: 'Great Bunny service image',
    paragraphs: [
      `Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ${BUSINESS_NAME}. Ut enim ad minim veniam, quis nostrud exercitation.`,
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit.',
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    ],
  },
}

/* ─── AboutTeam ─────────────────────────────────────────────── */
export const ABOUT_TEAM_COPY = {
  en: {
    eyebrow: 'Section label',
    titleLead: 'Drain Cleaning',
    titleGradient: `Goes Here ${BUSINESS_NAME}`,
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    titleLead: 'Tu titular',
    titleGradient: `aquí ${BUSINESS_NAME}`,
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  },
}

/* ─── ArticleLayout ─────────────────────────────────────────── */
export const ARTICLE_LAYOUT_COPY = {
  en: {
    back: 'All articles',
    related: 'Keep reading',
    relatedTitle: 'More from the blog',
    writtenBy: 'Written by',
    authorRole: `Co-owner, ${BUSINESS_NAME}`,
    authorBlurb: 'Great Bunny dolor sit amet, consectetur adipiscing elit sed do eiusmod.',
    authorLink: 'Meet the team',
  },
  es: {
    back: 'Todos los artículos',
    related: 'Sigue leyendo',
    relatedTitle: 'Más del blog',
    writtenBy: 'Escrito por',
    authorRole: `Co-dueño, ${BUSINESS_NAME}`,
    authorBlurb: 'Great Bunny dolor sit amet, consectetur adipiscing elit sed do eiusmod.',
    authorLink: 'Conoce al equipo',
  },
}

/* ─── BlogIndex ─────────────────────────────────────────────── */
export const BLOG_INDEX_COPY = {
  en: { readMore: 'Read more' },
  es: { readMore: 'Leer más' },
}

/* ─── ContactSection ────────────────────────────────────────── */
export const CONTACT_VARIANT_COPY = {
  en: {
    quote: {
      eyebrow: 'Section label',
      titleLead: 'Drain Cleaning',
      titleGradient: 'Goes Here',
      body: 'Tell us what is backing up and where. We reply fast with a clear plan and an honest price.',
      service: 'Service needed',
      servicePlaceholder: 'Select a service (optional)',
      message: 'Tell us about the job',
      messagePlaceholder: 'Anything we should know…',
      submit: 'Send my request',
      required: 'Please fill in your name, phone, and a valid email.',
      successBody: 'We received your request and will reach out shortly.',
      nudgeText: 'Just have a general question?',
      nudgeLabel: 'Contact us',
    },
    general: {
      eyebrow: 'Contact us',
      titleLead: 'Questions? We’re',
      titleGradient: 'here to help',
      service: 'Service needed',
      servicePlaceholder: 'Select a service (optional)',
      message: 'Your message',
      messagePlaceholder: 'Ask us anything…',
      submit: 'Send message',
      body: 'Questions about a slow drain, a smell, or a strange sound in the pipes? Send a message and we will point you the right way.',
      required: 'Please add your name, phone, and a valid email.',
      successBody: 'We received your message and will get back to you shortly.',
      nudgeText: 'Looking for a price?',
      nudgeLabel: 'Get a free quote',
    },
  },
  es: {
    quote: {
      eyebrow: 'Etiqueta de sección',
      titleLead: 'Tu titular',
      titleGradient: 'aquí',
      body: 'Tell us what is backing up and where. We reply fast with a clear plan and an honest price.',
      service: 'Servicio que necesitas',
      servicePlaceholder: 'Elige un servicio (opcional)',
      message: 'Cuéntanos sobre el trabajo',
      messagePlaceholder: 'Lo que debamos saber…',
      submit: 'Enviar solicitud',
      required: 'Completa tu nombre, teléfono y un correo válido.',
      successBody: 'Recibimos tu solicitud y te contactaremos pronto.',
      nudgeText: '¿Solo tienes una pregunta general?',
      nudgeLabel: 'Contáctanos',
    },
    general: {
      eyebrow: 'Contáctanos',
      titleLead: '¿Preguntas? Estamos',
      titleGradient: 'para ayudarte',
      service: 'Servicio que necesitas',
      servicePlaceholder: 'Elige un servicio (opcional)',
      message: 'Tu mensaje',
      messagePlaceholder: 'Pregúntanos lo que sea…',
      submit: 'Enviar mensaje',
      body: 'Questions about a slow drain, a smell, or a strange sound in the pipes? Send a message and we will point you the right way.',
      required: 'Agrega tu nombre, teléfono y un correo válido.',
      successBody: 'Recibimos tu mensaje y te responderemos pronto.',
      nudgeText: '¿Buscas un precio?',
      nudgeLabel: 'Cotización gratis',
    },
  },
}

/* ─── Footer ────────────────────────────────────────────────── */
export const FOOTER_COPY = {
  en: {
    brandDescription:
      'Drain cleaning and snaking for homes and businesses across the Denver metro. Built on hard work, service, and trust.',
    newsletterHeading: 'Fast drain help',
    newsletterCadence: 'Unsubscribe anytime.',
    colSite: 'Site',
    colServices: 'Services',
    colLocations: 'Locations',
    colCompany: 'Company',
    colLegal: 'Legal',
    colReach: 'Reach us',
    home: 'Home',
    services: 'Services',
    locations: 'Locations',
    about: 'About',
    blog: 'Blog',
    faq: 'FAQ',
    contact: 'Contact Us',
    freeQuote: 'Free quote',
    sitemap: 'Sitemap',
    viewAll: 'View all',
    viewAllN: (n: number) => `View all ${n}`,
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    cookie: 'Cookie Policy',
    sameDay: 'Fast drain help',
    aiLabel: (
      <>
        Questions about<br />{BUSINESS_NAME}?
      </>
    ),
    rights: 'All rights reserved.',
    madeBy: 'Made By',
  },
  es: {
    brandDescription:
      'Drain cleaning and snaking for homes and businesses across the Denver metro. Built on hard work, service, and trust.',
    newsletterHeading: 'Subtítulo corto aquí.',
    newsletterCadence: 'Cancela cuando quieras.',
    colSite: 'Sitio',
    colServices: 'Servicios',
    colLocations: 'Ubicaciones',
    colCompany: 'Empresa',
    colLegal: 'Legal',
    colReach: 'Contáctanos',
    home: 'Inicio',
    services: 'Servicios',
    locations: 'Ubicaciones',
    about: 'Nosotros',
    blog: 'Blog',
    faq: 'Preguntas',
    contact: 'Contáctanos',
    freeQuote: 'Cotización gratis',
    sitemap: 'Mapa del sitio',
    viewAll: 'Ver todo',
    viewAllN: (n: number) => `Ver las ${n}`,
    privacy: 'Política de Privacidad',
    terms: 'Términos y Condiciones',
    cookie: 'Política de Cookies',
    sameDay: 'Subtítulo corto aquí',
    aiLabel: (
      <>
        ¿Preguntas sobre<br />{BUSINESS_NAME}?
      </>
    ),
    rights: 'Todos los derechos reservados.',
    madeBy: 'Hecho por',
  },
}

/* ─── HomeBlog ──────────────────────────────────────────────── */
export const HOME_BLOG_COPY = {
  en: {
    eyebrow: 'Section label',
    title: (
      <>
        Drain Cleaning
        <br />
        <GradientText>Goes Here</GradientText>
      </>
    ),
    seeAll: 'See all articles',
    readMore: 'Read more',
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    title: (
      <>
        Tu titular
        <br />
        <GradientText>aquí</GradientText>
      </>
    ),
    seeAll: 'Ver todos los artículos',
    readMore: 'Leer más',
  },
}

export type FAQItem = {
  id: string
  question: string
  answer: string
}

export const HOME_FAQ: FAQItem[] = [
  {
    id: 'dry-time',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
  },
  {
    id: 'kids-pets',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor.',
  },
  {
    id: 'pricing',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.',
  },
  {
    id: 'payment',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  },
  {
    id: 'frequency',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  },
  {
    id: 'pet-stains',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco.',
  },
  {
    id: 'same-day',
    question: 'What drain cleaning services do you offer?',
    answer:
      `Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ${SITE_CONFIG.phone.display} incididunt ut labore et dolore magna aliqua.`,
  },
  {
    id: 'method-vs',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit.',
  },
]

/** Spanish version of HOME_FAQ (same ids), for the /es homepage + its JSON-LD. */
export const HOME_FAQ_ES: FAQItem[] = [
  {
    id: 'dry-time',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
  },
  {
    id: 'kids-pets',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor.',
  },
  {
    id: 'pricing',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.',
  },
  {
    id: 'payment',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  },
  {
    id: 'frequency',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  },
  {
    id: 'pet-stains',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco.',
  },
  {
    id: 'same-day',
    question: 'What drain cleaning services do you offer?',
    answer:
      `Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ${SITE_CONFIG.phone.display} incididunt ut labore et dolore magna aliqua.`,
  },
  {
    id: 'method-vs',
    question: 'What drain cleaning services do you offer?',
    answer:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit.',
  },
]

/* ─── HomeFaq ───────────────────────────────────────────────── */
export const HOME_FAQ_COPY = {
  en: {
    eyebrow: 'Section label',
    titleLead: 'Drain Cleaning',
    titleGradient: 'Goes Here',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    items: HOME_FAQ,
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    titleLead: 'Tu titular',
    titleGradient: 'aquí',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    items: HOME_FAQ_ES,
  },
}

/* ─── HomeHero ──────────────────────────────────────────────── */
export const HOME_HERO_COPY = {
  en: {
    titleLead: 'Drain cleaning goes here ',
    titleAccent: 'with an accent',
    subhead:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    viewServices: 'View our Services',
  },
  es: {
    titleLead: 'Tu titular aquí ',
    titleAccent: 'con un acento',
    subhead:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    viewServices: 'Ver nuestros servicios',
  },
}

export const LANDING_COPY = {
  hero: {
    eyebrow: '5.0 on Yelp · Family owned · Licensed and insured',
    titleLead: "Denver's Most",
    titleAccent: 'Trusted',
    titleRest: 'Professional Drain Care',
    subhead:
      'Fast, friendly, and reliable drain cleaning solutions for Denver metro homes and businesses.',
    phone: SITE_CONFIG.phone.display,
    schedule: 'Schedule Service',
  },
  services: {
    title: 'Our Services',
    subhead: 'Professional drain cleaning solutions for every situation',
    learnMore: 'Learn more',
    items: [
      {
        slug: 'emergency-drain-cleaning',
        title: 'Emergency Drain Cleaning',
        description:
          'Rapid response for urgent clogs, sewer backups, and overflowing drains. After-hours and weekend emergency service available across the Denver metro.',
        image: '/photos/landing/service-emergency-plumber.jpg',
        alt: 'Plumber working under a sink during emergency drain service',
      },
      {
        slug: 'sewer-drain-cleaning',
        title: 'Sewer Drain Cleaning',
        description:
          'Professional sewer line clearing using advanced equipment to remove roots, grease, and stubborn blockages from your main line.',
        image: '/photos/landing/service-sewer-bathtub.jpg',
        alt: 'Plumber clearing a bathtub drain line',
      },
      {
        slug: 'residential-drain-cleaning',
        title: 'Residential Drain Cleaning',
        description:
          'Kitchen sinks, bathroom drains, and main lines keep your home flowing smoothly and clog-free, every time.',
        image: '/photos/landing/service-residential-kitchen-sink.jpg',
        alt: 'Residential kitchen sink and faucet',
      },
      {
        slug: 'commercial-drain-cleaning',
        title: 'Commercial Drain Cleaning',
        description:
          'Minimize downtime for your business with reliable commercial drain maintenance, emergency response, and preventative care.',
        image: '/photos/landing/service-commercial-building.jpg',
        alt: 'Commercial building exterior',
      },
    ],
  },
  process: {
    title: 'How We Work',
    subhead: 'Three simple steps to clear drains and peace of mind',
    steps: [
      {
        number: '01',
        title: 'Call & Describe',
        description:
          "Give us a call and tell us about your drain problem. We'll ask a few questions and schedule a visit.",
      },
      {
        number: '02',
        title: 'We Arrive & Diagnose',
        description:
          "Our technician arrives fast, inspects the issue, and explains exactly what's going on.",
      },
      {
        number: '03',
        title: 'Problem Solved',
        description:
          "We clear the clog and get your drains flowing again. You only pay for what's needed with honest pricing.",
      },
    ],
  },
  why: {
    titleLine1: 'Why Choose',
    titleLine2: 'Great Bunny',
    image: '/photos/landing/whyus-marcus-portrait.png',
    alt: 'Marco Reyes, owner of Great Bunny',
    cta: 'Learn more about us',
    items: [
      {
        title: 'Family Owned',
        description: 'Built on trust, integrity, and genuine care for our neighbors.',
      },
      {
        title: 'Fast Response',
        description: 'Drain emergencies should not wait, and neither should you.',
      },
      {
        title: 'Honest Pricing',
        description: 'Transparent quotes with hidden fees removed. You approve first.',
      },
      {
        title: '5-Star Rated',
        description: "5.0 on Yelp. BBB 'A' rated. Our reputation speaks for itself.",
      },
      {
        title: 'Licensed & Insured',
        description: 'Fully licensed and insured for your peace of mind.',
      },
      {
        title: 'Denver Local',
        description: 'Local expertise means faster, smarter solutions.',
      },
    ],
  },
  testimonials: {
    title: 'What Our Customers Say',
    rating: '5.0 on Yelp',
    reviews: [
      {
        quote:
          "We called Great Bunny to come snake our pipes by our washer, thanks to them we figured out what the problem and a solution. It's really awesome to find good local businesses out there who are trying to do right by others. Would definitely call these guys if I needed them again.",
        author: 'Sophia I.',
        city: 'Olde Town Arvada, Arvada, CO',
        date: 'Dec 17, 2025',
      },
      {
        quote:
          'Marco was quick to respond and show up. He unclogged our drain very quickly and did a great job! Would absolutely recommend him and utilize his services again in the future.',
        author: 'Paul V.',
        city: 'Boulder, CO',
        date: 'Jul 5, 2025',
      },
      {
        quote:
          "Back again to write another 5 star review... My mom's house needed some drains cleaned this time and of course we called great bunny after the wonderful service we had last time- They even gave us a returning customer discount because we mentioned the discount code thats on their website! What a way to make customers feel appreciated. Anyways, the sinks were draining slow and water was pooling. After Marco came by they're draining perfectly. Enough said. Great Bunny is a great business. Thank you Marco!",
        author: 'Lexie R.',
        city: 'La Cienega, NM',
        date: 'Aug 23, 2025',
      },
    ],
  },
  serviceAreas: {
    slides: [
      {
        city: 'Denver',
        description:
          "Our home base. Fast response times across all Denver neighborhoods. From Capitol Hill to Park Hill, we've got you covered.",
        responseTime: 'Under 2 hours',
        services: 'All drain & sewer',
        coverage: 'All neighborhoods',
        image: '/photos/landing/service-area-denver-skyline.jpg',
        imageAlt: 'Denver skyline at warm evening light',
        label: 'Denver, CO',
      },
      {
        city: 'Lakewood',
        description:
          'Reliable drain cleaning for Lakewood homes and businesses. Quick service across Green Mountain, Belmar, and beyond.',
        responseTime: 'Under 2 hours',
        services: 'All drain & sewer',
        coverage: 'Green Mountain, Belmar +',
        image: '/photos/locations/area-lakewood.jpg',
        imageAlt: 'Lakewood area landscape',
        label: 'Lakewood, CO',
      },
      {
        city: 'Arvada',
        description:
          "Serving Arvada with same-day drain solutions. From Olde Town to Ralston Valley, we're just a call away.",
        responseTime: 'Same day',
        services: 'All drain & sewer',
        coverage: 'Olde Town, Ralston +',
        image: '/photos/locations/area-arvada.jpg',
        imageAlt: 'Arvada area foothills',
        label: 'Arvada, CO',
      },
      {
        city: 'Boulder',
        description:
          'Expert drain service extending to the Boulder area. From Pearl Street to University Hill, we handle it all.',
        responseTime: 'Same day',
        services: 'All drain & sewer',
        coverage: 'Pearl St, University Hill +',
        image: '/photos/locations/area-boulder.jpg',
        imageAlt: 'Boulder Flatirons landscape',
        label: 'Boulder, CO',
      },
    ],
    statLabels: {
      responseTime: 'Response Time',
      services: 'Services',
      coverage: 'Coverage',
    },
    cta: 'VIEW SERVICES',
  },
  faq: {
    title: (
      <>
        Frequently
        <br />
        Asked
        <br />
        Questions
      </>
    ),
    subhead: 'Everything you need to know about our drain cleaning services.',
    cta: 'Call Us Now',
    items: [
      {
        question: 'How quickly can you respond to a drain emergency?',
        answer:
          'We offer same-day and emergency service across the Denver metro area. In most cases, we can be at your door within 1-2 hours of your call.',
      },
      {
        question: 'What types of drains do you clean?',
        answer:
          "We handle kitchen sinks, bathroom drains, floor drains, main sewer lines, laundry lines, and commercial drains. If it's clogged, we can clear it.",
      },
      {
        question: 'How much does drain cleaning cost?',
        answer:
          'Pricing depends on the type and severity of the clog. We always provide an accurate, upfront quote before starting work. Returning customers can use the discount code on our website.',
      },
      {
        question: 'Do you offer any guarantees?',
        answer:
          "We stand behind our work and are committed to making sure you're satisfied with the results. Our BBB 'A' rating and 5.0 Yelp rating reflect our dedication to quality and reliable service.",
      },
      {
        question: 'Are you licensed and insured?',
        answer:
          "Absolutely. Great Bunny LLC is fully licensed, insured, and BBB 'A' rated. You can trust us in your home or business.",
      },
    ],
  },
  cta: {
    titleLine1: 'Ready to Get Your',
    titleLine2: 'Drains Flowing?',
    script: 'Fast, honest drain cleaning',
    phone: SITE_CONFIG.phone.display,
    schedule: 'Schedule Service',
    image: '/photos/landing/cta-work-van.jpg',
    alt: 'Technician working from a service van',
  },
} as const

/* ─── HomeInstagramFeed ─────────────────────────────────────── */
export const HOME_INSTAGRAM_COPY = {
  en: {
    eyebrow: 'Follow us on Instagram',
    titleLead: 'Drain Cleaning',
    titleGradient: 'Goes Here',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    cta: `Follow ${SITE_CONFIG.social.instagramHandle}`,
  },
  es: {
    eyebrow: 'Síguenos en Instagram',
    titleLead: 'Tu titular',
    titleGradient: 'aquí',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    cta: `Síguenos en ${SITE_CONFIG.social.instagramHandle}`,
  },
}

export type Step = {
  index: string
  meta: string
  title: string
  body: string
}

/* ─── HomeProcess ───────────────────────────────────────────── */
export const HOME_PROCESS_COPY = {
  en: {
    eyebrow: 'Section label',
    titleLead: 'Drain Cleaning ',
    titleGradient: 'Goes Here',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    cta: 'Start with a quote',
    steps: [
      {
        index: '01',
        meta: 'Step label',
        title: 'Step One',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      },
      {
        index: '02',
        meta: 'Step label',
        title: 'Step Two',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      },
      {
        index: '03',
        meta: 'Step label',
        title: 'Step Three',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
      {
        index: '04',
        meta: 'Step label',
        title: 'Step Four',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
    ] as Step[],
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    titleLead: 'Tu titular ',
    titleGradient: 'aquí',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    cta: 'Empieza con una cotización',
    steps: [
      {
        index: '01',
        meta: 'Etiqueta',
        title: 'Paso Uno',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      },
      {
        index: '02',
        meta: 'Etiqueta',
        title: 'Paso Dos',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      },
      {
        index: '03',
        meta: 'Etiqueta',
        title: 'Paso Tres',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
      {
        index: '04',
        meta: 'Etiqueta',
        title: 'Paso Cuatro',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
    ] as Step[],
  },
}

/* ─── HomeServiceArea ───────────────────────────────────────── */
export const HOME_SERVICE_AREA_COPY = {
  en: {
    eyebrow: 'Section label',
    titleLead: 'Drain Cleaning',
    titleGradient: 'Goes Here',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    county: (c: string) => `${c} County`,
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    titleLead: 'Tu titular',
    titleGradient: 'aquí',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    county: (c: string) => `Condado de ${c}`,
  },
}

/* ─── HomeServicesEditorial ─────────────────────────────────── */
export const HOME_SERVICES_EDITORIAL_COPY = {
  en: {
    eyebrow: 'Section label',
    title: (
      <>
        Drain Cleaning
        <br />
        <GradientText>Goes Here</GradientText>
      </>
    ),
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    title: (
      <>
        Tu titular
        <br />
        <GradientText>aquí</GradientText>
      </>
    ),
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
}

/* ─── HomeServicesGrid (library) ────────────────────────────── */
export const HOME_SERVICES_GRID_COPY = {
  en: {
    eyebrow: 'Section label',
    title: (
      <>
        Drain Cleaning{' '}
        <GradientText>Goes Here</GradientText>
      </>
    ),
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    cta: 'See every service',
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    title: (
      <>
        Tu titular{' '}
        <GradientText>aquí</GradientText>
      </>
    ),
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    cta: 'Ver todos los servicios',
  },
}

/* ─── HomeServicesShowcase (library) ────────────────────────── */
export const HOME_SERVICES_SHOWCASE_COPY = {
  en: {
    eyebrow: 'Section label',
    titleLine1: 'Drain cleaning.',
    titleLine2: 'Goes here.',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    flagshipKicker: 'Flagship',
    flagshipCta: 'Read the method',
    seeAll: 'See every service',
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    titleLine1: 'Tu titular.',
    titleLine2: 'Aquí.',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    flagshipKicker: 'Principal',
    flagshipCta: 'Conoce el método',
    seeAll: 'Ver todos los servicios',
  },
}

/* ─── HomeTestimonials ──────────────────────────────────────── */
export const HOME_TESTIMONIALS_COPY = {
  en: {
    eyebrow: 'Section label',
    titleLead: 'Drain Cleaning',
    titleGradient: 'Goes Here',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    ratingMeta: `on Google · ${SITE_CONFIG.rating.count} reviews`,
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    titleLead: 'Tu titular',
    titleGradient: 'aquí',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    ratingMeta: `en Google · ${SITE_CONFIG.rating.count} reseñas`,
  },
}

/* ─── HomeTrustStrip ────────────────────────────────────────── */
export const HOME_TRUST_STRIP_COPY = {
  en: {
    titleLead: 'Drain Cleaning',
    titleGradient: 'Goes Here',
    /** CLIENT_ID captions: only list awards the customer has actually earned. */
    captions: [
      { recognition: 'Award or recognition', sub: 'Source, year' },
      { recognition: 'Award or recognition', sub: 'Source, year' },
      { recognition: 'Award or recognition', sub: 'Source, year' },
    ],
  },
  es: {
    titleLead: 'Tu titular',
    titleGradient: 'aquí',
    captions: [
      { recognition: 'Premio o reconocimiento', sub: 'Fuente, año' },
      { recognition: 'Premio o reconocimiento', sub: 'Fuente, año' },
      { recognition: 'Premio o reconocimiento', sub: 'Fuente, año' },
    ],
  },
}

/* ─── HomeWhyChoose ─────────────────────────────────────────── */
export const HOME_WHY_CHOOSE_COPY = {
  en: {
    eyebrow: `Why ${BUSINESS_NAME}`,
    titleLead: 'Drain Cleaning',
    titleGradient: 'Goes Here',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    reasons: [
      {
        title: 'Reason One',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      {
        title: 'Reason Two',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      {
        title: 'Reason Three',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      {
        title: 'Reason Four',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    ],
  },
  es: {
    eyebrow: `Por qué ${BUSINESS_NAME}`,
    titleLead: 'Tu titular',
    titleGradient: 'aquí',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    reasons: [
      {
        title: 'Razón Uno',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      {
        title: 'Razón Dos',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      {
        title: 'Razón Tres',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      {
        title: 'Razón Cuatro',
        body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    ],
  },
}

/* ─── HomeWhyChooseRow ──────────────────────────────────────── */
export const HOME_WHY_CHOOSE_ROW_COPY = {
  en: {
    eyebrow: `Why ${BUSINESS_NAME}`,
    titleLead: 'Drain Cleaning',
    titleGradient: 'Goes Here',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    labels: [
      'Stat\nLabel',
      'Stat\nLabel',
      'Stat\nLabel',
      'Stat\nLabel',
    ],
  },
  es: {
    eyebrow: `Por qué ${BUSINESS_NAME}`,
    titleLead: 'Tu titular',
    titleGradient: 'aquí',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    labels: [
      'Etiqueta\nde dato',
      'Etiqueta\nde dato',
      'Etiqueta\nde dato',
      'Etiqueta\nde dato',
    ],
  },
}

/* ─── LocationIntro ─────────────────────────────────────────── */
export const LOCATION_INTRO_COPY = {
  en: {
    neighborhoodsIn: (city: string) => `Neighborhoods we cover in ${city}`,
    zipsLabel: 'ZIP codes: ',
  },
  es: {
    neighborhoodsIn: (city: string) => `Vecindarios que cubrimos en ${city}`,
    zipsLabel: 'Códigos postales: ',
  },
}

/* ─── LocationsCatalog ──────────────────────────────────────── */
export const LOCATIONS_CATALOG_COPY = {
  en: {
    countyName: (id: string) => `${id} County`,
    /** Keyed by the county ids in ~/data/locations. */
    subtitles: {
      Your: 'Fast drain help',
      Second: 'Fast drain help',
    } as Record<string, string>,
  },
  es: {
    countyName: (id: string) => `Condado de ${id}`,
    subtitles: {
      Your: 'Subtítulo corto aquí',
      Second: 'Subtítulo corto aquí',
    } as Record<string, string>,
  },
}

/* ─── Navbar ────────────────────────────────────────────────── */
export const NAV_COPY = {
  en: {
    services: 'Services',
    locations: 'Locations',
    pricing: 'Pricing',
    about: 'About',
    blog: 'Blog',
    faq: 'FAQ',
    contact: 'Contact',
    getQuote: 'Get a free quote',
    call: `Call ${SITE_CONFIG.phone.display}`,
    language: 'Language',
    servicesEyebrow: 'Section label',
    servicesTitle: 'Drain cleaning goes here.',
    servicesBody:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    viewAllServices: (n: number) => `View all ${n} services`,
    locationsEyebrow: 'Section label',
    locationsTitle: 'Drain cleaning goes here.',
    locationsBody: (n: number) =>
      `Great Bunny dolor sit amet across ${n}+ cities and neighborhoods.`,
    seeAllLocations: (n: number) => `See all ${n} locations`,
    county: (c: string) => `${c} County`,
    back: 'Back',
    allServices: (n: number) => `All ${n} services`,
    allLocations: (n: number) => `All ${n} locations`,
  },
  es: {
    services: 'Servicios',
    locations: 'Ubicaciones',
    pricing: 'Precios',
    about: 'Nosotros',
    blog: 'Blog',
    faq: 'Preguntas',
    contact: 'Contacto',
    getQuote: 'Cotización gratis',
    call: `Llama al ${SITE_CONFIG.phone.display}`,
    language: 'Idioma',
    servicesEyebrow: 'Etiqueta de sección',
    servicesTitle: 'Tu titular aquí.',
    servicesBody:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    viewAllServices: (n: number) => `Ver los ${n} servicios`,
    locationsEyebrow: 'Etiqueta de sección',
    locationsTitle: 'Tu titular aquí.',
    locationsBody: (n: number) =>
      `Great Bunny dolor sit amet en más de ${n} ciudades y vecindarios.`,
    seeAllLocations: (n: number) => `Ver las ${n} ubicaciones`,
    county: (c: string) => `Condado de ${c}`,
    back: 'Atrás',
    allServices: (n: number) => `Los ${n} servicios`,
    allLocations: (n: number) => `Las ${n} ubicaciones`,
  },
}

/* ─── PricingPage ───────────────────────────────────────────── */
export const PRICING_COPY = {
  en: {
    eyebrow: 'Pricing',
    title: (
      <>
        Drain cleaning goes here in{' '}
        <GradientText>your area</GradientText>
      </>
    ),
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    servicesEyebrow: 'Section label',
    servicesTitle: (
      <>
        Drain Cleaning <GradientText>Goes Here</GradientText>
      </>
    ),
    servicesBody:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    factorLabel: 'What affects the price',
    quoteCta: 'Get a free quote',
    trust: `Rated ${SITE_CONFIG.rating.value} on Google with ${SITE_CONFIG.rating.count}+ reviews.`,
    faqEyebrow: 'Section label',
    faqTitle: (
      <>
        Drain Cleaning <GradientText>Goes Here</GradientText>
      </>
    ),
  },
  es: {
    eyebrow: 'Precios',
    title: (
      <>
        Tu titular aquí en{' '}
        <GradientText>tu zona</GradientText>
      </>
    ),
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    servicesEyebrow: 'Etiqueta de sección',
    servicesTitle: (
      <>
        Tu titular <GradientText>aquí</GradientText>
      </>
    ),
    servicesBody:
      'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    factorLabel: 'Qué afecta el precio',
    quoteCta: 'Cotización gratis',
    trust: `Calificación de ${SITE_CONFIG.rating.value} en Google con más de ${SITE_CONFIG.rating.count} reseñas.`,
    faqEyebrow: 'Etiqueta de sección',
    faqTitle: (
      <>
        Tu titular <GradientText>aquí</GradientText>
      </>
    ),
  },
}

/* ─── QuoteSent ─────────────────────────────────────────────── */
export const QUOTE_SENT_COPY = {
  en: {
    eyebrow: 'Request received',
    title: "You're all set.",
    body: 'We got your request. Marco or a teammate will reach out shortly to confirm the details and set a time.',
    home: 'Back to home',
  },
  es: {
    eyebrow: 'Solicitud recibida',
    title: 'Listo, lo recibimos.',
    body: 'We got your request. Marco or a teammate will reach out shortly to confirm the details and set a time.',
    home: 'Volver al inicio',
  },
}

/* ─── QuoteWizard ───────────────────────────────────────────── */
/** Photo cap for the quote wizard. The copy interpolates it, so it lives here. */
export const MAX_QUOTE_PHOTOS = 5

/**
 * Service options for the wizard's service-selection screen. Keys flow into the
 * lead email; images live in /public. Keep these in sync with ~/data/services
 * when retoning for a customer.
 */
export const QUOTE_SERVICE_TILES = [
  { key: 'emergency-drain-cleaning', image: '/photos/landing/service-emergency-plumber.jpg', en: 'Emergency Drain Cleaning', es: 'Emergency Drain Cleaning' },
  { key: 'sewer-drain-cleaning', image: '/photos/landing/service-sewer-bathtub.jpg', en: 'Sewer Drain Cleaning', es: 'Sewer Drain Cleaning' },
  { key: 'residential-drain-cleaning', image: '/photos/landing/service-residential-kitchen-sink.jpg', en: 'Residential Drain Cleaning', es: 'Residential Drain Cleaning' },
  { key: 'commercial-drain-cleaning', image: '/photos/landing/service-commercial-building.jpg', en: 'Commercial Drain Cleaning', es: 'Commercial Drain Cleaning' },
] as const

/**
 * Full quote-wizard copy, EN + ES. The consent sentences are 10DLC wording
 * (frequency disclosure + STOP/HELP). Edit with care: carriers vet this text.
 */
export const QUOTE_WIZARD_COPY = {
  en: {
    returnHome: 'Return home',
    sc: {
      details: {
        eyebrow: 'Almost there',
        title: 'How can we reach you?',
        sub: 'So we know who to send the price to. We text your quote shortly.',
      },
      services: {
        eyebrow: 'Getting started',
        title: 'What do you need help with?',
        sub: 'Pick the drain service that fits the job. You can choose more than one.',
      },
      timing: {
        eyebrow: 'Your timeline',
        title: 'How soon do you need us?',
        sub: 'This helps us line up the right crew and timing.',
      },
      photos: {
        eyebrow: 'Optional',
        title: 'Want to show us the problem?',
        sub: 'A few photos help us understand the drain issue before we arrive.',
      },
      review: {
        eyebrow: 'Almost done',
        title: 'Look good?',
        sub: 'A quick check before you send. Tap any line to jump back and change it.',
      },
    },
    firstName: 'First name',
    lastName: 'Last name',
    phone: 'Phone',
    email: 'Email',
    emailPh: 'you@email.com',
    propertyTypeLabel: 'Is this for a home or a business?',
    home: 'Home',
    business: 'Business',
    notesLabel: 'Anything we should know?',
    notesPh: 'Anything that helps us prepare.',
    promoToggle: 'Have a promo or referral code?',
    promoLabel: 'Promo or referral code',
    promoPh: 'Enter your code',
    urgency: {
      asap: { label: 'As soon as possible', hint: 'The earliest availability we have' },
      week: { label: 'This week', hint: 'We will find a slot that fits' },
      flexible: { label: "I'm flexible", hint: 'Whatever works best for the price' },
    },
    addPhotos: 'Add photos',
    photoHint: 'Tap to take a photo or choose from your gallery',
    photoCount: (n: number) => `${n} of ${MAX_QUOTE_PHOTOS} added`,
    rev: {
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      propertyType: 'Property',
      services: 'Services',
      howSoon: 'How soon',
      photos: 'Photos',
      details: 'Details',
      edit: 'Edit',
      notAdded: 'Not added',
      photosN: (n: number) => `${n} added`,
    },
    consent: {
      email:
        `I authorize ${BUSINESS_NAME} to email messages with offers and other information, possibly using automated technology, to the email address provided.`,
      sms:
        `I authorize ${BUSINESS_NAME} to send text messages with offers and other information, possibly using automated technology, to the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.`,
      privacy: 'Privacy Policy',
    },
    back: 'Back',
    next: 'Continue',
    skip: 'Skip for now',
    send: 'Send my request',
    sending: 'Sending…',
    errContact: 'Please add your name, phone, and a valid email so we can send your quote.',
    errPropertyType: 'Please let us know if this is for a home or a business.',
    errServices: 'Please pick at least one service so we can price it.',
    errTiming: 'Please let us know how soon you need us.',
    errGeneric: 'Something went wrong. Please call or text us instead.',
  },
  es: {
    returnHome: 'Volver al inicio',
    sc: {
      details: {
        eyebrow: 'Almost there',
        title: 'How can we reach you?',
        sub: 'So we know who to send the price to. We text your quote shortly.',
      },
      services: {
        eyebrow: 'Getting started',
        title: 'What do you need help with?',
        sub: 'Pick the drain service that fits the job. You can choose more than one.',
      },
      timing: {
        eyebrow: 'Your timeline',
        title: 'How soon do you need us?',
        sub: 'This helps us line up the right crew and timing.',
      },
      photos: {
        eyebrow: 'Optional',
        title: 'Want to show us the problem?',
        sub: 'A few photos help us understand the drain issue before we arrive.',
      },
      review: {
        eyebrow: 'Almost done',
        title: 'Look good?',
        sub: 'A quick check before you send. Tap any line to jump back and change it.',
      },
    },
    firstName: 'Nombre',
    lastName: 'Apellido',
    phone: 'Teléfono',
    email: 'Correo',
    emailPh: 'tu@correo.com',
    propertyTypeLabel: '¿Es para un hogar o un negocio?',
    home: 'Hogar',
    business: 'Negocio',
    notesLabel: '¿Algo que debamos saber?',
    notesPh: 'Lo que nos ayude a prepararnos.',
    promoToggle: '¿Tienes un código de promoción o referido?',
    promoLabel: 'Código de promoción o referido',
    promoPh: 'Escribe tu código',
    urgency: {
      asap: { label: 'Lo antes posible', hint: 'La disponibilidad más cercana que tengamos' },
      week: { label: 'Esta semana', hint: 'Encontramos un espacio que te funcione' },
      flexible: { label: 'Soy flexible', hint: 'Lo que sea mejor para el precio' },
    },
    addPhotos: 'Agrega fotos',
    photoHint: 'Toca para tomar una foto o elegir de tu galería',
    photoCount: (n: number) => `${n} de ${MAX_QUOTE_PHOTOS} agregadas`,
    rev: {
      name: 'Nombre',
      phone: 'Teléfono',
      email: 'Correo',
      propertyType: 'Propiedad',
      services: 'Servicios',
      howSoon: 'Qué tan pronto',
      photos: 'Fotos',
      details: 'Detalles',
      edit: 'Editar',
      notAdded: 'Sin agregar',
      photosN: (n: number) => `${n} agregadas`,
    },
    consent: {
      email:
        `Autorizo a ${BUSINESS_NAME} a enviarme correos con ofertas y otra información, posiblemente usando tecnología automatizada, a la dirección de correo proporcionada.`,
      sms:
        `Autorizo a ${BUSINESS_NAME} a enviarme mensajes de texto con ofertas y otra información, posiblemente usando tecnología automatizada, al número proporcionado. La frecuencia de mensajes varía. Pueden aplicar tarifas de mensajes y datos. Responde STOP para cancelar o HELP para ayuda.`,
      privacy: 'Política de privacidad',
    },
    back: 'Atrás',
    next: 'Continuar',
    skip: 'Saltar por ahora',
    send: 'Enviar mi solicitud',
    sending: 'Enviando…',
    errContact: 'Agrega tu nombre, teléfono y un correo válido para enviarte tu cotización.',
    errPropertyType: 'Indícanos si es para un hogar o un negocio.',
    errServices: 'Elige al menos un servicio para poder cotizarlo.',
    errTiming: 'Cuéntanos qué tan pronto nos necesitas.',
    errGeneric: 'Algo salió mal. Llámanos o escríbenos por mensaje.',
  },
}

/* ─── ServiceAbout ──────────────────────────────────────────── */
export const SERVICE_ABOUT_COPY = {
  en: {
    goodToKnow: 'Good to know',
    included: "What's included",
    area: 'Service area',
    about: 'About this service',
    perfectFor: 'Perfect for',
    whyChoose: 'Why choose us',
  },
  es: {
    goodToKnow: 'Bueno saber',
    included: 'Qué incluye',
    area: 'Área de servicio',
    about: 'Sobre este servicio',
    perfectFor: 'Ideal para',
    whyChoose: 'Por qué elegirnos',
  },
}

/* ─── ServiceTestimonials ───────────────────────────────────── */
export const SERVICE_TESTIMONIALS_COPY = {
  en: {
    eyebrow: 'Section label',
    titleLead: 'Drain Cleaning',
    titleGradient: 'Goes Here',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    ratingMeta: `on Google · ${SITE_CONFIG.rating.count} reviews`,
  },
  es: {
    eyebrow: 'Etiqueta de sección',
    titleLead: 'Tu titular',
    titleGradient: 'aquí',
    body: 'Great Bunny dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    ratingMeta: `en Google · ${SITE_CONFIG.rating.count} reseñas`,
  },
}

/* ─── SiteMap ───────────────────────────────────────────────── */
export const SITEMAP_COPY = {
  en: {
    eyebrow: 'Site map',
    title: 'Browse the whole site',
    intro:
      `Every page on the ${BUSINESS_NAME} site, in one place.`,
    main: 'Main pages',
    services: 'Services',
    areas: 'Service areas',
    articles: 'Articles',
    legal: 'Legal',
    pages: {
      home: 'Home',
      services: 'All services',
      pricing: 'Pricing',
      locations: 'All service areas',
      blog: 'Articles & guides',
      about: 'About us',
      faq: 'Frequently asked questions',
      contact: 'Contact us',
      quote: 'Get a free quote',
      privacy: 'Privacy policy',
      terms: 'Terms & conditions',
      cookies: 'Cookie policy',
    },
  },
  es: {
    eyebrow: 'Mapa del sitio',
    title: 'Explora todo el sitio',
    intro:
      `Every page on the ${BUSINESS_NAME} site, in one place.`,
    main: 'Páginas principales',
    services: 'Servicios',
    areas: 'Áreas de servicio',
    articles: 'Artículos',
    legal: 'Legal',
    pages: {
      home: 'Inicio',
      services: 'Todos los servicios',
      pricing: 'Precios',
      locations: 'Todas las áreas de servicio',
      blog: 'Artículos y guías',
      about: 'Sobre nosotros',
      faq: 'Preguntas frecuentes',
      contact: 'Contáctanos',
      quote: 'Pide una cotización gratis',
      privacy: 'Política de privacidad',
      terms: 'Términos y condiciones',
      cookies: 'Política de cookies',
    },
  },
}

/* ─── Unsubscribe ───────────────────────────────────────────── */
export const UNSUBSCRIBE_COPY = {
  en: {
    eyebrow: 'Email preferences',
    title: "You're unsubscribed.",
    body: `You will not receive any more marketing emails from ${BUSINESS_NAME}. You will still get replies and quotes you ask us for directly.`,
    titleNoEmail: 'Manage your emails',
    bodyNoEmail:
      'We could not read your address from this link. To unsubscribe, reply to any of our emails with the word unsubscribe and we will take care of it.',
    home: 'Back to home',
  },
  es: {
    eyebrow: 'Preferencias de correo',
    title: 'Listo, cancelaste la suscripción.',
    body: `No recibirás más correos promocionales de ${BUSINESS_NAME}. Seguirás recibiendo respuestas y cotizaciones que nos pidas directamente.`,
    titleNoEmail: 'Administra tus correos',
    bodyNoEmail:
      'No pudimos leer tu correo desde este enlace. Para cancelar la suscripción, responde a cualquiera de nuestros correos con la palabra cancelar y lo haremos por ti.',
    home: 'Volver al inicio',
  },
}

/* ─── Newsletter ────────────────────────────────────────────── */
export const NEWSLETTER_COPY = {
  en: {
    needEmail: 'Please enter your email.',
    invalidEmail: 'Please enter a valid email.',
    successTitle: "You're on the list.",
    successBody: 'to our monthly updates. You can unsubscribe from any email we send.',
    successPrefix: 'We added',
    submitting: 'Subscribing…',
    submit: 'Subscribe',
    networkError: 'Could not reach the signup service. Please try again.',
  },
  es: {
    needEmail: 'Ingresa tu correo.',
    invalidEmail: 'Ingresa un correo válido.',
    successTitle: 'Ya estás en la lista.',
    successBody:
      'a nuestras actualizaciones mensuales. Puedes cancelar la suscripción en cualquier correo que enviemos.',
    successPrefix: 'Agregamos',
    submitting: 'Suscribiendo…',
    submit: 'Suscribirse',
    networkError: 'No pudimos conectar con el servicio. Inténtalo de nuevo.',
  },
}

/* ─── NewsletterModal ───────────────────────────────────────── */
export const NEWSLETTER_MODAL_COPY = {
  en: {
    close: 'Close',
    successLead: "You're on the",
    successWord: 'list',
    successCopy:
      `Seasonal drain care tips and the occasional discount code. Welcome to ${BUSINESS_NAME}.`,
    done: 'Done',
    titleLead: 'Drain cleaning',
    titleWord: 'goes here',
    copy: 'One short email now and then with drain care tips and offers. Unsubscribe anytime.',
    emailLabel: 'Email address',
    joining: 'Joining…',
    submit: 'Subscribe',
    error: 'Something went wrong. Please try again.',
    fineprint: 'Unsubscribe anytime.',
  },
  es: {
    close: 'Cerrar',
    successLead: 'Ya estás en la',
    successWord: 'lista',
    successCopy:
      `Seasonal drain care tips and the occasional discount code. Welcome to ${BUSINESS_NAME}.`,
    done: 'Listo',
    titleLead: 'Tu titular',
    titleWord: 'aquí',
    copy: 'One short email now and then with drain care tips and offers. Unsubscribe anytime.',
    emailLabel: 'Correo electrónico',
    joining: 'Uniéndote…',
    submit: 'Suscribirse',
    error: 'Algo salió mal. Inténtalo de nuevo.',
    fineprint: 'Cancela cuando quieras.',
  },
}
