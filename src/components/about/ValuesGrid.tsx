import { Reveal } from '@/components/motion/Reveal'
import type { ValueItem } from '@/types'

const VALUES: ValueItem[] = [
  {
    index: '01',
    title: 'Trust & Transparency',
    description:
      'Honest advice, clear expectations, and no pressure. You get the full picture so you can decide with confidence.',
  },
  {
    index: '02',
    title: 'Market Knowledge',
    description:
      'Current, grounded insight into Toronto and GTA neighbourhoods, pricing, and the details that shape a smart decision.',
  },
  {
    index: '03',
    title: 'Responsive Communication',
    description:
      'Quick, clear answers and steady updates so you are never left guessing during a fast-moving process.',
  },
  {
    index: '04',
    title: 'Proven Reputation',
    description:
      'A 5.0-star rating across 36 Google reviews reflects a consistent commitment to client outcomes.',
  },
]

export function ValuesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <Reveal className="mb-12 max-w-2xl">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand sm:text-4xl">
          What you can count on
        </h2>
        <p className="mt-3.5 text-[17px] leading-relaxed text-muted-foreground">
          Every relationship is built on the same principles, whether it is your first purchase or
          your fifth investment property.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((value, i) => (
          <Reveal key={value.index} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-border p-8">
              <div className="font-display text-sm font-semibold tracking-wide text-terracotta">
                {value.index}
              </div>
              <h3 className="mb-2.5 mt-3 font-display text-lg font-semibold text-brand">
                {value.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
