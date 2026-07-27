import { Reveal } from '@/components/motion/Reveal'
import { Image } from '@/components/ui/image'

const REASONS = [
  {
    title: 'Local Market Knowledge',
    description:
      'Grounded, current insight into Toronto and GTA neighbourhoods, pricing trends, and what moves a deal forward.',
  },
  {
    title: 'Clear Communication',
    description:
      'You stay informed at every stage. Questions get answered quickly, and the next step is always spelled out plainly.',
  },
  {
    title: 'Client-First Approach',
    description:
      'No pressure, no rushing. Strategy and advice are shaped around your goals, timeline, and comfort level.',
  },
  {
    title: 'Skilled Negotiation',
    description:
      'Preparation and steady representation to protect your interests, whether you are buying or selling.',
  },
] as const

export function WhyWorkWithAbishan() {
  return (
    <section className="border-y border-border bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
            Why Work With Abishan
          </p>
          <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-brand sm:text-3xl">
            A calm, <span className="text-terracotta-ink">informed partner</span> through every
            decision
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            Real estate is one of the biggest decisions you will make. The approach is built on
            transparency, preparation, and genuine care for your outcome.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-14">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-sm shadow-brand/[0.05]">
              <Image
                src="/images/neighbourhood.jpg"
                alt="Aerial view of a leafy Toronto-area residential neighbourhood"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="border-t border-border">
            {REASONS.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.06}>
                <div className="group border-b border-border">
                  <div className="-mx-4 rounded-2xl px-4 py-8 transition-colors duration-300 group-hover:bg-white sm:-mx-6 sm:grid sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-10 sm:px-6 md:py-10">
                    <div>
                      <span
                        aria-hidden="true"
                        className="mb-4 block h-px w-10 bg-terracotta-solid transition-all duration-300 ease-out group-hover:w-16"
                      />
                      <h3 className="font-display text-xl font-semibold text-brand sm:text-2xl">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-0 sm:text-[17px]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
