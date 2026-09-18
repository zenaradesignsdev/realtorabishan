import Link from 'next/link'
import { Image } from '@/components/ui/image'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { SERVICES } from '@/lib/services'

export function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute inset-0">
        {/* Veiled decorative background: it renders at 30% opacity under a
            near-opaque ink gradient, so detail here is not recoverable by the
            eye. q=55 costs about a third of q=85's bytes for no perceptible
            difference. */}
        <Image
          src="/images/neighbourhood.jpg"
          alt=""
          fill
          priority
          quality={55}
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      </div>

      <div className="relative mx-auto max-w-shell px-5 pb-16 pt-32 sm:px-8 md:pb-20 md:pt-44 lg:px-12">
        <Reveal travel={0}>
          <p className="type-label flex items-center gap-3 text-terracotta">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-terracotta align-middle" />
            Services
          </p>
        </Reveal>

        <WordReveal
          as="h1"
          delay={0.1}
          className="type-display mt-7 max-w-4xl text-[2.6rem] text-white short:mt-5 short:text-[2.3rem] xs:text-[3rem] sm:text-6xl lg:text-[4.5rem]"
        >
          Eight services. One person on the file.
        </WordReveal>

        <Reveal delay={0.45} className="mt-8 max-w-2xl">
          <p className="text-lg leading-[1.7] text-white/65">
            Leasing is where most of the work happens, and it sits at the top of this list for that
            reason. Everything below it is available and handled the same way &mdash; by the same
            person, start to finish.
          </p>
        </Reveal>

        {/* Jump list — eight sections is a long page, so give the reader the map. */}
        <Reveal delay={0.55}>
          <nav aria-label="Services" className="mt-12 border-t rule-dark pt-8">
            <ul className="flex flex-wrap gap-x-2 gap-y-2">
              {SERVICES.map((service, i) => (
                <li key={service.slug}>
                  <Link
                    href={`#${service.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-white/15 px-4 py-2.5 transition-colors duration-300 hover:border-terracotta hover:bg-terracotta/10"
                  >
                    <span className="type-label text-terracotta">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-white/75">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>
  )
}
