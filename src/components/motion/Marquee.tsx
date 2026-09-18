'use client'

import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface MarqueeProps {
  children: React.ReactNode
  /** Seconds for one full pass. Larger = slower. */
  duration?: number
  reverse?: boolean
  /** Pause the scroll while the pointer is over the track. */
  pauseOnHover?: boolean
  className?: string
}

/**
 * Infinite horizontal marquee.
 *
 * The track holds the children twice and translates by exactly -50%, so the
 * second copy lands where the first started and the loop is seamless. The
 * duplicate is aria-hidden — the content is announced once, not twice.
 *
 * Animation is pure CSS (a transform keyframe on the compositor) rather than a
 * per-frame JS loop, so it costs nothing on the main thread while the user
 * scrolls past it. Under prefers-reduced-motion the track stops and the row
 * becomes a plain horizontally scrollable strip.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={cn(
        'group relative flex w-full overflow-hidden',
        reduceMotion && 'overflow-x-auto',
        className
      )}
    >
      <div
        className={cn(
          'flex w-max shrink-0 items-center',
          !reduceMotion && (reverse ? 'animate-marquee-reverse' : 'animate-marquee'),
          !reduceMotion && pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
