'use client'

import { m, useReducedMotion } from 'framer-motion'
import { useRevealOnce } from '@/hooks/useRevealOnce'
import { cn } from '@/lib/cn'

interface WordRevealProps {
  /** Plain text — split on spaces, so no markup inside. */
  children: string
  className?: string
  /** Seconds before the first word starts. */
  delay?: number
  /** Seconds between consecutive words. */
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

/**
 * Per-word crossfade with a small upward drift — a calm, keynote-paced
 * entrance for headlines, rather than the whole block sliding as one slab.
 *
 * The full string stays in the accessibility tree via aria-label while the
 * animated word spans are hidden from it, so screen readers read one sentence
 * instead of a stream of fragments.
 */
export function WordReveal({
  children,
  className,
  delay = 0,
  stagger = 0.055,
  as: Tag = 'span',
}: WordRevealProps) {
  const reduceMotion = useReducedMotion()
  const { ref, revealed } = useRevealOnce<HTMLSpanElement>(80)
  const words = children.split(' ')
  const play = revealed && !reduceMotion

  return (
    <Tag className={cn(className)}>
      <span ref={ref} aria-label={children} className="inline">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} aria-hidden="true" className="inline-block whitespace-pre">
            <m.span
              className="inline-block"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: '0.32em' }}
              animate={play ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.75,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </m.span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </Tag>
  )
}
