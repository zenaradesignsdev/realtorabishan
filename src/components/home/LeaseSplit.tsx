import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Image } from '@/components/ui/image'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'

interface LeasePanel {
  index: string
  audience: string
  title: string
  body: string
  points: readonly string[]
  image: string
  imageAlt: string
  href: string
}

const PANELS: readonly LeasePanel[] = [
  {
    index: '01',
    audience: 'You need a place',
    title: 'Tenants',
    body: 'You send over the budget, the area, and the things you will not compromise on. What comes back is a shortlist — not a feed.',
    points: [
      'A filtered shortlist, not every listing in the city',
      'Viewings booked around your schedule',
      'Applications and references prepared to be accepted',
      'Lease terms read line by line before you sign',
    ],
    image: '/images/pexels-19836798.jpg',
    imageAlt: 'Sunlit rental living room with a light sofa and warm terracotta cushions',
    href: '/services#leasing-tenants',
  },
  {
    index: '02',
    audience: 'You have a place',
    title: 'Landlords',
    body: 'A vacant unit costs you every week it sits. The job is to price it right, show it properly, and hand you a tenant you do not have to worry about.',
    points: [
      'Priced against what is actually leasing nearby',
      'Photographed, listed, and shown in person',
      'Credit, employment, and references screened',
      'Lease paperwork completed correctly the first time',
    ],
    image: '/images/pexels-5071177.jpg',
    imageAlt: 'Detached two-storey home with a covered front porch on a quiet residential street',
    href: '/services#leasing-landlords',
  },
]

export function LeaseSplit() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-6 border-b rule pb-12 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <Reveal travel={0}>
              <p className="type-label text-terracotta-ink">Two sides of the same lease</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2.1rem] text-brand xs:text-[2.4rem] sm:text-5xl lg:text-[3.4rem]"
            >
              Whichever side of it you are on.
            </WordReveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-base leading-[1.75] text-muted-foreground sm:text-[17px]">
              Leasing is where most of the work happens, and it runs in both directions &mdash;
              placing people in homes they are glad to come back to, and filling units for owners
              who would rather not be chasing it themselves.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {PANELS.map((panel, i) => (
            <Reveal
              key={panel.title}
              delay={i * 0.1}
              className={
                // The divider is a rule between the two panels on desktop and
                // between the stacked panels on mobile — never a card border.
                i === 0
                  ? 'border-b rule pb-12 pt-12 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-14'
                  : 'pt-12 lg:pl-14'
              }
            >
              <article className="flex h-full flex-col">
                <div className="flex items-baseline gap-4">
                  <span className="type-label text-terracotta">{panel.index}</span>
                  <span className="type-label text-brand/40">{panel.audience}</span>
                </div>

                <h3 className="type-heading mt-5 text-4xl text-brand sm:text-5xl">{panel.title}</h3>

                <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-sm">
                  <Image
                    src={panel.image}
                    alt={panel.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 44vw"
                    className="object-cover"
                  />
                </div>

                <p className="mt-8 text-base leading-[1.75] text-muted-foreground sm:text-[17px]">
                  {panel.body}
                </p>

                <ul className="mt-7 border-t rule">
                  {panel.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-4 border-b rule py-3.5 text-[15px] leading-relaxed text-brand/85"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta-solid"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  href={panel.href}
                  className="group -mb-2 mt-6 inline-flex w-fit items-center gap-2.5 py-2 text-[15px] font-semibold text-brand"
                >
                  <span className="border-b border-terracotta pb-1">
                    More on leasing for {panel.title.toLowerCase()}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
