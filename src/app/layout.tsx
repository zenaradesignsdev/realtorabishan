import type { Metadata } from 'next'
import { fontDisplay, fontSans } from '@/lib/fonts'
import { Providers } from '@/providers/Providers'
import { generateMetadata } from '@/lib/metadata'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { OrganizationJsonLd } from '@/components/JsonLd'
import '@/app/globals.css'

export const metadata: Metadata = generateMetadata()

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
