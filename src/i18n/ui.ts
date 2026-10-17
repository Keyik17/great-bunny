import type { Locale } from './locale'

/**
 * Cross-cutting UI atoms used across many sections (CTA labels, common nav).
 * Component-specific copy lives inline in each component as a small
 * { en, es } COPY object, so each diff stays readable. This file is only for
 * strings that repeat in several places.
 */
export const COMMON: Record<
  Locale,
  {
    getQuote: string
    getService: string
    callUs: string
    seeEveryService: string
    seeEveryCity: string
    readMore: string
  }
> = {
  en: {
    getQuote: 'Get a free quote',
    getService: 'Get this service',
    callUs: 'Call us',
    seeEveryService: 'See every service',
    seeEveryCity: 'See every city we cover',
    readMore: 'Read more',
  },
  es: {
    getQuote: 'Solicita una cotización gratis',
    getService: 'Solicita este servicio',
    callUs: 'Llámanos',
    seeEveryService: 'Ver todos los servicios',
    seeEveryCity: 'Ver todas las ciudades',
    readMore: 'Leer más',
  },
}
