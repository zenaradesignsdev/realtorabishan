import { ExternalLink, MapPin, Phone, Star } from 'lucide-react'
import { businessInfo } from '@/lib/metadata'

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

      <a
        href={businessInfo.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-56 overflow-hidden rounded-2xl border border-border bg-[repeating-linear-gradient(45deg,#F4F2EC_0,#F4F2EC_12px,#FBFAF7_12px,#FBFAF7_24px)] transition-colors hover:border-terracotta-border"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
          <MapPin className="h-7 w-7 text-terracotta" aria-hidden="true" />
          <span className="font-display text-xs tracking-wide text-muted-foreground">
            Toronto &amp; GTA
          </span>
          <span className="text-sm font-semibold text-brand underline-offset-4 group-hover:underline">
            Get Directions &rarr;
          </span>
        </div>
      </a>

      <div className="flex items-center gap-3 rounded-2xl border border-terracotta-border bg-terracotta-tint px-5 py-4">
        <span className="flex gap-0.5 text-terracotta" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </span>
        <span className="text-sm font-semibold text-terracotta-ink">
          {businessInfo.rating.value.toFixed(1)} &middot; Rated by {businessInfo.rating.count} Google
          Reviews
        </span>
      </div>
    </div>
  )
}
