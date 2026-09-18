import Link from 'next/link'
import { ArrowUpRight, Phone, MapPin } from 'lucide-react'
import { businessInfo } from '@/lib/metadata'
import { Image } from '@/components/ui/image'

const EXPLORE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

const PROFILE_LINKS = [
  { href: businessInfo.realtorProfileUrl, label: 'Realtor.ca' },
  { href: businessInfo.rankMyAgentUrl, label: 'RankMyAgent' },
  { href: businessInfo.reviewsUrl, label: 'Google Reviews' },
  { href: businessInfo.rentalManagementUrl, label: 'AirFVH — rental management' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-shell px-5 pt-20 sm:px-8 md:pt-28 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b rule-dark pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.75fr_0.85fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <p className="type-heading text-2xl text-white">Abishan Umashanker</p>
            <p className="type-label mt-2 text-terracotta">Realtor&reg; &middot; Toronto</p>
            <p className="mt-6 text-[15px] leading-relaxed text-white/55">
              Leasing across Toronto and the GTA &mdash; tenants placed, units filled, and buying
              and selling representation whenever you need it.
            </p>
            {/* Black-and-red artwork on a transparent ground — it needs a
                white chip on the ink footer rather than a colour filter. */}
            <div className="mt-7 inline-flex items-center rounded-sm bg-white px-4 py-2.5">
              <Image
                src="/images/royal-lepage-ignite.png"
                alt={businessInfo.brokerage}
                width={600}
                height={142}
                sizes="84px"
                className="h-5 w-auto"
              />
            </div>
          </div>

          <div>
            <h2 className="type-label text-white/35">Explore</h2>
            <ul className="mt-5 flex flex-col">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-3 text-[15px] text-white/70 transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-label text-white/35">Profiles</h2>
            <ul className="mt-5 flex flex-col">
              {PROFILE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 py-3 text-[15px] text-white/70 transition-colors hover:text-terracotta"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-label text-white/35">Get in touch</h2>
            <a
              href={`tel:${businessInfo.phone}`}
              className="mt-3.5 flex w-fit items-center gap-2.5 py-3 text-[15px] text-white/70 transition-colors hover:text-terracotta"
            >
              <Phone className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              {businessInfo.phoneDisplay}
            </a>
            <div className="mt-4 flex items-start gap-2.5 text-[15px] leading-relaxed text-white/55">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              <address className="not-italic">
                {businessInfo.streetAddress}
                <br />
                {businessInfo.addressLocality}, {businessInfo.addressRegion}{' '}
                {businessInfo.postalCode}
                <br />
                <span className="text-white/40">{businessInfo.brokerage}</span>
              </address>
            </div>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-terracotta-solid py-2 pl-6 pr-2 text-white transition-colors hover:bg-terracotta"
            >
              <span className="type-label">Book a consultation</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-out group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/*
          Oversized wordmark as a closing plate. It is decorative — the real
          name is already in the column above and in the copyright line — so it
          is hidden from assistive tech rather than announced a third time.
        */}
        <div aria-hidden="true" className="pointer-events-none select-none pt-14">
          <span className="type-display block whitespace-nowrap text-[15vw] leading-[0.85] text-white/[0.055]">
            Toronto &middot; GTA
          </span>
        </div>
      </div>

      <div className="border-t rule-dark">
        <div className="mx-auto flex max-w-shell flex-col-reverse gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <span className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {businessInfo.legalName}, Realtor&reg;. All rights
            reserved.
          </span>
          <span className="max-w-2xl text-xs leading-relaxed text-white/40">
            REALTOR&reg; is a trademark identifying real estate professionals who are members of
            CREA. {businessInfo.brokerage}. Not intended to solicit clients currently under
            contract.
          </span>
        </div>
      </div>
    </footer>
  )
}
