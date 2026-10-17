/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import * as React from 'react'
import { SableSiteProvider } from '@asksable/site-connector'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { Navbar } from '~/components/sections/Navbar'
import { Footer } from '~/components/sections/Footer'
import { CookieBanner, ENABLE_COOKIE_CONSENT } from '~/components/shared/CookieBanner'
import { FloatingCallButton } from '~/components/shared/FloatingCallButton'
import { useLocale } from '~/i18n/locale'
import { getSableSiteConfig } from '~/lib/sable'
import globalsCss from '~/styles/globals.css?url'
import '@asksable/site-connector/styles.css'
import { seo } from '~/utils/seo'
import { useClickTracking } from '~/utils/analytics'
import { BUSINESS_NAME, SITE, SITE_HOSTNAME, SITE_CONFIG } from '~/config/site'

// Cookie-based analytics (GA4 + GTM) with Google Consent Mode. OFF BY DEFAULT -
// the whole block below is gated behind ENABLE_COOKIE_CONSENT. Sable sites ship
// with no analytics by default and need no consent layer. If a
// client genuinely needs GA4/GTM, set ENABLE_COOKIE_CONSENT = true (in
// CookieBanner.tsx) AND replace these CLIENT_ID ids with that client's own -
// never ship someone else's analytics property.
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'
const GTM_CONTAINER_ID = 'GTM-XXXXXXX'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { name: 'theme-color', content: '#ffffff' },
      // Preview deploys (pages.dev) never get indexed; drops out automatically
      // once the build points at the production domain.
      ...(SITE.includes('.pages.dev') ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
      ...seo({
        title: `${BUSINESS_NAME} | Drain Cleaning in Denver, Lakewood, Arvada & Boulder`,
        description:
          'Professional drain cleaning and snaking for homes and businesses across the Denver metro. Fast response, honest pricing, and a 5.0 rating on Yelp. Call (720) 555-0186.',
        image: `${SITE}/brand/og-image.png`,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: globalsCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      // Dark-mode tab icon: the self-contained dark app mark stays visible on
      // dark browser chrome.
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Derive the document language from the URL so /es/* reports Spanish.
  const locale = useLocale()
  // Sable site-connector config. null until a client is provisioned (blank API
  // URL / slug), so the provider is skipped and the shell runs standalone. When
  // configured, it powers booking, contact submission, and cookieless analytics;
  // the custom QuoteWizard submits through this connection.
  const sableConfig = getSableSiteConfig(locale)
  // The quote flow is a full-screen app takeover; hide the global chrome
  // (navbar, footer, floating call button, cookie banner) so nothing overlaps it.
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isAppFlow = pathname === '/free-quote'
  // Track quote-CTA, WhatsApp, and email clicks site-wide (GA4). Phone taps are
  // handled by the existing call_click tag.
  useClickTracking()

  // The app chrome + page content. Wrapped in SableSiteProvider below when a
  // Sable site is configured; rendered bare otherwise.
  const appContent = (
    <>
      <div id="app">
        {!isAppFlow && <Navbar />}
        {children}
        {!isAppFlow && <Footer />}
      </div>
      {!isAppFlow && <FloatingCallButton />}
      {!isAppFlow && ENABLE_COOKIE_CONSENT && <CookieBanner />}
    </>
  )

  return (
    <html lang={locale}>
      <head>
        <HeadContent />
        {import.meta.env.PROD && ENABLE_COOKIE_CONSENT && (
          <>
            {/* Consent Mode v2, set BEFORE GTM/GA load. Analytics + ads default
                to denied; the cookie banner flips them to granted on Accept.
                A returning visitor who already accepted is upgraded inline so
                their session is measured from the first pageview. */}
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});try{if(localStorage.getItem('cookie-consent')==='accepted'){gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}}catch(e){}`,
              }}
            />
            {/* Google Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                __html: `if(location.hostname.endsWith('${SITE_HOSTNAME}')){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');}`,
              }}
            />
            {/* GA4 (gtag) */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());if(location.hostname.endsWith('${SITE_HOSTNAME}')){gtag('config','${GA_MEASUREMENT_ID}');}`,
              }}
            />
          </>
        )}
      </head>
      <body>
        {import.meta.env.PROD && ENABLE_COOKIE_CONSENT && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {sableConfig ? (
          <SableSiteProvider
            config={sableConfig}
            fallbackProfile={{
              businessName: SITE_CONFIG.name,
              phone: SITE_CONFIG.phone.display,
              email: SITE_CONFIG.email,
              address: SITE_CONFIG.address.display,
            }}
          >
            {appContent}
          </SableSiteProvider>
        ) : (
          appContent
        )}
        <Scripts />
      </body>
    </html>
  )
}
