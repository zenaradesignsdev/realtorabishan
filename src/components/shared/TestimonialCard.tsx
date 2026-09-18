import { Star } from 'lucide-react'
import type { Testimonial } from '@/lib/testimonials'

interface TestimonialCardProps {
  item: Testimonial
}

/**
 * Compact review card for the marquee row. The quote is clamped rather than
 * expandable — an in-card toggle inside a moving track is a fiddly target, so
 * the full text lives one click away on the Google reviews page instead.
 */
export function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <figure className="flex h-full w-[19rem] shrink-0 flex-col justify-between border rule-dark bg-white/[0.03] p-7 sm:w-[23rem]">
      <div>
        <div className="flex gap-0.5 text-terracotta" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </div>
        <blockquote className="mt-5 line-clamp-6 text-[15px] leading-[1.7] text-white/65">
          {item.quote}
        </blockquote>
      </div>
      <figcaption className="mt-7 border-t rule-dark pt-4">
        <span className="type-heading block text-base text-white">{item.name}</span>
        <span className="mt-1.5 block text-xs text-white/35">
          {item.timeAgo} &middot; Google review
        </span>
      </figcaption>
    </figure>
  )
}
