import { Phone } from 'lucide-react'
import { Image } from '@/components/ui/image'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { businessInfo } from '@/lib/metadata'

export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute inset-0">
        {/* Veiled decorative background: it renders at 40% opacity under a
            near-opaque ink gradient, so detail here is not recoverable by the
            eye. q=55 costs about a third of q=85's bytes for no perceptible
            difference. */}
        <Image
          src="/images/toronto-skyline.jpg"
          alt=""
          fill
          priority
          quality={55}
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/75 to-ink" />
      </div>

      <div className="relative mx-auto max-w-shell px-5 pb-16 pt-32 sm:px-8 md:pb-20 md:pt-44 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <Reveal travel={0}>
              <p className="type-label flex items-center gap-3 text-terracotta">
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-10 bg-terracotta align-middle"
                />
                Contact
              </p>
            </Reveal>
            <WordReveal
              as="h1"
              delay={0.1}
              className="type-display mt-7 text-[2.6rem] text-white short:mt-5 short:text-[2.3rem] xs:text-[3rem] sm:text-6xl lg:text-[4.5rem]"
            >
              Start with a conversation.
            </WordReveal>
          </div>

          <Reveal delay={0.3}>
            <p className="text-lg leading-[1.7] text-white/65">
              Tell me what you are after &mdash; a place to lease, a unit to fill, or a home to buy
              or sell. You will get a real reply, usually the same day.
            </p>
            <a
              href={`tel:${businessInfo.phone}`}
              className="group mt-8 inline-flex items-center gap-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-white transition-transform duration-500 ease-out group-hover:scale-105">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="type-label block text-white/40">Call or text</span>
                <span className="type-heading mt-1.5 block text-2xl text-white sm:text-3xl">
                  {businessInfo.phoneDisplay}
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
