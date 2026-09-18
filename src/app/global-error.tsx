'use client'

import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Last-resort boundary for errors thrown by the root layout itself.
 *
 * It replaces the layout rather than rendering inside it, so it has to supply
 * its own <html> and <body> — and it cannot rely on anything the layout sets up:
 * no font variables, no Tailwind layer, no nav. The styles are therefore inline
 * rather than classes, because a failure in the stylesheet pipeline is one of
 * the things that can land a visitor here.
 *
 * In practice this should never render: every page is statically generated and
 * the layout has no data fetching. It exists so that if it ever does, the
 * visitor still gets Abishan's phone number instead of a browser error page.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#050F0E',
          color: '#FAFAFA',
          padding: '2rem 1.25rem',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ margin: '0 auto', width: '100%', maxWidth: '38rem' }}>
          <p
            style={{
              margin: 0,
              fontSize: '0.6875rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#C96F4A',
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              margin: '1.5rem 0 0',
              fontSize: 'clamp(2rem, 7vw, 3rem)',
              lineHeight: 1.1,
              fontWeight: 500,
            }}
          >
            That did not load.
          </h1>
          <p
            style={{
              margin: '1.5rem 0 0',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: 'rgba(250, 250, 250, 0.6)',
            }}
          >
            An unexpected error stopped the page from rendering. Reloading usually clears it. If it
            does not, call Abishan on{' '}
            <a href="tel:+1-647-234-4511" style={{ color: '#FAFAFA' }}>
              (647) 234-4511
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '2.25rem',
              minHeight: '44px',
              padding: '0.875rem 1.75rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: '#FAFAFA',
              color: '#0E3B36',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          {error.digest ? (
            <p
              style={{
                margin: '3rem 0 0',
                fontSize: '0.6875rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(250, 250, 250, 0.25)',
              }}
            >
              Reference {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  )
}
