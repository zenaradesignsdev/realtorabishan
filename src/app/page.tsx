import type { Metadata } from 'next'
import { generateMetadata as buildMetadata, businessInfo } from '@/lib/metadata'
import { Hero } from '@/components/home/Hero'
import { AreaMarquee } from '@/components/home/AreaMarquee'
import { LeaseSplit } from '@/components/home/LeaseSplit'
import { ServiceIndex } from '@/components/home/ServiceIndex'
import { WhyWorkWithAbishan } from '@/components/home/WhyWorkWithAbishan'
import { ShowcaseBand } from '@/components/home/ShowcaseBand'
import { Testimonials } from '@/components/shared/Testimonials'
import { CtaBand } from '@/components/shared/CtaBand'
import { TESTIMONIALS } from '@/lib/testimonials'

export const metadata: Metadata = buildMetadata({
  title: 'Leasing in Toronto & the GTA',
  description: `Abishan Umashanker is a Toronto-based REALTOR® focused on leasing — rentals for tenants and landlords across the GTA, plus buying and selling. Rated ${businessInfo.rating.value.toFixed(1)} across ${businessInfo.rating.count} Google reviews.`,
  path: '/',
})

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AreaMarquee />
      <LeaseSplit />
      <ServiceIndex />
      <WhyWorkWithAbishan />
      <ShowcaseBand />
      <Testimonials
        items={TESTIMONIALS}
        title="Rated 5.0, one lease at a time."
        featuredIndex={3}
      />
      <CtaBand
        title="Tell me what you are looking for."
        description="A place to lease, a unit to fill, or a first home to buy — start with a short, no-pressure conversation and you will leave it knowing what the plan is."
      />
    </main>
  )
}
