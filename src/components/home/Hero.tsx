import Link from 'next/link'
import { ArrowUpRight, Star } from 'lucide-react'
import { Image } from '@/components/ui/image'
import { WordReveal } from '@/components/motion/WordReveal'
import { Reveal } from '@/components/motion/Reveal'
import { businessInfo } from '@/lib/metadata'

const FACTS = [
  { value: 'Leasing', label: 'The practice' },
  { value: 'Toronto & GTA', label: 'Where' },
  { value: 'Royal LePage Ignite', label: 'Brokerage' },
] as const

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/*
        The skyline carries the whole hero, so it is the LCP element and loads
        with priority. Everything above it is a gradient, not another image.
      */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/pexels-2478248.jpg"
          alt=""
          fill
          priority
          // Not dimmed by an opacity class like the other three heroes — this
          // is the most visible photograph on the site, so it only steps down
          // to 70 rather than the 55 the veiled backgrounds use.
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/*
          Three stacked washes rather than one flat scrim: a vertical fade so
          the fixed header has something to sit on, a left-weighted fade so the
          headline column stays legible over the bright downtown core, and a
          bottom fade into the ink floor so the section hands off to the next
          one without a visible seam.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-shell flex-col justify-end px-5 pb-10 pt-32 short:min-h-0 short:pb-10 short:pt-24 sm:px-8 sm:pb-14 md:min-h-[92svh] md:pt-40 lg:px-12">
        <div className="max-w-4xl">
          <Reveal travel={0}>
            <p className="type-label flex flex-wrap items-center gap-x-3 gap-y-2 text-terracotta">
              <span className="inline-block h-px w-10 bg-terracotta align-middle" aria-hidden="true" />
              Toronto &amp; the GTA
              {/* The separator only makes sense when both halves share a line;
                  below `sm` the label wraps and it would strand at the end. */}
              <span className="hidden text-white/25 sm:inline" aria-hidden="true">
                /
              </span>
              <span className="text-white/50">Leasing-first REALTOR&reg;</span>
            </p>
          </Reveal>

          <WordReveal
            as="h1"
            delay={0.12}
            className="type-display mt-7 text-[3.15rem] text-white short:mt-5 short:text-[2.8rem] xs:text-[3.6rem] sm:text-7xl lg:text-[6.5rem]"
          >
            Leasing, done properly.
          </WordReveal>

          <Reveal delay={0.5} className="mt-8 max-w-xl">
            <p className="text-lg leading-[1.7] text-white/65 sm:text-xl">
              Most agents treat a lease as a small transaction. It is the roof over your head for
              the next year, or the income on a unit you own &mdash; and it deserves the whole job.
              Buying and selling get the same treatment when you are ready for them.
            </p>
          </Reveal>

          <Reveal delay={0.62} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-between gap-4 rounded-full bg-white py-2 pl-7 pr-2 text-brand transition-colors duration-300 hover:bg-terracotta hover:text-white sm:justify-start"
            >
              <span className="text-base font-semibold">Start a conversation</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-500 ease-out group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-white/60"
            >
              See how leasing works
            </Link>
          </Reveal>
        </div>

        {/* Credential strip — the hero's baseline rule. */}
        <Reveal delay={0.75} className="mt-14 border-t rule-dark pt-6 md:mt-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <a
              href={businessInfo.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
            >
              {/* Square headshot crop of the full-length portrait — a 48px
                  circle taken from the 680×1020 original left the face far too
                  small to read. */}
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20">
                <Image
                  src="/images/abishan-avatar.webp"
                  alt="Abishan Umashanker"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="flex gap-0.5 text-terracotta" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {businessInfo.rating.value.toFixed(1)}
                  </span>
                </span>
                <span className="mt-1 block text-[13px] text-white/50 transition-colors group-hover:text-white/80">
                  {businessInfo.rating.count} Google reviews
                </span>
              </span>
            </a>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:gap-x-14">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="type-label text-white/35">{fact.label}</dt>
                  <dd className="type-heading mt-2 text-lg text-white sm:text-xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
