import { ArrowUpRight, Star } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Image } from '@/components/ui/image'
import { businessInfo } from '@/lib/metadata'

export function TrustSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
            Trust &amp; Credentials
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-border bg-white shadow-sm shadow-brand/[0.05] lg:grid-cols-2">
            <a
              href={businessInfo.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-center gap-4 border-b border-border p-9 transition-colors duration-300 hover:bg-surface sm:p-11 lg:border-b-0 lg:border-r"
            >
              <div className="flex items-center gap-5">
                <span className="font-display text-5xl font-bold leading-none text-brand">
                  {businessInfo.rating.value.toFixed(1)}
                </span>
                <div>
                  <div className="flex gap-0.5 text-terracotta" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <div className="mt-1.5 text-sm text-muted-foreground">
                    {businessInfo.rating.count} Google Reviews
                  </div>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Clients consistently highlight clear communication, honest guidance, and a genuine
                commitment to getting the result right.
              </p>
              <span className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand">
                See all reviews
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>

            <div className="flex flex-col justify-center gap-4 p-9 sm:p-11">
              <div className="relative h-8 w-36 sm:h-9 sm:w-40">
                <Image
                  src="/images/royal-lepage-ignite.png"
                  alt={businessInfo.brokerage}
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Affiliated with Royal LePage Ignite Realty Brokerage — founded in 2016 in
                Scarborough, and backed by the wider Royal LePage network, in business since 1913
                with more than 670 offices nationwide.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
