import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/metadata'
import { ServicesHero } from '@/components/services/ServicesHero'
import { ServicesGrid } from '@/components/services/ServicesGrid'
import { ProcessCta } from '@/components/services/ProcessCta'

export const metadata: Metadata = buildMetadata({
  title: 'Real Estate Services — Toronto & GTA',
  description:
    'Full-service real estate representation across Toronto and the GTA — buying, selling, investing, commercial, new construction, rentals, and more.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <ProcessCta />
    </main>
  )
}
