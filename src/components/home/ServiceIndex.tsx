'use client'

import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Image } from '@/components/ui/image'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { SERVICES } from '@/lib/services'
import { cn } from '@/lib/cn'

/**
 * The full service list as a typographic index rather than a card grid.
 *
 * On a fine pointer, hovering a row raises a thumbnail that tracks the cursor.
 * The preview is decorative and duplicates the row's own label, so it is
 * aria-hidden and never receives focus — keyboard users get the same rows in
 * the same order without a floating image chasing them.
 *
 * Cursor position is written straight to the preview node's transform on each
 * pointermove. Routing it through React state would re-render eight rows per
 * frame for a purely visual effect.
 */
export function ServiceIndex() {
  const previewRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  /**
   * Which preview images have been mounted so far.
   *
   * All eight used to render at once. They sit in the viewport (transparent,
   * not display:none), so the browser fetched every one — eight photos on
   * desktop for an affordance a visitor may never trigger. They now mount on
   * first hover and stay mounted, so the row that has been hovered is instant
   * on every later pass and the rest cost nothing.
   */
  const [mounted, setMounted] = useState<ReadonlySet<number>>(() => new Set())

  const activate = useCallback((i: number) => {
    setActiveIndex(i)
    setMounted((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const node = previewRef.current
    if (!node || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    node.style.transform = `translate3d(${event.clientX - bounds.left}px, ${
      event.clientY - bounds.top
    }px, 0)`
  }, [])

  return (
    <section className="relative bg-ink">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-8 border-b rule-dark pb-12 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <Reveal travel={0}>
              <p className="type-label text-terracotta">Everything else</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2.1rem] text-white xs:text-[2.4rem] sm:text-5xl lg:text-[3.4rem]"
            >
              One person, the whole file.
            </WordReveal>
          </div>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="text-base leading-[1.75] text-white/55 sm:text-[17px]">
              Leasing leads the list, but nothing on it gets handed off. The person you meet at the
              first viewing is the person who negotiates the last clause.
            </p>
          </Reveal>
        </div>

        <div className="relative" onPointerMove={handlePointerMove}>
          {/* Cursor-tracked preview — decorative, mouse only. */}
          <div
            ref={previewRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
          >
            <div
              className={cn(
                'relative -ml-[13rem] -mt-[8rem] h-[16rem] w-[26rem] overflow-hidden rounded-sm transition-opacity duration-300',
                activeIndex === null ? 'opacity-0' : 'opacity-100'
              )}
            >
              {SERVICES.map((service, i) =>
                mounted.has(i) ? (
                  <Image
                    key={service.slug}
                    src={service.image}
                    alt=""
                    fill
                    quality={70}
                    sizes="416px"
                    className={cn(
                      'object-cover transition-opacity duration-300',
                      activeIndex === i ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                ) : null
              )}
              <div className="absolute inset-0 bg-ink/25" />
            </div>
          </div>

          <ul onMouseLeave={() => setActiveIndex(null)}>
            {SERVICES.map((service, i) => (
              <li key={service.slug}>
                <Reveal delay={Math.min(i, 4) * 0.05}>
                  <Link
                    href={`/services#${service.slug}`}
                    onMouseEnter={() => activate(i)}
                    onFocus={() => setActiveIndex(null)}
                    className="group flex flex-wrap items-center gap-x-4 gap-y-3 border-b rule-dark py-6 transition-colors duration-500 sm:flex-nowrap sm:gap-x-8 sm:py-7"
                  >
                    <span className="type-label w-7 shrink-0 text-white/25 transition-colors duration-300 group-hover:text-terracotta">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Inline thumbnail — the touch equivalent of the hover preview. */}
                    <span className="relative h-12 w-14 shrink-0 overflow-hidden rounded-sm sm:h-14 sm:w-16 lg:hidden">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="type-heading block text-xl text-white transition-colors duration-300 group-hover:text-terracotta sm:text-3xl lg:text-[2.1rem]">
                        {service.title}
                      </span>
                      {/* From `sm` the row is nowrap and this sits under the
                          title; below that it is hidden here and re-rendered
                          full-width on its own wrapped line (see below), because
                          sharing the row with the number, thumbnail and arrow
                          left it about 180px wide and three lines tall. */}
                      <span className="mt-1.5 hidden text-sm leading-relaxed text-white/45 sm:block lg:hidden">
                        {service.summary}
                      </span>
                    </span>

                    <span className="hidden max-w-xs flex-1 text-[15px] text-white/45 xl:block">
                      {service.summary}
                    </span>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-terracotta group-hover:bg-terracotta sm:h-10 sm:w-10">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>

                    {/* Wrapped full-width summary — mobile only. */}
                    <span className="w-full text-sm leading-relaxed text-white/45 sm:hidden">
                      {service.summary}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
