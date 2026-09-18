import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { Image } from '@/components/ui/image'
import { businessInfo } from '@/lib/metadata'

export function AwardsSection() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
              <Image
                src="/images/homelife-award.jpg"
                alt="Abishan Umashanker being presented with an award on stage at an industry awards ceremony"
                fill
                sizes="(max-width: 1024px) 92vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal travel={0}>
              <p className="type-label text-terracotta-ink">Recognition</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2rem] text-brand xs:text-[2.3rem] sm:text-[2.8rem]"
            >
              Recognized on stage for the same thing the reviews describe.
            </WordReveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-lg text-base leading-[1.8] text-muted-foreground sm:text-[17px]">
                Abishan&rsquo;s work has been recognized industry-wide, including at an awards
                ceremony honouring outstanding performance in real estate. The award matters less
                than what earned it &mdash; a client-first way of working that shows up the same in
                a $2,400 lease as it does in a purchase.
              </p>
              <a
                href={businessInfo.rankMyAgentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group -mb-2 mt-6 inline-flex w-fit items-center gap-2.5 py-2 text-[15px] font-semibold text-brand"
              >
                <span className="border-b border-terracotta pb-1">View the RankMyAgent profile</span>
                <ArrowUpRight
                  className="h-4 w-4 text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
