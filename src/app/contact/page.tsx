import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/metadata'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Abishan Umashanker, REALTOR®, for a no-pressure chat about buying, selling, or investing in Toronto and the GTA. Call or text any time.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-8">
        <ContactInfo />
        <ContactForm />
      </section>
    </main>
  )
}
