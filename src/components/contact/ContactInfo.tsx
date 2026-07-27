import { ExternalLink, MapPin, Phone, Star } from 'lucide-react'
import { businessInfo } from '@/lib/metadata'

const SERVICE_AREA_CITIES = [
  'Toronto',
  'Scarborough',
  'North York',
  'Etobicoke',
  'Markham',
  'Vaughan',
  'Richmond Hill',
  'Mississauga',
  'Brampton',
  'Pickering',
  'Ajax',
  'Whitby',
] as const

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      <a
        href={`tel:${businessInfo.phone}`}
        className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-5 transition-colors hover:border-terracotta-border"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand">
          <Phone className="h-5 w-5 text-terracotta" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Call or Text
          </span>
          <span className="mt-0.5 block font-display text-lg font-semibold text-brand">
            {businessInfo.phoneDisplay}
          </span>
        </span>
      </a>

      <a
        href={businessInfo.realtorProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-5 transition-colors hover:border-terracotta-border"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand">
          <ExternalLink className="h-5 w-5 text-terracotta" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Profile
          </span>
          <span className="mt-0.5 block font-display text-lg font-semibold text-brand">
            Realtor.ca profile &rarr;
          </span>
        </span>
      </a>

      <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand">
          <MapPin className="h-5 w-5 text-terracotta" aria-hidden="true" />
        </span>
        <address className="not-italic">
          <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Office
          </span>
          <span className="mt-0.5 block font-display text-base font-semibold text-brand">
            {businessInfo.streetAddress}, {businessInfo.addressLocality}, {businessInfo.addressRegion}
          </span>
          <span className="mt-0.5 block text-sm text-muted-foreground">{businessInfo.brokerage}</span>
        </address>
      </div>

      <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface px-6 py-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand">
          <MapPin className="h-5 w-5 text-terracotta" aria-hidden="true" />
        </span>
        <div>
          <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Service Area
          </span>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {SERVICE_AREA_CITIES.map((city) => (
              <span
                key={city}
                className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-brand"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href={businessInfo.reviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-2xl border border-terracotta-border bg-terracotta-tint px-5 py-4 transition-colors hover:bg-terracotta-tint/60"
      >
        <span className="flex gap-0.5 text-terracotta" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </span>
        <span className="text-sm font-semibold text-terracotta-ink">
          {businessInfo.rating.value.toFixed(1)} &middot; Rated by {businessInfo.rating.count} Google
          Reviews
        </span>
      </a>
    </div>
  )
}
