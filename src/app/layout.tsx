import type { Metadata, Viewport } from 'next'
import { fontDisplay, fontSans } from '@/lib/fonts'
import { Providers } from '@/providers/Providers'
import { generateMetadata } from '@/lib/metadata'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { OrganizationJsonLd } from '@/components/JsonLd'
import '@/app/globals.css'

export const metadata: Metadata = generateMetadata()

/**
 * Every page opens on a full-bleed ink hero, so the mobile browser chrome is
 * tinted to match — without this the Safari/Chrome toolbar renders a light bar
 * hard against the dark hero and the page stops reading as full-bleed.
 */
export const viewport: Viewport = {
  themeColor: '#050F0E',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <body>
        <OrganizationJsonLd />
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
