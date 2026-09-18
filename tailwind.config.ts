import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        // Small-phone step. 360px devices get the tighter display size; the
        // 390px+ majority get the larger one without waiting for `sm`.
        xs: '400px',
        // Landscape phones. Width breakpoints alone treat a 740x360 handset as
        // a tablet, so it gets `sm:`/`md:` display type in a 360px-tall window
        // and the headline eats the whole screen. This targets height instead.
        short: { raw: '(max-height: 480px) and (orientation: landscape)' },
      },
      fontFamily: {
        // Swap these CSS variables per client in fonts.ts + globals.css
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      colors: {
        // shadcn/ui CSS variable tokens — do not remove
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Per-client brand colours — add in globals.css as CSS variables
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
          muted: 'hsl(var(--brand-muted))',
        },
        // Warm terracotta accent — decorative use only, see globals.css note
        terracotta: {
          DEFAULT: 'hsl(var(--terracotta))',
          solid: 'hsl(var(--terracotta-solid))',
          tint: 'hsl(var(--terracotta-tint))',
          border: 'hsl(var(--terracotta-tint-border))',
          ink: 'hsl(var(--terracotta-ink))',
        },
        // Warm cream section background
        surface: 'hsl(var(--surface))',
        // Dark editorial ground — deepened teal ramp used by the dark bands
        ink: {
          DEFAULT: 'hsl(var(--ink))',
          muted: 'hsl(var(--ink-muted))',
        },
        teal: {
          950: 'hsl(var(--teal-950))',
          700: 'hsl(var(--teal-700))',
        },
      },
      maxWidth: {
        shell: '82rem',
      },
      letterSpacing: {
        label: '0.18em',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'marquee-reverse': {
          from: { transform: 'translate3d(-50%, 0, 0)' },
          to: { transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--marquee-duration, 40s) linear infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
