import { BUSINESS_NAME, SITE } from '~/config/site'
/** Site-wide default share image. Pages can override by passing `image`. */
const DEFAULT_OG_IMAGE = `${SITE}/brand/og-image.png`

export const seo = ({
  title,
  description,
  keywords,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
}) => {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    // Twitter Cards use name=
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    // Open Graph requires property= (not name=). Strict validators and
    // scrapers key off property, so emit it correctly here.
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: BUSINESS_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { property: 'og:image', content: image },
          { property: 'og:image:secure_url', content: image },
          { property: 'og:image:type', content: 'image/png' },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          { property: 'og:image:alt', content: title },
        ]
      : []),
  ]

  return tags
}
