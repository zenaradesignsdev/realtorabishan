import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/metadata'
import { AboutHero } from '@/components/about/AboutHero'
import { ValuesGrid } from '@/components/about/ValuesGrid'
import { RatingStrip } from '@/components/about/RatingStrip'
import { CtaBand } from '@/components/shared/CtaBand'

export const metadata: Metadata = buildMetadata({
  title: 'Meet Abishan — Toronto REALTOR®',
  description:
    'Meet Abishan Umashanker, a Toronto-based REALTOR® with a client-first approach built on trust, transparency, and local market knowledge across the GTA.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <ValuesGrid />
      <RatingStrip />
      <CtaBand
        title="Have a question about your next move?"
        description="Reach out for a friendly, no-pressure conversation about buying, selling, or investing."
      />
    </main>
  )
}
