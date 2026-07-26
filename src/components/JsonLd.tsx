import { businessInfo, siteConfig } from '@/lib/metadata'

interface JsonLdProps {
  schema: object
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: businessInfo.legalName,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/abishan.webp`,
    telephone: businessInfo.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.streetAddress,
      addressLocality: businessInfo.addressLocality,
      addressRegion: businessInfo.addressRegion,
      postalCode: businessInfo.postalCode,
      addressCountry: 'CA',
    },
    areaServed: businessInfo.serviceArea,
    memberOf: {
      '@type': 'Organization',
      name: businessInfo.brokerage,
    },
    sameAs: [businessInfo.realtorProfileUrl],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: businessInfo.rating.value,
      reviewCount: businessInfo.rating.count,
    },
  }

  return <JsonLd schema={schema} />
}
