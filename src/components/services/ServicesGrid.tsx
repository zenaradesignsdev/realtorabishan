import {
  Home,
  Tag,
  Sparkles,
  Gem,
  Building2,
  TrendingUp,
  HardHat,
  KeyRound,
  ClipboardList,
  Trees,
} from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import type { Service } from '@/types'

const SERVICES: Service[] = [
  {
    icon: Home,
    title: 'Buying Services',
    description:
      'Guidance from search to closing, including financing referrals, showings, offers, and negotiation to land the right home at the right price.',
  },
  {
    icon: Tag,
    title: 'Selling Services',
    description:
      'Pricing strategy, staging advice, professional marketing, and skilled negotiation to position your property and maximize your return.',
  },
  {
    icon: Sparkles,
    title: 'First-Time Home Buyers',
    description:
      'Patient, step-by-step support for your first purchase, from understanding budgets and programs to keys in hand.',
  },
  {
    icon: Gem,
    title: 'Luxury Real Estate',
    description:
      'Discreet, detail-focused representation for high-end homes, with tailored marketing and a refined buyer experience.',
  },
  {
    icon: Building2,
    title: 'Commercial Real Estate',
    description:
      'Support for office, retail, and mixed-use transactions, balancing location, cash flow, and long-term strategy.',
  },
  {
    icon: TrendingUp,
    title: 'Real Estate Investing',
    description:
      'Identify opportunities and grow a portfolio with an eye on cash flow, appreciation, and long-term value.',
  },
  {
    icon: HardHat,
    title: 'New Construction',
    description:
      'Navigate pre-construction and builder purchases, from floor plans and deposits to closing and occupancy.',
  },
  {
    icon: KeyRound,
    title: 'Property Rentals',
    description: 'Help for tenants and landlords alike, matching the right people with the right space and lease terms.',
  },
  {
    icon: ClipboardList,
    title: 'Property Management',
    description: 'Connect with the right resources to keep your investment well-managed, occupied, and performing.',
  },
  {
    icon: Trees,
    title: 'Land, Farm & Lot Sales',
    description: 'Representation for land, farm, warehouse, and building-lot transactions, with attention to zoning and use.',
  },
]

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand sm:text-4xl">
          Every service, one point of contact
        </h2>
        <p className="mt-3.5 text-base leading-relaxed text-muted-foreground">
          Ten ways to work together, all backed by the same client-first approach.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-2xl border border-border bg-white p-8 transition-shadow hover:border-terracotta-border hover:shadow-lg hover:shadow-brand/[0.06]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand">
                <service.icon className="h-5 w-5 text-terracotta" aria-hidden="true" />
              </div>
              <h3 className="mb-2.5 font-display text-lg font-semibold text-brand">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
