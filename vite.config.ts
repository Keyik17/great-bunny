import mdx from '@mdx-js/rollup'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  server: {
    port: 3000,
    allowedHosts: ['.trycloudflare.com'],
  },
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    // Node 26 refuses the connector's JSON imports (no `with { type: 'json' }`)
    // when the package is externalized in dev SSR; bundling it sidesteps that.
    noExternal: ['@asksable/site-connector'],
  },
  plugins: [
    // MDX must run before the React plugin so its compiled JSX is transformed.
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          // Exposes the YAML frontmatter as a named `frontmatter` export.
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
          remarkGfm,
        ],
      }),
    },
    tanstackStart({
      srcDirectory: 'src',
    }),
    viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    nitro({
      // SEO retention: retired WordPress URLs 301 at the server so they work
      // on every host (the CF worker intercepts before static _redirects).
      routeRules: {
        '/about-contact': { redirect: { to: '/about/', status: 301 } },
        '/about-contact/': { redirect: { to: '/about/', status: 301 } },
        '/polies-privacy-cookies-terms-conditions': { redirect: { to: '/legal/privacy-policy', status: 301 } },
        '/polies-privacy-cookies-terms-conditions/': { redirect: { to: '/legal/privacy-policy', status: 301 } },
        '/author/greatbunny-com': { redirect: { to: '/about/', status: 301 } },
        '/author/greatbunny-com/': { redirect: { to: '/about/', status: 301 } },
        // Security headers on every response. Cloudflare's _headers file only
        // covers static assets, never SSR HTML, so these must come from the
        // server. HSTS deliberately omits includeSubDomains (client domains
        // may have unrelated legacy subdomains).
        '/**': {
          headers: {
            'Strict-Transport-Security': 'max-age=31536000',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'SAMEORIGIN',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          },
        },
      },
    }),
  ],
})
