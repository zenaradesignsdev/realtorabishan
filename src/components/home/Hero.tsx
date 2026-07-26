import Link from 'next/link'
import { Phone, Star } from 'lucide-react'
import { Image } from '@/components/ui/image'
import { businessInfo } from '@/lib/metadata'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF6EE] via-[#FDF0E4] to-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 opacity-20 mix-blend-multiply [mask-image:linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0)_92%)]"
      >
        <Image
          src="/images/toronto-skyline.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-36 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(201,111,74,0.22)_0%,rgba(201,111,74,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-16 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(14,59,54,0.14)_0%,rgba(14,59,54,0)_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8">
        <div>
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-terracotta-border bg-terracotta-tint px-4 py-2">
            <span className="flex items-center gap-0.5 text-terracotta" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="text-[13px] font-semibold text-terracotta-ink">
              {businessInfo.rating.value.toFixed(1)} &middot; Rated by {businessInfo.rating.count}{' '}
              Google Reviews
            </span>
          </div>

          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-brand sm:text-5xl lg:text-[54px]">
            Your Trusted REALTOR&reg; for Buying, Selling &amp; Investing in Real Estate
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Helping clients buy, sell, rent, and invest across Toronto and the GTA with clarity and
            confidence. From first homes to investment portfolios, you get honest guidance and
            steady representation at every step.
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-colors hover:bg-brand/90"
            >
              Book a Consultation
            </Link>
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-terracotta-border bg-white px-7 py-4 text-base font-semibold text-brand"
            >
              <Phone className="h-4 w-4 text-terracotta" aria-hidden="true" /> Call Now
            </a>
          </div>

          <div className="mt-11 flex items-center gap-7 border-t border-border pt-7">
            <div>
              <div className="font-display text-2xl font-semibold text-brand">Toronto &amp; GTA</div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">Service Area</div>
            </div>
            <div className="h-9 w-px bg-border" />
            <div>
              <div className="font-display text-2xl font-semibold text-brand">
                Buy &middot; Sell &middot; Invest
              </div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">
                Full-Service Representation
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[360px]">
          <div className="absolute -inset-3.5 rounded-3xl border border-terracotta-border" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-2xl border border-terracotta/40 bg-brand shadow-2xl shadow-brand/25">
            <Image
              src="/images/abishan.webp"
              alt="Abishan Umashanker, REALTOR®, standing portrait"
              width={680}
              height={1020}
              priority
              sizes="(max-width: 1024px) 80vw, 360px"
              className="block h-auto w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081A31]/95 to-transparent px-5 pb-5 pt-8">
              <div className="font-display text-xl font-semibold text-white">Abishan Umashanker</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">
                Realtor&reg; &middot; Toronto
              </div>
            </div>
          </div>
          <div className="absolute -right-5 top-8 rounded-2xl border border-border bg-white px-4 py-3.5 text-center shadow-xl">
            <div className="font-display text-2xl font-bold leading-none text-brand">
              {businessInfo.rating.value.toFixed(1)}
            </div>
            <div className="mt-1 flex justify-center gap-0.5 text-terracotta" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-current" />
              ))}
            </div>
            <div className="mt-1 text-[10.5px] text-muted-foreground">
              {businessInfo.rating.count} reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
