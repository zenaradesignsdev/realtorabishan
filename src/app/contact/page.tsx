import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/metadata'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Abishan Umashanker, REALTOR®, for a no-pressure chat about leasing, buying, or selling in Toronto and the GTA. Call or text any time.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-shell grid-cols-1 items-start gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
