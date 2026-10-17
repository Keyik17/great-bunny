// Defaults for the @asksable/site-connector integration.
//
// Left BLANK in the template on purpose: with no API URL + site slug, the
// connector stays dormant (hasSableSiteConfig() is false), so the shell builds
// and runs without a Sable workspace. To activate booking + contact + analytics
// through Sable, either set the VITE_SABLE_* env vars per deployment, or fill
// these defaults when provisioning a client site.
export const DEFAULT_SABLE_PUBLIC_API_URL = ''
export const DEFAULT_SABLE_SITE_SLUG = ''
export const DEFAULT_SABLE_TIMEZONE = 'America/Chicago'
