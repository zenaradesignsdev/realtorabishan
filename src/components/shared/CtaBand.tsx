import Link from 'next/link'
import { ArrowUpRight, Phone } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { businessInfo } from '@/lib/metadata'
import { cn } from '@/lib/cn'

interface CtaBandProps {
  title: string
  description: string
  className?: string
}

export function CtaBand({ title, description, className }: CtaBandProps) {
  return (
    <section className={cn('bg-surface', className)}>
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
          <div>
            <Reveal travel={0}>
              <p className="type-label text-terracotta-ink">Next step</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2.2rem] text-brand xs:text-[2.6rem] sm:text-5xl lg:text-[3.6rem]"
            >
              {title}
            </WordReveal>
          </div>

          <Reveal delay={0.1}>
            <p className="text-base leading-[1.75] text-muted-foreground sm:text-[17px]">
              {description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between gap-4 rounded-full bg-brand py-2 pl-7 pr-2 text-white transition-colors duration-300 hover:bg-ink sm:justify-start"
              >
                <span className="text-base font-semibold">Book a consultation</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta transition-transform duration-500 ease-out group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4 text-white" aria-hidden="true" />
                </span>
              </Link>
              <a
                href={`tel:${businessInfo.phone}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-brand/20 px-7 py-4 text-base font-semibold text-brand transition-colors duration-300 hover:border-brand/50"
              >
                <Phone className="h-4 w-4 text-terracotta-solid" aria-hidden="true" />
                {businessInfo.phoneDisplay}
              </a>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Call or text any day &mdash; a first conversation costs nothing and commits you to
              nothing.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
