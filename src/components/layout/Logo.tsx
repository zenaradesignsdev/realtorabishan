import { cn } from '@/lib/cn'

interface LogoProps {
  /** 'light' = on white nav background · 'dark' = on the teal footer background */
  variant?: 'light' | 'dark'
  className?: string
}

/**
 * House-roof pictogram mark, reproduced from the design export as a real SVG
 * (the original used stacked clip-path divs purely for decoration).
 */
export function Logo({ variant = 'light', className }: LogoProps) {
  const isDark = variant === 'dark'

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] border',
          isDark ? 'border-white/15 bg-white/5' : 'border-terracotta/40 bg-gradient-to-br from-[#123255] to-brand'
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 22" className="h-[21px] w-[23px]">
          <path d="M12 0 L24 9 V22 H0 V9 Z" fill="#F0C4A8" />
          <path d="M12 2.4 L21.6 9.6 V19.6 H2.4 V9.6 Z" fill={isDark ? '#0E3B36' : '#0E3B36'} />
          <rect x="10.5" y="8" width="3" height="3" rx="0.6" fill="#F0C4A8" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            'whitespace-nowrap font-display text-base font-semibold tracking-tight',
            isDark ? 'text-white' : 'text-brand'
          )}
        >
          Abishan Umashanker
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta">
          Realtor&reg;
        </span>
      </span>
    </span>
  )
}
