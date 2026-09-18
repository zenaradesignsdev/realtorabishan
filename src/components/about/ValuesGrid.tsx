import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { cn } from '@/lib/cn'
import { businessInfo } from '@/lib/metadata'
import type { ValueItem } from '@/types'

const VALUES: ValueItem[] = [
  {
    index: '01',
    title: 'Say the difficult part',
    description:
      'If a unit is overpriced, if the building has a problem, if your budget will not get you the area you want — you hear it early, while it still changes what you do next.',
  },
  {
    index: '02',
    title: 'Answer the same day',
    description:
      'Good units are gone in a day and offers have deadlines. A reply that arrives tomorrow is the same as no reply, so messages get answered while they still matter.',
  },
  {
    index: '03',
    title: 'Know the specific street',
    description:
      'Not "the GTA is competitive" — what this building actually rents for, how long the unit two floors down sat, and what the property manager is like to deal with.',
  },
  {
    index: '04',
    title: 'Let the record speak',
    description: `${businessInfo.rating.value.toFixed(1)} stars across ${businessInfo.rating.count} Google reviews, written by tenants, landlords, and buyers who had no reason to leave one.`,
  },
]

export function ValuesGrid() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-8 border-b rule pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <Reveal travel={0}>
              <p className="type-label text-terracotta-ink">How he works</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2.1rem] text-brand xs:text-[2.4rem] sm:text-5xl lg:text-[3.4rem]"
            >
              Four things you can hold him to.
            </WordReveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-base leading-[1.75] text-muted-foreground sm:text-[17px]">
              Not values on a wall &mdash; the four behaviours the reviews keep describing, written
              down so you know what to expect and when it has not happened.
            </p>
          </Reveal>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2">
          {VALUES.map((value, i) => (
            <Reveal
              key={value.index}
              delay={(i % 2) * 0.06}
              // Hairlines between cells, never a border box around them. The
              // column side is taken from the index rather than :nth-child,
              // because each item is wrapped in its own Reveal element and so
              // is never a sibling of the others.
              className={cn('border-b rule', i % 2 === 0 && 'md:border-r')}
            >
              <li className={cn('py-10 md:py-12', i % 2 === 0 ? 'md:pr-12' : 'md:pl-12')}>
                <span className="type-label text-terracotta">{value.index}</span>
                <h3 className="type-heading mt-5 text-2xl text-brand sm:text-[1.9rem]">
                  {value.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-[1.75] text-muted-foreground">
                  {value.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
