import type { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/lib/metadata'
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
      <section className="border-b border-border bg-gradient-to-b from-surface to-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
            Contact
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-brand sm:text-5xl">
            Let&rsquo;s start the conversation
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Tell me a little about what you are looking for and I&rsquo;ll be in touch. Prefer to
            talk? Call any time.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-8">
        <ContactInfo />
        <ContactForm />
      </section>
    </main>
  )
}
