import { Compass, MessageCircle, HeartHandshake, Scale } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'

const REASONS = [
  {
    icon: Compass,
    title: 'Local Market Knowledge',
    description:
      'Grounded, current insight into Toronto and GTA neighbourhoods, pricing trends, and what moves a deal forward.',
  },
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    description:
      'You stay informed at every stage. Questions get answered quickly, and the next step is always spelled out plainly.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-First Approach',
    description:
      'No pressure, no rushing. Strategy and advice are shaped around your goals, timeline, and comfort level.',
  },
  {
    icon: Scale,
    title: 'Skilled Negotiation',
    description:
      'Preparation and steady representation to protect your interests, whether you are buying or selling.',
  },
] as const

export function WhyWorkWithAbishan() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <Reveal className="mx-auto mb-14 max-w-xl text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
          Why Work With Abishan
        </p>
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand sm:text-4xl">
          A calm, informed partner through every decision
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
          Real estate is one of the biggest decisions you will make. The approach is built on
          transparency, preparation, and genuine care for your outcome.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((reason, i) => (
          <Reveal key={reason.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-border bg-surface p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand">
                <reason.icon className="h-5 w-5 text-terracotta" aria-hidden="true" />
              </div>
              <h3 className="mb-2.5 font-display text-lg font-semibold text-brand">
                {reason.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
