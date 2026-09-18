import { cn } from '@/lib/cn'

interface LogoProps {
  /** 'light' sits on a light ground · 'dark' sits on the ink/teal ground */
  variant?: 'light' | 'dark'
  className?: string
}

export function Logo({ variant = 'light', className }: LogoProps) {
  const isDark = variant === 'dark'

  return (
    <span className={cn('flex min-w-0 flex-col gap-1', className)}>
      <span
        className={cn(
          'type-heading truncate text-[17px] sm:text-lg',
          isDark ? 'text-white' : 'text-brand'
        )}
      >
        Abishan Umashanker
      </span>
      <span
        className={cn(
          // 9.5px was unreadable on a phone; `type-label` is already tracked
          // out, so 10.5px holds the same proportion against the wordmark.
          'type-label text-[10.5px] sm:text-[10px]',
          isDark ? 'text-white/45' : 'text-brand/45'
        )}
      >
        Realtor&reg; &middot; Toronto
      </span>
    </span>
  )
}
