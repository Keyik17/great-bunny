import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '~/components/sections/LegalLayout'
import { seo } from '~/utils/seo'
import { BUSINESS_NAME, SITE, SITE_CONFIG, SITE_HOSTNAME, TEL_HREF } from '~/config/site'

const URL = `${SITE}/legal/cookie-policy`

export const Route = createFileRoute('/legal/cookie-policy')({
  head: () => ({
    meta: [
      ...seo({
        title: `Cookie Policy - ${BUSINESS_NAME}`,
        description:
          `What cookies ${SITE_HOSTNAME} uses, why, and how to opt out.`,
      }),
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: URL },
    ],
    links: [
      { rel: 'canonical', href: URL },
      { rel: 'alternate', hrefLang: 'en', href: `${SITE}/legal/cookie-policy` },
      { rel: 'alternate', hrefLang: 'x-default', href: `${SITE}/legal/cookie-policy` },
    ],
  }),
  component: CookiePolicy,
})

function CookiePolicy() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Cookie Policy"
      lastUpdated="May 27, 2026"
    >
      <section>
        <p>
          This Cookie Policy explains how {BUSINESS_NAME} uses cookies and
          similar technologies on {SITE_HOSTNAME} (the &ldquo;Site&rdquo;).
          Read this alongside our{' '}
          <a href="/legal/privacy-policy">Privacy Policy</a>, which describes
          how we handle the data those cookies help collect.
        </p>
      </section>

      <section>
        <h2>1. What is a cookie?</h2>
        <p>
          A cookie is a small text file that a website saves on your device
          when you visit. It helps the site remember things about your visit,
          such as your preferences or whether you have been here before.
          Similar technologies, like local storage or pixel tags, work in
          comparable ways.
        </p>
      </section>

      <section>
        <h2>2. The cookies we use</h2>
        <h3>Strictly necessary</h3>
        <p>
          These cookies make the Site work. They cannot be switched off.
          Examples include the cookie that remembers your language preference
          and the cookie that remembers your cookie consent choice itself.
        </p>
        <h3>Analytics</h3>
        <p>
          These cookies help us understand how visitors use the Site, which
          pages perform well, and where things can be improved. The data is
          aggregated, not used to identify you individually. You can decline
          these from the consent banner.
        </p>
        <h3>What we do not use</h3>
        <p>
          We do not use advertising cookies, social-media tracking pixels, or
          any third-party cookies that share your browsing behavior with
          advertisers.
        </p>
      </section>

      <section>
        <h2>3. Managing your choices</h2>
        <ul>
          <li>
            <strong>Consent banner.</strong> The first time you visit, a
            banner lets you accept or decline non-essential cookies. You can
            change your choice at any time by clearing your site data and
            reloading the page.
          </li>
          <li>
            <strong>Browser controls.</strong> All major browsers let you
            block or delete cookies through their settings. Doing so may
            break parts of the Site that depend on cookies to function.
          </li>
          <li>
            <strong>Do Not Track.</strong> We honor &ldquo;Do Not Track&rdquo;
            and Global Privacy Control (GPC) signals where technically
            possible by treating them as a decline of non-essential cookies.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Updates to this policy</h2>
        <p>
          We may update this Cookie Policy as our practices change. The
          &ldquo;Last updated&rdquo; date above reflects the latest version.
        </p>
      </section>

      <section>
        <h2>5. Contact</h2>
        <p>Questions about cookies on the Site can go to:</p>
        <address>
          {BUSINESS_NAME}<br />
          Email: <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
          <br />
          Phone: <a href={TEL_HREF}>{SITE_CONFIG.phone.display}</a>
        </address>
      </section>
    </LegalLayout>
  )
}
