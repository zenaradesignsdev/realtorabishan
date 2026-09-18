'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useRevealOnce } from '@/hooks/useRevealOnce'

interface CountUpProps {
  to: number
  /** Decimal places to render — 1 for a 5.0 rating, 0 for a review count. */
  decimals?: number
  duration?: number
  suffix?: string
  className?: string
}

/**
 * Counts a figure up once it scrolls into view. The final value is what gets
 * rendered on the server and under prefers-reduced-motion, so the number is
 * never missing or wrong for anyone who does not see the animation.
 */
export function CountUp({ to, decimals = 0, duration = 1400, suffix, className }: CountUpProps) {
  const reduceMotion = useReducedMotion()
  const { ref, revealed } = useRevealOnce<HTMLSpanElement>(60)
  const [value, setValue] = useState(to)

  useEffect(() => {
    if (reduceMotion) return
    if (!revealed) {
      setValue(0)
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Same ease-out curve the reveals use, so figures settle on the beat.
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(to * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [revealed, reduceMotion, to, duration])

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
