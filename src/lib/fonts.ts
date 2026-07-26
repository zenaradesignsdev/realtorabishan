import { Manrope, Space_Grotesk } from 'next/font/google'

/**
 * Body: Manrope · Display: Space Grotesk — matches the approved design export.
 */

export const fontSans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
})
