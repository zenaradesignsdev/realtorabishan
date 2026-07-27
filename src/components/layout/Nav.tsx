'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone } from 'lucide-react'
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

function isActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Safety net: close on route change however it happens, not just via a link's onClick.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-8"
      >
        <div className="flex min-w-0 shrink items-center gap-3 sm:shrink-0 sm:gap-4">
          <Image
            src="/images/royal-lepage-ignite.png"
            alt={businessInfo.brokerage}
            width={600}
            height={142}
            className="hidden h-7 w-auto sm:block"
          />
          <span aria-hidden="true" className="hidden h-8 w-px bg-border sm:block" />
          <Link
            href="/"
            aria-label="Abishan Umashanker, Realtor — home"
            className="min-w-0 shrink"
          >
            <Logo />
          </Link>
        </div>

        <div className="hidden items-center gap-0.5 rounded-full border border-border/70 bg-surface/70 p-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-colors',
                  active ? 'text-white' : 'text-brand/80 hover:text-brand'
                )}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-brand" aria-hidden="true" />
                )}
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex">
          <a
            href={`tel:${businessInfo.phone}`}
            className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-brand py-2 pl-4 pr-2 text-sm font-semibold text-brand-foreground shadow-sm shadow-brand/20 transition-all hover:shadow-md hover:shadow-brand/25 lg:pl-5"
          >
            <span className="hidden lg:inline">Call </span>
            {businessInfo.phoneDisplay}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta transition-transform group-hover:scale-105">
              <Phone className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${businessInfo.phone}`}
            aria-label={`Call ${businessInfo.phoneDisplay}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-brand-foreground"
          >
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-[14px] w-[18px]" aria-hidden="true">
              <span
                className={cn(
                  'absolute left-0 top-0 block h-[2px] w-full rounded-full bg-brand transition-transform duration-200',
                  mobileOpen && 'translate-y-[6px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[6px] block h-[2px] w-full rounded-full bg-brand transition-opacity duration-150',
                  mobileOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-3 block h-[2px] w-full rounded-full bg-brand transition-transform duration-200',
                  mobileOpen && '-translate-y-[6px] -rotate-45'
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={cn(
          'absolute inset-x-3 top-full origin-top rounded-2xl border border-border/70 bg-white shadow-xl shadow-brand/10 transition-all duration-200 md:hidden',
          mobileOpen
            ? 'pointer-events-auto translate-y-2 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
        )}
      >
        <div className="flex flex-col gap-1 p-3">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                tabIndex={mobileOpen ? 0 : -1}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-xl px-4 py-3 text-base font-semibold text-brand',
                  active && 'bg-brand-muted'
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href={`tel:${businessInfo.phone}`}
            onClick={() => setMobileOpen(false)}
            tabIndex={mobileOpen ? 0 : -1}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-base font-semibold text-brand-foreground"
          >
            <Phone className="h-4 w-4" /> Call {businessInfo.phoneDisplay}
          </a>
          <div className="mt-2 flex justify-center border-t border-border/70 pt-3 sm:hidden">
            <Image
              src="/images/royal-lepage-ignite.png"
              alt={businessInfo.brokerage}
              width={600}
              height={142}
              className="h-6 w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
