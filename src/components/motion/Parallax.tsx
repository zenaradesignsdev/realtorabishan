'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface ParallaxProps {
  children: React.ReactNode
  /** Total vertical drift across a full pass, as a % of the child's height. */
  amount?: number
  className?: string
}

/**
 * Scroll-linked vertical drift for full-bleed imagery. The child is scaled up
 * by `amount` so the drift never exposes an edge.
 *
 * This deliberately does not use framer-motion's `useScroll`. Because
 * globals.css puts a non-visible `overflow-x` on <html>, motion resolves the
 * root element as the scroll container, and a static-positioned container makes
 * its offset maths wrong: progress pinned at a constant and the image never
 * moved (it also logs a "container has a non-static position" warning).
 * Measuring the element's own rect against the viewport avoids the question
 * entirely, and matches how Reveal handles scroll for the same reason.
 *
 * The transform is written straight to the node inside a rAF, never through
 * state — a state update per scroll frame would re-render the subtree for a
 * purely visual effect.
 */
export function Parallax({ children, amount = 12, className }: ParallaxProps) {
  const reduceMotion = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion) return
    const frame = frameRef.current
    const inner = innerRef.current
    if (!frame || !inner) return

    let raf = 0

    const read = () => {
      raf = 0
      const rect = frame.getBoundingClientRect()
      const span = window.innerHeight + rect.height
      if (span <= 0) return
      // 0 when the element's top edge first enters from below, 1 once its
      // bottom edge has left the top — the same window as an
      // ['start end', 'end start'] offset.
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / span, 0), 1)
      const shift = (progress - 0.5) * amount
      inner.style.transform = `translate3d(0, ${shift}%, 0) scale(${1 + amount / 100})`
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduceMotion, amount])

  return (
    <div ref={frameRef} className={cn('relative overflow-hidden', className)}>
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        style={
          reduceMotion ? undefined : { transform: `translate3d(0, 0, 0) scale(${1 + amount / 100})` }
        }
      >
        {children}
      </div>
    </div>
  )
}
