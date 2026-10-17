# Great Bunny

Website and quote flow for Great Bunny, a family-owned drain cleaning company serving the Denver metro.

Live: [great-bunny.pages.dev](https://great-bunny.pages.dev)

## What's in it

- Landing page, service pages, location pages, about, FAQ, contact and legal pages
- A step-by-step quote wizard at `/free-quote`: service, timing, optional photos, contact details, review
- Contact and quote emails through Resend (optional, see `.env.example`)
- Business details live in `src/config/site.ts`, page copy in `src/content/copy.tsx`

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build:cf   # Cloudflare Pages build in dist/
npm run deploy     # build and deploy to Cloudflare Pages
```

Built with React, TanStack Start, Vite and Framer Motion.
