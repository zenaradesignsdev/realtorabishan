import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Image } from '@/components/ui/image'

const SUPPORTING = [
  {
    title: 'Selling',
    description:
      'Pricing strategy, presentation, and marketing to position your property and maximize your return.',
  },
  {
    title: 'Investing',
    description:
      'Identify opportunities and build a portfolio with an eye on cash flow, growth, and long-term value.',
  },
] as const

export function FeaturedServices() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
              Featured Services
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand sm:text-4xl">
              Full-service support, whatever your move
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-b-2 border-terracotta pb-1 text-base font-semibold text-brand"
          >
            View all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="group relative flex h-full min-h-[360px] flex-col justify-end overflow-hidden rounded-[28px] p-9 md:p-11">
              <Image
                src="/images/modern-living-room.jpg"
                alt="Bright, modern living room with clean lines and natural light"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand via-brand/75 to-brand/10"
              />
              <div className="relative">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
                  Start here
                </p>
                <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                  Buying
                </h3>
                <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/75">
                  From search to closing, find the right home at the right price with informed,
                  patient guidance.
                </p>
              </div>
              <Link
                href="/services"
                className="group/link relative mt-10 inline-flex w-fit items-center gap-2.5 text-sm font-semibold text-white"
              >
                Explore buying
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover/link:rotate-45">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-2">
            {SUPPORTING.map((item, i) => (
              <Reveal key={item.title} delay={0.08 + i * 0.08} className="flex-1">
                <div className="flex h-full flex-col justify-center rounded-2xl border border-border bg-white p-7 shadow-sm shadow-brand/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-terracotta-border hover:shadow-lg hover:shadow-brand/[0.08]">
                  <h3 className="font-display text-lg font-semibold text-brand">{item.title}</h3>
                  <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
