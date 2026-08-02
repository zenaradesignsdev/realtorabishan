import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'
import { businessInfo } from '@/lib/metadata'
import type { Service } from '@/types'

const SERVICES: Service[] = [
  {
    title: 'Buying Services',
    description:
      'Guidance from search to closing, including financing referrals, showings, offers, and negotiation to land the right home at the right price.',
  },
  {
    title: 'Selling Services',
    description:
      'Pricing strategy, staging advice, professional marketing, and skilled negotiation to position your property and maximize your return.',
  },
  {
    title: 'First-Time Home Buyers',
    description:
      'Patient, step-by-step support for your first purchase, from understanding budgets and programs to keys in hand.',
  },
  {
    title: 'Property Management',
    description:
      'Connect with the right resources to keep your investment well-managed, occupied, and performing.',
    linkHref: businessInfo.rentalManagementUrl,
    linkLabel: 'Visit AirFVH',
  },
  {
    title: 'Commercial Real Estate',
    description:
      'Support for office, retail, and mixed-use transactions, balancing location, cash flow, and long-term strategy.',
  },
  {
    title: 'Real Estate Investing',
    description:
      'Identify opportunities and grow a portfolio with an eye on cash flow, appreciation, and long-term value.',
  },
  {
    title: 'New Construction',
    description:
      'Navigate pre-construction and builder purchases, from floor plans and deposits to closing and occupancy.',
  },
  {
    title: 'Property Rentals',
    description:
      'Help for tenants and landlords alike, including short-term and long-term rental management, matching the right people with the right space and lease terms.',
  },
]

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand sm:text-4xl">
          Every service, one point of contact
        </h2>
        <p className="mt-3.5 text-base leading-relaxed text-muted-foreground">
          Eight ways to work together, all backed by the same client-first approach.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 border-t border-border lg:grid-cols-2">
        {SERVICES.map((service, i) => {
          const isLeftColumn = i % 2 === 0
          return (
            <Reveal key={service.title} delay={Math.floor(i / 2) * 0.06}>
              <div
                className={cn(
                  'group relative border-b border-border py-8 pl-6 pr-4 sm:pl-8',
                  isLeftColumn ? 'lg:border-r lg:pr-10' : 'lg:pl-10'
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-8 h-6 w-[3px] origin-top scale-y-0 bg-terracotta-solid transition-transform duration-300 ease-out group-hover:scale-y-100"
                />
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-terracotta-tint font-display text-sm font-bold text-terracotta-ink transition-colors duration-300 group-hover:bg-terracotta-solid group-hover:text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-brand">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground lg:pl-[52px]">
                  {service.description}
                </p>
                {service.linkHref && (
                  <a
                    href={service.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-4 inline-flex items-center gap-2 rounded-full bg-terracotta-solid px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-terracotta-solid/90 lg:ml-[52px]"
                  >
                    {service.linkLabel}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
