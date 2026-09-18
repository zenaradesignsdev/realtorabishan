import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { Image } from '@/components/ui/image'
import { businessInfo } from '@/lib/metadata'

export function AboutStory() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.35fr_0.65fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal travel={0}>
              <p className="type-label text-terracotta-ink">The short version</p>
            </Reveal>
            <WordReveal
              as="h2"
              className="type-heading mt-6 text-[2rem] text-brand xs:text-[2.2rem] sm:text-4xl"
            >
              Leasing first, by choice.
            </WordReveal>
          </div>

          <div>
            <Reveal>
              <p className="type-heading text-[1.5rem] leading-[1.35] text-brand sm:text-[1.9rem]">
                Plenty of agents treat leasing as the thing you do until a sale comes along. That is
                exactly why so many leases are handled badly.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 space-y-6 text-base leading-[1.8] text-muted-foreground sm:text-[17px]">
                <p>
                  A lease is a year of someone&rsquo;s life, or a year of an owner&rsquo;s income.
                  It moves faster than a sale, the good units are gone in a day, and the paperwork
                  still has to be right. It rewards someone who picks up the phone, knows the
                  building, and has the application ready before the showing ends.
                </p>
                <p>
                  That is the work Abishan built his practice around. Tenants get a filtered
                  shortlist instead of a firehose of listings, and the reason a place is or is not
                  right gets said out loud. Landlords get a unit priced against what is actually
                  leasing nearby, shown in person, and screened properly &mdash; not a stack of
                  applications forwarded on without comment.
                </p>
                <p>
                  Buying and selling are part of the practice too, and they get the same treatment.
                  Many of the people he buys homes for started as tenants who called him again three
                  years later.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t rule pt-10 sm:grid-cols-3">
                <div>
                  <dt className="type-label text-brand/40">Rating</dt>
                  <dd className="type-heading mt-3 text-2xl text-brand">
                    {businessInfo.rating.value.toFixed(1)} / 5.0
                  </dd>
                  <dd className="mt-1.5 text-sm text-muted-foreground">
                    {businessInfo.rating.count} Google reviews
                  </dd>
                </div>
                <div>
                  <dt className="type-label text-brand/40">Brokerage</dt>
                  <dd className="type-heading mt-3 text-2xl text-brand">Royal LePage</dd>
                  <dd className="mt-1.5 text-sm text-muted-foreground">Ignite Realty, Scarborough</dd>
                </div>
                <div>
                  <dt className="type-label text-brand/40">Area</dt>
                  <dd className="type-heading mt-3 text-2xl text-brand">Toronto &amp; GTA</dd>
                  <dd className="mt-1.5 text-sm text-muted-foreground">
                    From the core out to Durham
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-sm">
                <Image
                  src="/images/neighbourhood.jpg"
                  alt="Aerial view of a leafy Toronto-area residential neighbourhood"
                  fill
                  sizes="(max-width: 1024px) 92vw, 60vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
