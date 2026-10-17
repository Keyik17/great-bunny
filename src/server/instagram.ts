import { createServerFn } from '@tanstack/react-start'

/**
 * Instagram feed, server-side handler.
 *
 * Fetches recent media for the configured business account from the Instagram API
 * and returns a trimmed, browser-safe shape. The access token is read from the
 * environment and never reaches the client.
 *
 * Required env var:
 *  - INSTAGRAM_TOKEN  (long-lived token, server-only, never prefixed VITE_)
 *
 * If the token is missing or the API fails, the handler returns an empty list
 * with ok:false so the section can simply not render, rather than crash.
 *
 * Note: Instagram CDN image URLs are signed and expire within a couple of days,
 * so the in-memory cache is intentionally short-lived to keep URLs fresh.
 */

export type InstagramPost = {
  id: string
  /** Full caption (the component trims it for display). */
  caption: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  /** Best still image to show (thumbnail for video, media_url otherwise). */
  image: string
  permalink: string
  timestamp: string
}

type FeedResult =
  | { ok: true; posts: InstagramPost[] }
  | { ok: false; posts: []; reason: 'config' | 'api' | 'network' }

const FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp'
const LIMIT = 12
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes

// Module-level cache, shared across requests on the same server instance.
let cache: { at: number; posts: InstagramPost[] } | null = null

type RawMedia = {
  id: string
  caption?: string
  media_type?: string
  media_url?: string
  thumbnail_url?: string
  permalink?: string
  timestamp?: string
}

function toPost(m: RawMedia): InstagramPost | null {
  const image = m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url
  if (!image || !m.permalink) return null
  return {
    id: m.id,
    caption: m.caption ?? '',
    mediaType: (m.media_type as InstagramPost['mediaType']) ?? 'IMAGE',
    image,
    permalink: m.permalink,
    timestamp: m.timestamp ?? '',
  }
}

export const getInstagramFeed = createServerFn({ method: 'GET' }).handler(
  async (): Promise<FeedResult> => {
    const token = process.env.INSTAGRAM_TOKEN
    if (!token) {
      console.warn('[instagram] INSTAGRAM_TOKEN is not set. Feed is dormant.')
      return { ok: false, posts: [], reason: 'config' }
    }

    if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
      return { ok: true, posts: cache.posts }
    }

    try {
      const url = `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${token}`
      const res = await fetch(url)

      if (!res.ok) {
        const body = await res.text().catch(() => '')
        console.error('[instagram] API error', res.status, body)
        // Prefer serving slightly stale posts over an empty section.
        if (cache) return { ok: true, posts: cache.posts }
        return { ok: false, posts: [], reason: 'api' }
      }

      const json = (await res.json()) as { data?: RawMedia[] }
      const posts = (json.data ?? [])
        .map(toPost)
        .filter((p): p is InstagramPost => p !== null)

      cache = { at: Date.now(), posts }
      return { ok: true, posts }
    } catch (err) {
      console.error('[instagram] network error', err)
      if (cache) return { ok: true, posts: cache.posts }
      return { ok: false, posts: [], reason: 'network' }
    }
  },
)
