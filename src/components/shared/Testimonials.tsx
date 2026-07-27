import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { TestimonialCard } from '@/components/shared/TestimonialCard'
import { businessInfo } from '@/lib/metadata'
import { cn } from '@/lib/cn'
import type { Testimonial } from '@/lib/testimonials'

interface TestimonialsProps {
  items: Testimonial[]
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function Testimonials({
  items,
  eyebrow = 'Client Reviews',
  title,
  description,
  className,
}: TestimonialsProps) {
  return (
    <section className={cn('py-20 md:py-28', className)}>
      <Reveal className="mx-auto mb-12 max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3.5 text-base leading-relaxed text-muted-foreground">{description}</p>
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {items.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-10 flex justify-center px-4">
        <a
          href={businessInfo.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full border border-brand/20 bg-white px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand-muted"
        >
          See all Google reviews
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </Reveal>
    </section>
  )
}
