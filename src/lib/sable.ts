import type { Locale, SableSiteConfig } from '@asksable/site-connector'
import {
  DEFAULT_SABLE_PUBLIC_API_URL,
  DEFAULT_SABLE_SITE_SLUG,
  DEFAULT_SABLE_TIMEZONE,
} from '~/config/sable'

const env = (import.meta as ImportMeta & {
  env?: Record<string, string | undefined>
}).env

export const SABLE_PUBLIC_API_URL =
  env?.VITE_SABLE_PUBLIC_API_URL?.trim().replace(/\/+$/, '') ||
  DEFAULT_SABLE_PUBLIC_API_URL

export const SABLE_SITE_SLUG =
  env?.VITE_SABLE_SITE_SLUG?.trim() || DEFAULT_SABLE_SITE_SLUG
export const SABLE_TIMEZONE =
  env?.VITE_SABLE_TIMEZONE?.trim() || DEFAULT_SABLE_TIMEZONE

export function hasSableSiteConfig() {
  return SABLE_PUBLIC_API_URL.length > 0 && SABLE_SITE_SLUG.length > 0
}

export function getSableSiteConfig(
  language: Locale = 'en',
): SableSiteConfig | null {
  if (!hasSableSiteConfig()) return null
  return {
    apiUrl: SABLE_PUBLIC_API_URL,
    siteSlug: SABLE_SITE_SLUG,
    timezone: SABLE_TIMEZONE,
    language,
  }
}
