import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { Image } from '@/components/ui/image'
import { SERVICES } from '@/lib/services'
import { cn } from '@/lib/cn'
import type { ServiceEntry } from '@/lib/services'

/** The two leasing services get the full-width treatment; the rest are indexed. */
const FEATURED_COUNT = 2

function ServiceLink({ service }: { service: ServiceEntry }) {
  if (!service.linkHref) return null
  return (
    <a
      href={service.linkHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link mt-7 inline-flex items-center gap-2.5 rounded-full bg-terracotta-solid py-2 pl-6 pr-2 text-white transition-colors duration-300 hover:bg-terracotta"
    >
      <span className="type-label">{service.linkLabel}</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-out group-hover/link:rotate-45">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </a>
  )
}

export function ServicesGrid() {
  const featured = SERVICES.slice(0, FEATURED_COUNT)
  const rest = SERVICES.slice(FEATURED_COUNT)

  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <Reveal travel={0}>
            <p className="type-label text-terracotta-ink">The practice</p>
          </Reveal>
          <WordReveal
            as="h2"
            className="type-heading mt-6 max-w-3xl text-[2.1rem] text-brand xs:text-[2.4rem] sm:text-5xl lg:text-[3.4rem]"
          >
            Leasing, in both directions.
          </WordReveal>

          <div className="mt-16 flex flex-col gap-20 md:gap-28">
            {featured.map((service, i) => (
              <article
                key={service.slug}
                id={service.slug}
                // Clears the fixed header when an anchor link lands here.
                className="scroll-mt-28"
              >
                <div
                  className={cn(
                    'grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-20',
                    // Alternate which side the image sits on without reordering
                    // the DOM, so the reading order stays title-then-image.
                    i % 2 === 1 && 'lg:[&>*:first-child]:order-2'
                  )}
                >
                  <Reveal>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 46vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>

                  <Reveal delay={0.08}>
                    <span className="type-label text-terracotta">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="type-heading mt-5 text-[2rem] text-brand sm:text-[2.6rem]">
                      {service.title}
                    </h3>
                    <p className="type-heading mt-5 text-lg text-brand/70 sm:text-xl">
                      {service.summary}
                    </p>
                    <p className="mt-6 max-w-lg text-base leading-[1.8] text-muted-foreground sm:text-[17px]">
                      {service.description}
                    </p>
                    <ServiceLink service={service} />
                    <Link
                      href="/contact"
                      className="group -mb-2 mt-5 flex w-fit items-center gap-2.5 py-2 text-[15px] font-semibold text-brand"
                    >
                      <span className="border-b border-terracotta pb-1">
                        Start with {service.title.toLowerCase()}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <div className="grid grid-cols-1 gap-8 border-b rule pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16">
            <div>
              <Reveal travel={0}>
                <p className="type-label text-terracotta-ink">Also handled</p>
              </Reveal>
              <WordReveal
                as="h2"
                className="type-heading mt-6 text-[2.1rem] text-brand xs:text-[2.4rem] sm:text-5xl lg:text-[3.4rem]"
              >
                The rest of the practice.
              </WordReveal>
            </div>
            <Reveal delay={0.1}>
              <p className="text-base leading-[1.75] text-muted-foreground sm:text-[17px]">
                Fewer files, the same standard. Several of these start with someone who leased
                through him first.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {rest.map((service, i) => (
              <Reveal
                key={service.slug}
                delay={(i % 2) * 0.06}
                className={cn('border-b rule', i % 2 === 0 && 'md:border-r')}
              >
                <article
                  id={service.slug}
                  className={cn(
                    'scroll-mt-28 py-10 md:py-12',
                    i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  )}
                >
                  <div className="flex items-start gap-6">
                    <div className="relative hidden h-24 w-24 shrink-0 overflow-hidden rounded-sm sm:block">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="type-label text-terracotta">
                        {String(i + 1 + FEATURED_COUNT).padStart(2, '0')}
                      </span>
                      <h3 className="type-heading mt-4 text-2xl text-brand sm:text-[1.8rem]">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 max-w-md text-base leading-[1.8] text-muted-foreground">
                    {service.description}
                  </p>
                  <ServiceLink service={service} />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
