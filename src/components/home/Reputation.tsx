import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { businessInfo } from '@/lib/metadata'

export function Reputation() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-[#155048] p-11 text-white">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-terracotta/35"
            />
            <div className="relative font-display text-7xl font-bold leading-none">
              {businessInfo.rating.value.toFixed(1)}
            </div>
            <div className="relative mt-2.5 flex gap-1 text-terracotta" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="relative mt-4 text-base leading-relaxed text-white/75">
              Rated <strong className="text-white">{businessInfo.rating.value.toFixed(1)}</strong>{' '}
              across <strong className="text-white">{businessInfo.rating.count} Google Reviews</strong>{' '}
              from clients across Toronto and the GTA.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
            Reputation
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand sm:text-4xl">
            A reputation built on trust and results
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            Clients consistently point to clear communication, honest advice, and a genuine
            commitment to their goals. That reputation is the foundation of every new relationship.
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <a
              href={businessInfo.realtorProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-terracotta-border px-6 py-3.5 text-base font-semibold text-brand"
            >
              View Realtor.ca profile <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-brand-foreground hover:bg-brand/90"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
