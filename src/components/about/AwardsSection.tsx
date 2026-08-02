import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Image } from '@/components/ui/image'
import { businessInfo } from '@/lib/metadata'

export function AwardsSection() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
            Recognition
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-border bg-white shadow-sm shadow-brand/[0.05] lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full lg:aspect-auto">
              <Image
                src="/images/homelife-award.jpg"
                alt="Abishan Umashanker being presented with an award on stage at an industry awards ceremony"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-4 p-9 sm:p-11">
              <h2 className="font-display text-2xl font-semibold leading-tight text-brand sm:text-3xl">
                Recognized for outstanding performance
              </h2>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Abishan&rsquo;s client-first approach has been recognized industry-wide, including
                at an awards ceremony honouring outstanding performance in real estate.
              </p>
              <a
                href={businessInfo.rankMyAgentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand"
              >
                View RankMyAgent profile
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
