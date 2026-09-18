import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/metadata'
import { ServicesHero } from '@/components/services/ServicesHero'
import { ServicesGrid } from '@/components/services/ServicesGrid'
import { ProcessCta } from '@/components/services/ProcessCta'
import { CtaBand } from '@/components/shared/CtaBand'

export const metadata: Metadata = buildMetadata({
  title: 'Leasing & Real Estate Services — Toronto & GTA',
  description:
    'Leasing-focused real estate services across Toronto and the GTA — rentals for tenants and landlords, property management, commercial leasing, buying, selling, and new construction.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <ProcessCta />
      <CtaBand
        title="Not sure which one you need?"
        description="Describe the situation and the right service usually names itself. If it turns out you need something Abishan does not handle, he will tell you who does."
      />
    </main>
  )
}
