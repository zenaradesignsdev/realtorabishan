import { Fraunces, Manrope } from 'next/font/google'

/**
 * Display: Fraunces · Body: Manrope.
 *
 * Fraunces is loaded as a variable font with its optical-size, SOFT and WONK
 * axes exposed so headings can be tuned per size — large display type wants a
 * high `opsz` (thinner hairlines, tighter joins) while small caps labels want
 * a low one. The `font-display-*` utilities in globals.css set those.
 */

export const fontSans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const fontDisplay = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})
