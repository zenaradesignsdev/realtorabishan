import type { Metadata } from 'next'

/**
 * Per-client: update siteConfig after forking.
 * All pages call generateMetadata() to merge page-level overrides
 * with these site-wide defaults.
 */
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
  rankMyAgentUrl: 'https://rankmyagent.com/abishan-umashanker',
  rentalManagementUrl: 'https://airfvh.com',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=795+Milner+Avenue+Toronto+ON+M1B+3C3',
  // No Google Cloud project is set up for this client, so the review count/rating
  // isn't pulled live — update this alongside src/lib/testimonials.ts when Abishan
  // reports new Google reviews. Every other reference to the count reads from here.
  reviewsUrl: 'https://share.google/mkLtQqcHxk6AdpfIy',
  serviceArea: 'Toronto & the Greater Toronto Area',
  rating: { value: 5.0, count: 46 },
} as const

/**
 * The canonical origin, with no trailing slash.
 *
 * Order matters. `NEXT_PUBLIC_SITE_URL` is the explicit answer and always wins.
 * Failing that, Vercel exposes the project's *stable production* domain to every
 * deployment including previews — so a preview build still emits canonicals and
 * OG URLs pointing at production rather than at its own throwaway hostname,
 * which is what stops previews competing with the real site in search results.
 * The literal is only a local-build fallback and is not the confirmed domain.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')

  // The NEXT_PUBLIC_ copy is the one that survives into the client bundle; the
  // bare name is only readable on the server. Check both.
  const vercelDomain =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercelDomain) return `https://${vercelDomain}`

  return 'https://theleaseman.ca'
}

export const siteConfig = {
  name: 'Abishan Umashanker, Realtor®',
  description: `Abishan Umashanker is a Toronto-based REALTOR® focused on leasing across the GTA — matching tenants with the right rental and landlords with the right tenants, plus buying and selling representation. Rated ${businessInfo.rating.value.toFixed(1)} across ${businessInfo.rating.count} Google reviews.`,
  url: resolveSiteUrl(),
  ogImage: '/og-image.jpg',
  locale: 'en_CA',
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
