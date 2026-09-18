import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { CountUp } from '@/components/motion/CountUp'
import { Marquee } from '@/components/motion/Marquee'
import { TestimonialCard } from '@/components/shared/TestimonialCard'
import { businessInfo } from '@/lib/metadata'
import { cn } from '@/lib/cn'
import type { Testimonial } from '@/lib/testimonials'

interface TestimonialsProps {
  items: Testimonial[]
  eyebrow?: string
  title: string
  /** Index of the review to set as the large pull-quote. */
  featuredIndex?: number
  className?: string
}

/**
 * Reviews as an editorial spread rather than a card grid.
 *
 * One review is set large as a pull-quote — long enough to actually be read —
 * and the rest run past in a marquee that pauses on hover. Splitting them this
 * way avoids the two failure modes of review sections: a wall of equal-weight
 * cards nobody reads, or a moving track carrying text too long to follow.
 */
export function Testimonials({
  items,
  eyebrow = 'In their words',
  title,
  featuredIndex = 0,
  className,
}: TestimonialsProps) {
  const featured = items[featuredIndex]
  const rest = items.filter((_, i) => i !== featuredIndex)

  return (
    <section className={cn('overflow-hidden bg-ink py-20 md:py-28', className)}>
      <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 border-b rule-dark pb-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <Reveal travel={0}>
              <p className="type-label text-terracotta">{eyebrow}</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2.1rem] text-white xs:text-[2.4rem] sm:text-5xl lg:text-[3.4rem]"
            >
              {title}
            </WordReveal>
          </div>

          <Reveal delay={0.1}>
            <dl className="flex gap-10 sm:gap-14">
              <div>
                <dd className="type-display text-5xl text-white sm:text-6xl">
                  <CountUp to={businessInfo.rating.value} decimals={1} />
                </dd>
                <dt className="type-label mt-3 text-white/35">Average rating</dt>
              </div>
              <div>
                <dd className="type-display text-5xl text-white sm:text-6xl">
                  <CountUp to={businessInfo.rating.count} />
                </dd>
                <dt className="type-label mt-3 text-white/35">Google reviews</dt>
              </div>
            </dl>
          </Reveal>
        </div>

        {featured && (
          <Reveal delay={0.08}>
            <figure className="py-14 md:py-16">
              <blockquote className="type-heading max-w-4xl text-[1.6rem] leading-[1.3] text-white/90 xs:text-[1.8rem] sm:text-[2.2rem] lg:text-[2.6rem]">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-10 bg-terracotta align-middle"
                />
                <span className="type-heading text-lg text-white">{featured.name}</span>
                <span className="type-label text-white/35">
                  {featured.timeAgo} &middot; Google review
                </span>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>

      {/* Full-bleed track — it should run past the shell, not stop at its edge. */}
      <Reveal delay={0.12}>
        <div className="relative">
          <Marquee duration={70} className="border-y rule-dark">
            {rest.map((item) => (
              <div key={item.name} className="p-4">
                <TestimonialCard item={item} />
              </div>
            ))}
          </Marquee>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-ink to-transparent sm:w-24"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink to-transparent sm:w-24"
          />
        </div>
      </Reveal>

      <div className="mx-auto mt-12 flex max-w-shell px-5 sm:px-8 lg:px-12">
        <Reveal delay={0.15}>
          <a
            href={businessInfo.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 py-2 pl-6 pr-2 transition-colors duration-300 hover:border-white/50"
          >
            <span className="type-label text-white">Read every review on Google</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta transition-transform duration-500 ease-out group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4 text-white" aria-hidden="true" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
