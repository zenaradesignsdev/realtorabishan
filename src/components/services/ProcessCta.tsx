import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import type { ProcessStep } from '@/types'

const STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'The call',
    description:
      'Fifteen minutes on what you need, when you need it by, and what the number actually is. No pitch, and nothing to sign.',
  },
  {
    step: '02',
    title: 'The plan',
    description:
      'A shortlist, a price, or a strategy — with the reasoning attached, so you can disagree with it before anyone acts on it.',
  },
  {
    step: '03',
    title: 'The work',
    description:
      'Showings, applications, offers, and paperwork, handled by the same person you spoke to on day one, through to the keys.',
  },
]

export function ProcessCta() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-8 border-b rule-dark pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <Reveal travel={0}>
              <p className="type-label text-terracotta">How it goes</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2.1rem] text-white xs:text-[2.4rem] sm:text-5xl lg:text-[3.4rem]"
            >
              Three steps, no surprises.
            </WordReveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-base leading-[1.75] text-white/55 sm:text-[17px]">
              Whether it is a lease or a purchase, it runs the same way &mdash; and you always know
              which step you are on.
            </p>
          </Reveal>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3">
          {STEPS.map((item, i) => (
            <Reveal
              key={item.step}
              delay={i * 0.08}
              className={i < STEPS.length - 1 ? 'rule-dark md:border-r' : ''}
            >
              <li
                className={`border-b rule-dark py-10 md:border-b-0 md:py-14 ${
                  i === 0 ? 'md:pr-10' : i === STEPS.length - 1 ? 'md:pl-10' : 'md:px-10'
                }`}
              >
                <span className="type-display block text-5xl text-white/15 sm:text-6xl">
                  {item.step}
                </span>
                <h3 className="type-heading mt-6 text-2xl text-white sm:text-[1.9rem]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-[1.8] text-white/55">
                  {item.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
