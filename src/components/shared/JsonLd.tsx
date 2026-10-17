/**
 * Renders a single JSON-LD block as a body <script>.
 *
 * Why body and not the route's head().scripts: TanStack Start re-injects
 * head() scripts on hydration without de-duping, so every JSON-LD block ends
 * up doubled in <head> (Google Search Console flags this as "Duplicate field
 * FAQPage"). A script rendered in the component tree hydrates like any other
 * element, so it appears exactly once. Search engines read JSON-LD from
 * anywhere in the document, so body placement is fully valid.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; it has no closing-tag sequences.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
