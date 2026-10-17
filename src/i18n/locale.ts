import { useRouterState } from '@tanstack/react-router'

export type Locale = 'en' | 'es'

/** True if a pathname lives under the Spanish (/es) tree. */
export function isEsPath(pathname: string): boolean {
  return pathname === '/es' || pathname.startsWith('/es/')
}

/** Current locale, derived from the URL. Anything under /es is Spanish. */
export function useLocale(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  return isEsPath(pathname) ? 'es' : 'en'
}

/**
 * Map a pathname to its counterpart in the target locale.
 *   en "/services/x" -> es "/es/services/x";  "/" -> "/es"
 *   es "/es/services/x" -> en "/services/x";   "/es" -> "/"
 * The English path is the canonical base; the Spanish path is just /es + base.
 */
export function toLocalePath(pathname: string, target: Locale): string {
  const base = isEsPath(pathname)
    ? pathname.replace(/^\/es(?=\/|$)/, '') || '/'
    : pathname
  if (target === 'en') return base
  return base === '/' ? '/es' : `/es${base}`
}

/**
 * Master switch for the Spanish (/es) experience. The bilingual plumbing
 * (toggle UI, locale helpers, the `es` prop threaded through components) is
 * kept intact so a customer site can turn Spanish back on, but the baseline
 * ships English-only. Flip to true and restore the /es routes + .es data to
 * re-enable.
 */
export const ENABLE_ES = false
