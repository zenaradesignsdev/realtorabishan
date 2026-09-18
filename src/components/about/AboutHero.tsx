import { Image } from '@/components/ui/image'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { businessInfo } from '@/lib/metadata'

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute inset-0">
        {/* Veiled decorative background: it renders at 40% opacity under a
            near-opaque ink gradient, so detail here is not recoverable by the
            eye. q=55 costs about a third of q=85's bytes for no perceptible
            difference. */}
        <Image
          src="/images/pexels-2478248.jpg"
          alt=""
          fill
          quality={55}
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>

      <div className="relative mx-auto max-w-shell px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-44 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
          <div>
            <Reveal travel={0}>
              <p className="type-label flex items-center gap-3 text-terracotta">
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-10 bg-terracotta align-middle"
                />
                About
              </p>
            </Reveal>

            <WordReveal
              as="h1"
              delay={0.1}
              className="type-display mt-7 text-[2.6rem] text-white short:mt-5 short:text-[2.3rem] xs:text-[3rem] sm:text-6xl lg:text-[4.5rem]"
            >
              The agent who reads the whole lease.
            </WordReveal>

            <Reveal delay={0.4} className="mt-8 max-w-xl">
              <p className="text-lg leading-[1.7] text-white/65">
                Abishan Umashanker is a Toronto REALTOR&reg; with{' '}
                {businessInfo.brokerage.replace(' Brokerage', '')}, and leasing is what he does
                most. Tenants who want a place that fits, landlords who want a tenant they can stop
                thinking about &mdash; and buyers and sellers who want the same directness applied
                to a bigger number.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border rule-dark lg:ml-auto">
              <Image
                src="/images/abishan.webp"
                alt="Abishan Umashanker, REALTOR®, standing portrait"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 420px"
                className="object-cover object-top"
              />
              {/* The portrait was shot on a white studio backdrop, which reads
                  as a lit rectangle against the ink hero. Washes at both edges
                  bed it into the section instead. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-ink/45 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="type-heading text-2xl text-white">Abishan Umashanker</p>
                <p className="type-label mt-2.5 text-terracotta">Realtor&reg;</p>
                <p className="mt-4 text-sm text-white/50">{businessInfo.brokerage}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
