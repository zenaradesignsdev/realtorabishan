'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { businessInfo } from '@/lib/metadata'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Route-level error boundary. Rendered inside the root layout, so the header and
 * footer survive and the visitor is never stranded without navigation.
 *
 * `digest` is the only detail shown: in a production build the real message is
 * stripped before it reaches the client, and surfacing a raw stack on a
 * trust-critical site would be worse than useless anyway. The digest is what
 * matches this render to a line in the platform's logs.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[100svh] flex-col justify-center bg-ink px-5 pb-16 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-shell">
        <p className="type-label flex items-center gap-x-3 text-terracotta">
          <span className="inline-block h-px w-10 bg-terracotta" aria-hidden="true" />
          Something went wrong
        </p>

        <h1 className="type-display mt-7 max-w-3xl text-[2.8rem] text-white short:mt-5 short:text-[2.3rem] xs:text-[3.2rem] sm:text-6xl lg:text-[5rem]">
          That did not load.
        </h1>

        <p className="mt-7 max-w-lg text-lg leading-[1.7] text-white/60">
          An unexpected error stopped this page from rendering. Trying again usually clears it. If
          it does not, call or email and Abishan will pick it up directly.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-7 py-4 text-base font-semibold text-brand transition-colors duration-300 hover:bg-terracotta hover:text-white"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/25 px-7 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-white/60"
          >
            Back to the home page
          </Link>
          <a
            href={`tel:${businessInfo.phone}`}
            className="type-label inline-flex min-h-[44px] items-center text-white/45 transition-colors duration-300 hover:text-white sm:px-2"
          >
            {businessInfo.phoneDisplay}
          </a>
        </div>

        {error.digest ? (
          <p className="type-label mt-14 border-t rule-dark pt-6 text-white/25">
            Reference {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  )
}
