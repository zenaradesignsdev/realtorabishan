import { ArrowUpRight, Star } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { CountUp } from '@/components/motion/CountUp'
import { Image } from '@/components/ui/image'
import { businessInfo } from '@/lib/metadata'

const PROFILES = [
  {
    href: businessInfo.realtorProfileUrl,
    label: 'Realtor.ca',
    note: 'The CREA member listing, kept current.',
  },
  {
    href: businessInfo.rankMyAgentUrl,
    label: 'RankMyAgent',
    note: 'Independent agent profile and reviews.',
  },
  {
    href: businessInfo.reviewsUrl,
    label: 'Google Reviews',
    note: `All ${businessInfo.rating.count}, unedited.`,
  },
] as const

export function TrustSection() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-8 border-b rule-dark pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <Reveal travel={0}>
              <p className="type-label text-terracotta">Credentials</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2.1rem] text-white xs:text-[2.4rem] sm:text-5xl lg:text-[3.4rem]"
            >
              Check any of it yourself.
            </WordReveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-base leading-[1.75] text-white/55 sm:text-[17px]">
              Registration, brokerage, and every review are on public record. Nothing here needs to
              be taken on trust.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-12 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <a
              href={businessInfo.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-end gap-5">
                <span className="type-display text-7xl text-white sm:text-8xl">
                  <CountUp to={businessInfo.rating.value} decimals={1} />
                </span>
                <span className="pb-3">
                  <span className="flex gap-1 text-terracotta" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </span>
                  <span className="type-label mt-3 block text-white/35">
                    {businessInfo.rating.count} reviews
                  </span>
                </span>
              </div>
              <p className="mt-7 max-w-sm text-base leading-[1.75] text-white/55">
                Written by tenants, landlords, and buyers across Toronto and the GTA. The words that
                come up most are &ldquo;responsive&rdquo;, &ldquo;listened&rdquo;, and
                &ldquo;smooth&rdquo;.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-white">
                <span className="border-b border-terracotta pb-1">Read them on Google</span>
                <ArrowUpRight
                  className="h-4 w-4 text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <div className="flex flex-col gap-6 border-b rule-dark pb-9 sm:flex-row sm:items-center sm:gap-8">
                <span className="flex w-fit shrink-0 items-center rounded-sm bg-white px-4 py-2.5">
                  <Image
                    src="/images/royal-lepage-ignite.png"
                    alt={businessInfo.brokerage}
                    width={600}
                    height={142}
                    sizes="101px"
                    className="h-6 w-auto"
                  />
                </span>
                <p className="text-[15px] leading-[1.75] text-white/55">
                  Registered with Royal LePage Ignite Realty Brokerage in Scarborough, part of the
                  Royal LePage network &mdash; in business since 1913, with more than 670 offices
                  across Canada.
                </p>
              </div>
            </Reveal>

            <ul className="mt-2">
              {PROFILES.map((profile, i) => (
                <Reveal key={profile.label} delay={0.1 + i * 0.05}>
                  <li>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-5 border-b rule-dark py-5 transition-colors"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="type-heading block text-lg text-white transition-colors group-hover:text-terracotta sm:text-xl">
                          {profile.label}
                        </span>
                        <span className="mt-1 block text-sm text-white/40">{profile.note}</span>
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-terracotta group-hover:bg-terracotta">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
