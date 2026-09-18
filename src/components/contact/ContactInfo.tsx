import { ArrowUpRight, MapPin, Phone, Star } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { businessInfo } from '@/lib/metadata'
import { SERVICE_AREAS } from '@/lib/services'

export function ContactInfo() {
  return (
    <div className="flex flex-col">
      <Reveal travel={0}>
        <p className="type-label text-terracotta-ink">Direct</p>
      </Reveal>

      <Reveal delay={0.05}>
        <a
          href={`tel:${businessInfo.phone}`}
          className="group flex items-start gap-5 border-b rule py-7"
        >
          <Phone className="mt-1 h-5 w-5 shrink-0 text-terracotta-solid" aria-hidden="true" />
          <span>
            <span className="type-label block text-brand/40">Call or text</span>
            <span className="type-heading mt-2 block text-2xl text-brand transition-colors group-hover:text-terracotta-ink">
              {businessInfo.phoneDisplay}
            </span>
            <span className="mt-1.5 block text-sm text-muted-foreground">
              Any day &mdash; text is often fastest.
            </span>
          </span>
        </a>
      </Reveal>

      <Reveal delay={0.09}>
        <div className="flex items-start gap-5 border-b rule py-7">
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-terracotta-solid" aria-hidden="true" />
          <address className="not-italic">
            <span className="type-label block text-brand/40">Office</span>
            <span className="type-heading mt-2 block text-lg text-brand">
              {businessInfo.streetAddress}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              {businessInfo.addressLocality}, {businessInfo.addressRegion}{' '}
              {businessInfo.postalCode}
              <br />
              {businessInfo.brokerage}
            </span>
            <a
              href={businessInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mb-3 mt-0.5 inline-flex min-h-[44px] items-center gap-1.5 py-3 text-sm font-semibold text-brand"
            >
              <span className="border-b border-terracotta pb-0.5">Open in Maps</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </address>
        </div>
      </Reveal>

      <Reveal delay={0.13}>
        <a
          href={businessInfo.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-5 border-b rule py-7"
        >
          <Star className="mt-1 h-5 w-5 shrink-0 fill-current text-terracotta-solid" aria-hidden="true" />
          <span>
            <span className="type-label block text-brand/40">Reputation</span>
            <span className="type-heading mt-2 block text-2xl text-brand transition-colors group-hover:text-terracotta-ink">
              {businessInfo.rating.value.toFixed(1)} from {businessInfo.rating.count} reviews
            </span>
            <span className="mt-1.5 block text-sm text-muted-foreground">
              Read every one of them on Google.
            </span>
          </span>
        </a>
      </Reveal>

      <Reveal delay={0.17}>
        <div className="py-7">
          <p className="type-label text-brand/40">Where he works</p>
          <ul className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1.5">
            {SERVICE_AREAS.map((area) => (
              <li
                key={area}
                className="rounded-full border rule px-3.5 py-1.5 text-[13px] font-medium text-brand/75"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  )
}
