import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { businessInfo } from '@/lib/metadata'

const ELSEWHERE = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Abishan' },
  { href: '/contact', label: 'Contact' },
] as const

/**
 * Rendered inside the root layout, so the fixed header sits over it — hence the
 * top padding, matching the page heroes. Ink ground for the same reason every
 * page opens dark: a 404 on a white card would be the one screen on the site
 * that looks like a default.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-center bg-ink px-5 pb-16 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-shell">
        <p className="type-label flex items-center gap-x-3 text-terracotta">
          <span className="inline-block h-px w-10 bg-terracotta" aria-hidden="true" />
          Error 404
        </p>

        <h1 className="type-display mt-7 max-w-3xl text-[2.8rem] text-white short:mt-5 short:text-[2.3rem] xs:text-[3.2rem] sm:text-6xl lg:text-[5rem]">
          This page is off the market.
        </h1>

        <p className="mt-7 max-w-lg text-lg leading-[1.7] text-white/60">
          The address you followed does not lead anywhere &mdash; it may have moved, or never
          existed. Everything else is one link away.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-between gap-4 rounded-full bg-white py-2 pl-7 pr-2 text-brand transition-colors duration-300 hover:bg-terracotta hover:text-white sm:justify-start"
          >
            <span className="text-base font-semibold">Back to the home page</span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-500 ease-out group-hover:rotate-45 motion-reduce:transition-none">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
          <a
            href={`tel:${businessInfo.phone}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/25 px-7 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-white/60"
          >
            Call {businessInfo.phoneDisplay}
          </a>
        </div>

        <nav aria-label="Other pages" className="mt-14 border-t rule-dark pt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-1">
            {ELSEWHERE.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="type-label inline-flex min-h-[44px] items-center text-white/45 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  )
}
