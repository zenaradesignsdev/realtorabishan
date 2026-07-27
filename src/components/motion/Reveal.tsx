'use client'

import { m, useReducedMotion } from 'framer-motion'
import { ANIMATION_VARIANTS } from '@/lib/animations'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

/**
 * Scroll-triggered fade/slide-up used across every marketing section.
 * `viewport={{ once: true }}` keeps it a one-time entrance, not a
 * repeating distraction on every scroll pass. Respects prefers-reduced-motion
 * by collapsing to a plain opacity fade with no vertical travel.
 *
 * `margin` is a *positive* 200px, expanding the trigger zone beyond the
 * viewport rather than shrinking it. A negative margin here previously let
 * a single fast scroll (a real flick, common on first visit) carry a section
 * across the whole shrunk zone within one frame, so the IntersectionObserver
 * never reported it as intersecting and — since `once: true` — it never got
 * a second chance, leaving it permanently stuck at opacity: 0 until a reload.
 * A generous positive margin makes that window much harder to skip.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const travel = reduceMotion ? 0 : 16

  return (
    <m.div
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '200px 0px' }}
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
