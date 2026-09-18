'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Reports `true` once the element has come within `margin` px of the viewport
 * bottom, and never flips back.
 *
 * This deliberately does not use IntersectionObserver/whileInView. That
 * approach only reports a crossing it can actually catch between two paints —
 * a single-frame scroll jump (scrollbar drag-to-bottom, an instant
 * `window.scrollTo`, `scrollIntoView`) can carry a section from "below the
 * viewport" straight to "above the viewport" with no intersecting frame in
 * between, so the observer's callback never fires and the section is stuck at
 * opacity: 0 until reload. Verified against a production build: a single
 * instant `scrollTo` to the bottom of the page left every below-the-fold
 * section permanently invisible, even with a generous rootMargin.
 *
 * Checking geometry directly on every scroll/resize event instead guarantees a
 * check runs after any scroll, however large the jump, so a skipped section
 * still gets caught.
 */
export function useRevealOnce<T extends HTMLElement>(margin = 200) {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || revealed) return

    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight + margin) {
        setRevealed(true)
      }
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [revealed, margin])

  return { ref, revealed }
}
