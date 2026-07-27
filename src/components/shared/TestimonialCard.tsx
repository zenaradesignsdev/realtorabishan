'use client'

import { useState } from 'react'
import { Star, User } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Testimonial } from '@/lib/testimonials'

interface TestimonialCardProps {
  item: Testimonial
}

// Roughly the length at which the quote overflows a 5-line clamp at card width.
const CLAMP_THRESHOLD = 220

export function TestimonialCard({ item }: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false)
  const needsToggle = item.quote.length > CLAMP_THRESHOLD

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-sm shadow-brand/[0.03]">
      <span
        className="font-display text-5xl leading-none text-terracotta/30"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <div className="-mt-3 mb-3 flex gap-0.5 text-terracotta" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>
      <blockquote
        className={cn(
          'flex-1 text-[15px] leading-relaxed text-muted-foreground',
          !expanded && needsToggle && 'line-clamp-5'
        )}
      >
        {item.quote}
      </blockquote>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="-mx-1 mt-3 self-start px-1 py-1.5 text-sm font-semibold text-terracotta-ink underline-offset-2 hover:underline"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand"
          aria-hidden="true"
        >
          <User className="h-5 w-5" />
        </span>
        <span>
          <span className="block font-display text-sm font-semibold text-brand">
            {item.name}
          </span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            {item.meta} &middot; {item.timeAgo} &middot; Google review
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
