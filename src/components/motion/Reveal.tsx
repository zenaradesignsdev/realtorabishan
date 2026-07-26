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
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const travel = reduceMotion ? 0 : 16

  return (
    <m.div
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
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
