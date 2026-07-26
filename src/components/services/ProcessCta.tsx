import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import type { ProcessStep } from '@/types'

const STEPS: ProcessStep[] = [
  {
    step: '1',
    title: 'Consultation',
    description: 'We talk through your goals and the current market.',
  },
  {
    step: '2',
    title: 'Strategy',
    description: 'A clear, tailored plan with timelines and next steps.',
  },
  {
    step: '3',
    title: 'Results',
    description: 'Steady representation through to a successful close.',
  },
]

export function ProcessCta() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand sm:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            Every situation is different. Book a consultation and we will map out a clear plan
            around your goals, timeline, and budget, with no obligation.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-brand-foreground hover:bg-brand/90"
          >
            Book a Consultation
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-4">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5"
            >
              <div className="font-display text-xl font-bold text-terracotta">{item.step}</div>
              <div>
                <div className="mb-1 font-display text-base font-semibold text-brand">
                  {item.title}
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
