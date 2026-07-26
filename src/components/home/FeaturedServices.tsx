import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'

const FEATURED = [
  {
    index: '01',
    title: 'Buying',
    description:
      'From search to closing, find the right home at the right price with informed, patient guidance.',
  },
  {
    index: '02',
    title: 'Selling',
    description:
      'Pricing strategy, presentation, and marketing to position your property and maximize your return.',
  },
  {
    index: '03',
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURED.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-white p-8">
                <div className="font-display text-sm font-semibold tracking-wide text-terracotta">
                  {item.index}
                </div>
                <h3 className="mb-3 mt-3.5 font-display text-xl font-semibold text-brand">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
