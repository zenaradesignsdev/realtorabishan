import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/metadata'
import { AboutHero } from '@/components/about/AboutHero'
import { ValuesGrid } from '@/components/about/ValuesGrid'
import { TrustSection } from '@/components/about/TrustSection'
import { Testimonials } from '@/components/shared/Testimonials'
import { CtaBand } from '@/components/shared/CtaBand'
import { TESTIMONIALS } from '@/lib/testimonials'

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
      <TrustSection />
      <Testimonials
        items={TESTIMONIALS.slice(2)}
        eyebrow="In Their Words"
        title="Clients on working with Abishan"
        description="A few of the reviews that reflect the day-to-day experience of working together."
      />
      <CtaBand
        title="Have a question about your next move?"
        description="Reach out for a friendly, no-pressure conversation about buying, selling, or investing."
      />
    </main>
  )
}
