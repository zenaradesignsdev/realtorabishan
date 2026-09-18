import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { Image } from '@/components/ui/image'

const REASONS = [
  {
    index: '01',
    title: 'He has seen the street',
    description:
      'Rents and prices move block by block in this city, not city-wide. What a unit should go for on your street, how long comparable places have sat, and what the building is actually like to live in — that comes from being in them, not from a report.',
  },
  {
    index: '02',
    title: 'You are never guessing',
    description:
      'Messages get answered the same day, and every stage ends with you knowing what happens next and when. In a market where units go in a day, being told late is the same as not being told.',
  },
  {
    index: '03',
    title: 'No one is being rushed',
    description:
      'Nothing gets sold to you. If a place is wrong, you will hear why; if waiting two weeks is the better move, you will hear that too, even when it is not the faster commission.',
  },
  {
    index: '04',
    title: 'Prepared before the table',
    description:
      'Negotiation is mostly what was done beforehand — comparables pulled, terms understood, the other side read. It is why applications get accepted and why offers hold their position.',
  },
] as const

export function WhyWorkWithAbishan() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal travel={0}>
              <p className="type-label text-terracotta-ink">Meet Abishan</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2.1rem] text-brand xs:text-[2.4rem] sm:text-5xl"
            >
              Four reasons people keep sending friends.
            </WordReveal>

            <Reveal delay={0.12}>
              <div className="relative mt-9 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm border rule bg-surface">
                <Image
                  src="/images/abishan.webp"
                  alt="Abishan Umashanker, REALTOR®, standing portrait"
                  fill
                  sizes="(max-width: 1024px) 92vw, 380px"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="type-heading text-xl text-white">Abishan Umashanker</p>
                  <p className="type-label mt-2 text-terracotta">
                    Realtor&reg; &middot; Royal LePage Ignite
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <Link
                href="/about"
                className="group -mb-2 mt-5 inline-flex w-fit items-center gap-2.5 py-2 text-[15px] font-semibold text-brand"
              >
                <span className="border-b border-terracotta pb-1">Read the full story</span>
                <ArrowUpRight
                  className="h-4 w-4 text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <ol className="border-t rule lg:pt-4">
            {REASONS.map((reason, i) => (
              <Reveal key={reason.index} delay={i * 0.06}>
                <li className="group border-b rule py-9 md:py-11">
                  <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-[minmax(0,15rem)_1fr]">
                    <div className="flex items-baseline gap-4 sm:block">
                      <span className="type-label text-terracotta">{reason.index}</span>
                      <h3 className="type-heading text-xl text-brand sm:mt-4 sm:text-[1.7rem]">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="max-w-xl text-base leading-[1.75] text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
