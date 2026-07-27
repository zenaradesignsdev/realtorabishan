import Link from 'next/link'
import { ArrowUpRight, Phone } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { businessInfo } from '@/lib/metadata'
import { cn } from '@/lib/cn'

interface CtaBandProps {
  title: string
  description: string
  className?: string
}

export function CtaBand({ title, description, className }: CtaBandProps) {
  return (
    <section className={cn('px-4 py-20 sm:px-6 md:py-28 lg:px-8', className)}>
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-gradient-to-br from-brand via-[#114540] to-[#16544B] px-6 py-16 text-center sm:px-10 md:py-20">
          <div
            aria-hidden="true"
            className="absolute -left-10 -top-16 h-60 w-60 rounded-full border border-terracotta/25"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-8 h-72 w-72 rounded-full border border-terracotta/20"
          />
          <div className="relative">
            <h2 className="text-balance mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/75">
              {description}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-terracotta-solid py-2 pl-7 pr-2 text-base font-bold text-white transition-shadow hover:shadow-lg hover:shadow-black/20"
              >
                Book a Consultation
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4 text-white" aria-hidden="true" />
                </span>
              </Link>
              <a
                href={`tel:${businessInfo.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-semibold text-white hover:bg-white/15"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> {businessInfo.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
