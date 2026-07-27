import { cn } from '@/lib/cn'

interface LogoProps {
  /** 'light' = on white nav background · 'dark' = on the teal footer background */
  variant?: 'light' | 'dark'
  className?: string
}

export function Logo({ variant = 'light', className }: LogoProps) {
  const isDark = variant === 'dark'

  return (
    <span className={cn('flex min-w-0 flex-col leading-tight', className)}>
      <span
        className={cn(
          'truncate font-display text-sm font-semibold tracking-tight sm:text-base',
          isDark ? 'text-white' : 'text-brand'
        )}
      >
        Abishan Umashanker
      </span>
      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta">
        Realtor&reg;
      </span>
    </span>
  )
}
