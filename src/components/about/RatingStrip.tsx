import { Star } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { businessInfo } from '@/lib/metadata'

export function RatingStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <Reveal className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <div className="font-display text-5xl font-bold leading-none text-brand sm:text-6xl">
            {businessInfo.rating.value.toFixed(1)}
          </div>
          <div>
            <div className="flex gap-1 text-terracotta" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-[18px] w-[18px] fill-current" />
              ))}
            </div>
            <div className="mt-1.5 text-base text-muted-foreground">
              Rated by {businessInfo.rating.count} Google Reviews
            </div>
          </div>
        </div>
        <p className="max-w-lg text-[17px] leading-relaxed text-muted-foreground">
          Clients consistently highlight clear communication, honest guidance, and a genuine
          commitment to getting the result right.
        </p>
      </Reveal>
    </section>
  )
}
