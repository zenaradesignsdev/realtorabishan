'use client'

import { m, useReducedMotion } from 'framer-motion'
import { useRevealOnce } from '@/hooks/useRevealOnce'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Vertical travel in px before settling. 0 gives a pure crossfade. */
  travel?: number
}

/**
 * Scroll-triggered fade/slide-up used across every marketing section. Reveals
 * once and stays revealed — not a repeating distraction on every scroll pass.
 * Respects prefers-reduced-motion by collapsing to a plain opacity fade with no
 * vertical travel. See useRevealOnce for why this is geometry-driven rather
 * than an IntersectionObserver.
 */
export function Reveal({ children, className, delay = 0, travel = 18 }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const distance = reduceMotion ? 0 : travel
  const { ref, revealed } = useRevealOnce<HTMLDivElement>()

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </m.div>
  )
}
