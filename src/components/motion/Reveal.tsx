'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { ANIMATION_VARIANTS } from '@/lib/animations'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

/**
 * Scroll-triggered fade/slide-up used across every marketing section.
 * Reveals once and stays revealed — not a repeating distraction on every
 * scroll pass. Respects prefers-reduced-motion by collapsing to a plain
 * opacity fade with no vertical travel.
 *
 * This deliberately does not use IntersectionObserver/whileInView. That
 * approach only reports a crossing it can actually catch between two
 * paints — a single-frame scroll jump (scrollbar drag-to-bottom, an
 * instant `window.scrollTo`, `scrollIntoView`) can carry a section from
 * "below the viewport" straight to "above the viewport" with no
 * intersecting frame in between, so the observer's callback never fires
 * again and the section is stuck at opacity: 0 until reload. Verified
 * against a production build: a single instant `scrollTo` to the bottom
 * of the page left every below-the-fold section permanently invisible,
 * even with a generous rootMargin.
 *
 * Checking geometry directly on every `scroll`/`resize` event instead
 * guarantees a check runs after any scroll, however large the jump, so a
 * skipped section still gets caught.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const travel = reduceMotion ? 0 : 16
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight + 200) {
        setVisible(true)
      }
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [visible])

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: travel }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: travel }}
      transition={{
        duration: reduceMotion ? 0 : ANIMATION_VARIANTS.slideUp.transition.duration,
        delay,
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
