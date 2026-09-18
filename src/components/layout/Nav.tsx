'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Phone } from 'lucide-react'
import { cn } from '@/lib/cn'
import { businessInfo } from '@/lib/metadata'
import { Logo } from '@/components/layout/Logo'
import { Image } from '@/components/ui/image'
import type { NavLink } from '@/types'

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

/** Scroll distance (px) after which the bar leaves its transparent state. */
const COMPACT_AFTER = 24

interface IndicatorRect {
  left: number
  width: number
}

function isActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

/**
 * Fixed, transparent-over-hero header.
 *
 * Every page opens on a dark hero, so at rest the bar is chromeless and the
 * hero image runs all the way to the top of the viewport. Past COMPACT_AFTER
 * it condenses into a frosted ink bar. Because it is fixed rather than sticky
 * it occupies no layout space — each hero carries its own top padding to clear
 * it (see `pt-28 md:pt-36` on the hero sections).
 */
export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Desktop nav: a single terracotta hairline that slides between links rather
  // than one hard-cut underline per link. It follows hover/focus and settles
  // back on the current page when the pointer leaves.
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const progressRef = useRef<HTMLSpanElement>(null)
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null)
  const [armed, setArmed] = useState(false)
  const [previewHref, setPreviewHref] = useState<string | null>(null)

  const activeHref = NAV_LINKS.find((link) => isActive(pathname, link.href))?.href ?? null
  const highlightedHref = previewHref ?? activeHref

  // Safety net: close on route change however it happens, not just via a link's onClick.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return

    // Lock on <html>, not <body>. The root's overflow is what propagates to
    // the viewport, so it is the only element whose overflow actually stops
    // the page scrolling (see the note in globals.css).
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      root.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  // One rAF-throttled scroll listener drives both the compact state and the
  // reading-progress hairline. The hairline is written straight to the node's
  // transform — running it through state would re-render the nav every frame.
  useEffect(() => {
    let frame = 0

    const read = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > COMPACT_AFTER)

      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(Math.max(y / scrollable, 0), 1) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const measureIndicator = useCallback(() => {
    const el = highlightedHref ? linkRefs.current[highlightedHref] : null
    if (!el) {
      setIndicator(null)
      return
    }
    // Below `md` the whole link row is display:none, so both offsets read 0. A
    // resize across the breakpoint would otherwise collapse the hairline to a
    // zero-width blob at the container's left edge — keep the last good
    // measurement and let the next visible measure correct it.
    if (el.offsetWidth === 0) return
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
  }, [highlightedHref])

  useEffect(() => {
    measureIndicator()

    let cancelled = false
    // Display webfonts land after first paint and change label widths, so the
    // first measurement has to be re-taken once they have swapped in.
    if ('fonts' in document) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) measureIndicator()
        })
        .catch(() => {})
    }

    window.addEventListener('resize', measureIndicator)
    return () => {
      cancelled = true
      window.removeEventListener('resize', measureIndicator)
    }
  }, [measureIndicator])

  // Place the hairline first, animate only from the second position onward — so
  // it fades in where it belongs rather than sliding in from the container edge.
  useEffect(() => {
    if (!indicator || armed) return
    const frame = requestAnimationFrame(() => setArmed(true))
    return () => cancelAnimationFrame(frame)
  }, [indicator, armed])

  const compact = scrolled && !mobileOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-out motion-reduce:transition-none',
        compact
          ? 'border-white/10 bg-ink/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          'relative z-10 mx-auto flex max-w-shell items-center justify-between gap-6 px-5 transition-[padding] duration-500 ease-out motion-reduce:transition-none sm:px-8 lg:px-12',
          compact ? 'py-3 md:py-3.5' : 'py-4 md:py-6'
        )}
      >
        <div className="flex min-w-0 shrink items-center sm:shrink-0">
          {/* Brokerage lockup — collapses away on desktop once the bar
              compacts, leaving the wordmark to lead. Still present at rest on
              every page and permanently in the footer, per RECO marketing
              rules. */}
          <div
            className={cn(
              'hidden shrink-0 items-center overflow-hidden opacity-90 transition-all duration-500 ease-out motion-reduce:transition-none lg:mr-5 lg:flex lg:max-w-[200px]',
              compact && 'lg:mr-0 lg:max-w-0 lg:opacity-0'
            )}
          >
            {/* The brokerage mark is black-and-red artwork on a transparent
                ground, so it cannot be tinted for a dark bar — it sits on its
                own white chip instead, which is also how the brokerage's own
                brand guidance places it. */}
            <span className="flex items-center rounded-sm bg-white px-2.5 py-1.5">
              <Image
                src="/images/royal-lepage-ignite.png"
                alt={businessInfo.brokerage}
                width={600}
                height={142}
                sizes="68px"
                className="h-4 w-auto"
              />
            </span>
            <span aria-hidden="true" className="ml-5 h-7 w-px bg-white/20" />
          </div>
          <Link
            href="/"
            aria-label="Abishan Umashanker, Realtor — home"
            className="-my-1.5 min-w-0 shrink rounded-sm py-1.5"
          >
            <Logo variant="dark" />
          </Link>
        </div>

        <div
          className="relative hidden items-center md:flex"
          onMouseLeave={() => setPreviewHref(null)}
        >
          {NAV_LINKS.map((link) => {
            const highlighted = link.href === highlightedHref
            return (
              <Link
                key={link.href}
                ref={(el) => {
                  linkRefs.current[link.href] = el
                }}
                href={link.href}
                aria-current={activeHref === link.href ? 'page' : undefined}
                onMouseEnter={() => setPreviewHref(link.href)}
                onFocus={() => setPreviewHref(link.href)}
                onBlur={() => setPreviewHref(null)}
                className={cn(
                  // min-h rather than more padding: this row first appears at
                  // `md` (768px), which is a tablet — touched, not clicked — and
                  // an 11px label with py-3 only reaches 35px.
                  'type-label inline-flex min-h-[44px] items-center px-4 transition-colors duration-300 motion-reduce:transition-none lg:px-5',
                  highlighted ? 'text-white' : 'text-white/55'
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute bottom-1 left-0 h-px bg-terracotta',
              armed
                ? 'transition-[transform,width,opacity] duration-500 ease-out motion-reduce:transition-none'
                : 'transition-none',
              indicator ? 'opacity-100' : 'opacity-0'
            )}
            style={
              indicator
                ? { transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }
                : undefined
            }
          />
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${businessInfo.phone}`}
            className="type-label inline-flex min-h-[44px] items-center whitespace-nowrap px-2 text-white/70 transition-colors hover:text-white"
          >
            {businessInfo.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/25 py-2 pl-5 pr-2 transition-colors duration-300 hover:border-white/50"
          >
            <span className="type-label text-white">Book a call</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta transition-transform duration-500 ease-out group-hover:rotate-45">
              <ArrowUpRight className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${businessInfo.phone}`}
            aria-label={`Call ${businessInfo.phoneDisplay}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-terracotta text-white"
          >
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-[13px] w-[19px]" aria-hidden="true">
              <span
                className={cn(
                  'absolute left-0 top-0 block h-px w-full bg-white transition-transform duration-300',
                  mobileOpen && 'translate-y-[6px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[6px] block h-px w-full bg-white transition-opacity duration-200',
                  mobileOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-3 block h-px w-full bg-white transition-transform duration-300',
                  mobileOpen && '-translate-y-[6px] -rotate-45'
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Reading-progress hairline, flush with the bar's bottom edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px overflow-hidden"
      >
        <span
          ref={progressRef}
          className="block h-full w-full origin-left scale-x-0 bg-terracotta"
        />
      </span>

      {/* Full-viewport mobile menu — display type on ink, not a dropdown card. */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={cn(
          // Scrollable rather than centred-and-clipped: the menu's content is
          // ~720px tall, so on a short viewport (iPhone SE/8/mini, or any phone
          // in landscape) `justify-center` alone pushed the brokerage row past
          // both edges with no way to reach it — the page scroll is locked while
          // the menu is open. `my-auto` on the inner block keeps it optically
          // centred whenever it does fit.
          'fixed inset-0 z-0 overflow-y-auto overscroll-contain bg-ink transition-opacity duration-300 md:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="my-auto flex min-h-full flex-col justify-center px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-24 sm:px-8">
          <div className="border-t rule-dark">
            {NAV_LINKS.map((link, i) => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  tabIndex={mobileOpen ? 0 : -1}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-baseline justify-between border-b rule-dark py-5 transition-transform duration-500 ease-out',
                    mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  )}
                  style={{ transitionDelay: mobileOpen ? `${80 + i * 60}ms` : '0ms' }}
                >
                  <span
                    className={cn(
                      'type-display text-[2.5rem]',
                      active ? 'text-white' : 'text-white/60'
                    )}
                  >
                    {link.label}
                  </span>
                  <span className="type-label text-terracotta">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="mt-9 flex flex-col gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-terracotta-solid px-6 py-4 text-base font-semibold text-white"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> Call {businessInfo.phoneDisplay}
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-4 text-base font-semibold text-white"
            >
              Book a consultation
            </Link>
          </div>

          <div className="mt-9 flex items-center justify-between border-t rule-dark pt-6">
            <span className="flex items-center rounded-sm bg-white px-3 py-2">
              <Image
                src="/images/royal-lepage-ignite.png"
                alt={businessInfo.brokerage}
                width={600}
                height={142}
                sizes="68px"
                className="h-4 w-auto"
              />
            </span>
            <span className="type-label text-white/40">Toronto &amp; the GTA</span>
          </div>
        </div>
      </div>
    </header>
  )
}
