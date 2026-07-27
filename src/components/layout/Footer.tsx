import Link from 'next/link'
import { Phone, ExternalLink, MapPin } from 'lucide-react'
import { businessInfo } from '@/lib/metadata'
import { Logo } from '@/components/layout/Logo'
import { Image } from '@/components/ui/image'

const EXPLORE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="max-w-xs">
          <Logo variant="dark" className="mb-5" />
          <p className="text-sm leading-relaxed text-white/70">
            Client-first real estate guidance for buying, selling, and investing across Toronto and
            the GTA.
          </p>
          <div className="mt-5 inline-flex items-center rounded-lg bg-white px-3 py-2">
            <Image
              src="/images/royal-lepage-ignite.png"
              alt={businessInfo.brokerage}
              width={600}
              height={142}
              className="h-6 w-auto"
            />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
            Explore
          </h2>
          <ul className="flex flex-col">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-2 text-sm text-white/80 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
            Get in touch
          </h2>
          <ul className="flex flex-col gap-1 text-sm text-white/80">
            <li>
              <a
                href={`tel:${businessInfo.phone}`}
                className="inline-flex items-center gap-2 py-2 hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                {businessInfo.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={businessInfo.realtorProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2 hover:text-white"
              >
                <ExternalLink className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                Realtor.ca profile
              </a>
            </li>
            <li className="flex items-start gap-2 py-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              <address className="not-italic">
                {businessInfo.streetAddress}, {businessInfo.addressLocality},{' '}
                {businessInfo.addressRegion}
                <br />
                {businessInfo.brokerage}
              </address>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
            Ready to move?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta-solid px-6 py-3 text-sm font-bold text-white hover:bg-terracotta-solid/90"
          >
            Book a Consultation
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-3 px-4 py-5 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <span className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {businessInfo.legalName}, Realtor&reg;. All rights
            reserved.
          </span>
          <span className="max-w-xl text-xs text-white/60">
            REALTOR&reg; is a trademark identifying real estate professionals who are members of
            CREA. {businessInfo.brokerage}. Not intended to solicit clients currently under
            contract.
          </span>
        </div>
      </div>
    </footer>
  )
}
