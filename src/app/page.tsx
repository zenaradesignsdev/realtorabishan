import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/metadata'
import { Hero } from '@/components/home/Hero'
import { WhyWorkWithAbishan } from '@/components/home/WhyWorkWithAbishan'
import { ShowcaseBand } from '@/components/home/ShowcaseBand'
import { FeaturedServices } from '@/components/home/FeaturedServices'
import { Reputation } from '@/components/home/Reputation'
import { Testimonials } from '@/components/shared/Testimonials'
import { CtaBand } from '@/components/shared/CtaBand'
import { TESTIMONIALS } from '@/lib/testimonials'
import { businessInfo } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Toronto & GTA Realtor',
  description: `Abishan Umashanker is a Toronto-based REALTOR® helping buyers, sellers, and investors move forward with confidence. Rated ${businessInfo.rating.value.toFixed(1)} across ${businessInfo.rating.count} Google reviews.`,
  path: '/',
})

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhyWorkWithAbishan />
      <ShowcaseBand />
      <FeaturedServices />
      <Reputation />
      <Testimonials
        items={TESTIMONIALS.slice(0, 3)}
        title="What clients are saying"
        description="Recent reviews from buyers, sellers, and renters across Toronto and the GTA."
        className="border-t border-border bg-surface"
      />
      <CtaBand
        title="Let’s talk about your next move"
        description="Whether you are buying your first home, selling, or investing, book a no-pressure consultation to map out the plan."
      />
    </main>
  )
}
