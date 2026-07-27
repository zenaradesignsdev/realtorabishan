import { Reveal } from '@/components/motion/Reveal'
import { Image } from '@/components/ui/image'
import { businessInfo } from '@/lib/metadata'
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
    description: `A ${businessInfo.rating.value.toFixed(1)}-star rating across ${businessInfo.rating.count} Google reviews reflects a consistent commitment to client outcomes.`,
  },
]

export function ValuesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
            Our Values
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand sm:text-4xl">
            What you can count on
          </h2>
          <p className="mt-3.5 text-[17px] leading-relaxed text-muted-foreground">
            Every relationship is built on the same principles, whether it is your first purchase
            or your fifth investment property.
          </p>
          <div className="relative mt-8 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-sm shadow-brand/[0.05]">
            <Image
              src="/images/pexels-31651009.jpg"
              alt="Hand holding house-shaped keys inside a bright modern home"
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-9">
          {VALUES.map((value, i) => (
            <Reveal key={value.index} delay={i * 0.08}>
              <div className="group border-l-2 border-terracotta-border py-1 pl-6 transition-all duration-300 hover:border-terracotta-solid hover:pl-7">
                <h3 className="font-display text-xl font-semibold text-brand">{value.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
