import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/metadata'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutStory } from '@/components/about/AboutStory'
import { ValuesGrid } from '@/components/about/ValuesGrid'
import { TrustSection } from '@/components/about/TrustSection'
import { AwardsSection } from '@/components/about/AwardsSection'
import { Testimonials } from '@/components/shared/Testimonials'
import { CtaBand } from '@/components/shared/CtaBand'
import { TESTIMONIALS } from '@/lib/testimonials'

export const metadata: Metadata = buildMetadata({
  title: 'Meet Abishan — Toronto REALTOR®',
  description:
    'Meet Abishan Umashanker, a Toronto-based REALTOR® focused on leasing, with a client-first approach built on trust, transparency, and local market knowledge across the GTA.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <ValuesGrid />
      <TrustSection />
      <AwardsSection />
      <Testimonials
        items={TESTIMONIALS}
        eyebrow="In their words"
        title="What it is actually like."
        // Index 0 is the 647-character review: set in display serif it runs
        // roughly fifteen lines on a phone. It stays in full in the marquee
        // below; the featured slot takes a shorter one (home uses index 3).
        featuredIndex={2}
      />
      <CtaBand
        title="Ask him something."
        description="A question about a lease clause, a rent that looks wrong, or whether now is the time to buy — there is no charge for a straight answer."
      />
    </main>
  )
}
