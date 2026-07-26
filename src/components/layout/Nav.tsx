'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { businessInfo } from '@/lib/metadata'
import { Logo } from '@/components/layout/Logo'
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
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link href="/" className="shrink-0" aria-label="Abishan Umashanker, Realtor — home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className="relative px-3.5 py-2.5 text-base font-semibold tracking-tight text-brand transition-colors hover:text-brand/80"
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-terracotta" />
                )}
              </Link>
            )
          })}
          <a
            href={`tel:${businessInfo.phone}`}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-brand bg-brand px-5 py-2.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
          >
            Call {businessInfo.phoneDisplay}
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-border bg-white md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg px-3 py-2.5 text-base font-semibold text-brand',
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
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-base font-semibold text-brand-foreground"
            >
              <Phone className="h-4 w-4" /> Call {businessInfo.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
