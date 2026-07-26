import type { Metadata } from 'next'

/**
 * Per-client: update siteConfig after forking.
 * All pages call generateMetadata() to merge page-level overrides
 * with these site-wide defaults.
 */
export const siteConfig = {
  name: 'Abishan Umashanker, Realtor®',
  description:
    'Abishan Umashanker is a Toronto-based REALTOR® helping buyers, sellers, and investors move forward with confidence across the GTA. Rated 5.0 across 36 Google reviews.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://abishanrealtor.ca',
  ogImage: '/og-image.jpg',
  locale: 'en_CA',
} as const

export const businessInfo = {
  legalName: 'Abishan Umashanker',
  brokerage: 'Royal LePage Ignite Realty Brokerage',
  phone: '+1-647-234-4511',
  phoneDisplay: '(647) 234-4511',
  streetAddress: '795 Milner Avenue',
  addressLocality: 'Toronto',
  addressRegion: 'ON',
  postalCode: 'M1B 3C3',
  realtorProfileUrl:
    'https://www.realtor.ca/agent/2198342/abishan-umashanker-d2-795-milner-avenue-toronto-ontario-m1b3c3',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=795+Milner+Avenue+Toronto+ON+M1B+3C3',
  serviceArea: 'Toronto & the Greater Toronto Area',
  rating: { value: 5.0, count: 36 },
} as const

type MetadataOverrides = {
  title?: string
  description?: string
  ogImage?: string
  path?: string  // page path e.g. '/contact' — used for canonical URL and og:url
  noIndex?: boolean
}

export function generateMetadata(overrides: MetadataOverrides = {}): Metadata {
  const title = overrides.title ? `${overrides.title} | ${siteConfig.name}` : siteConfig.name
  const description = overrides.description ?? siteConfig.description
  const ogImage = overrides.ogImage ?? siteConfig.ogImage
  const pageUrl = overrides.path
    ? `${siteConfig.url}${overrides.path}`
    : siteConfig.url

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: overrides.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}
