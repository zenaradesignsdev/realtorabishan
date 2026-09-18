import { Image } from '@/components/ui/image'
import { Parallax } from '@/components/motion/Parallax'
import { WordReveal } from '@/components/motion/WordReveal'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Full-bleed statement band. The image drifts against the scroll so the section
 * has depth as it passes, and the type sits on a bottom-weighted wash rather
 * than a flat overlay so the skyline stays visible above it.
 */
export function ShowcaseBand() {
  return (
    <section className="relative isolate">
      <Parallax amount={14} className="h-[26rem] sm:h-[32rem] lg:h-[38rem]">
        <Image
          src="/images/toronto-skyline.jpg"
          alt="The Toronto skyline at sunset, seen across the lake"
          fill
          // Parallax scales its child by 1 + amount/100 so the drift never
          // exposes an edge, so this paints at 114vw, not 100vw — telling the
          // browser 100vw would have it pick a variant it then upscales by 14%.
          sizes="114vw"
          // Visible photograph rather than a veiled backdrop like the page
          // heroes, but it still sits under a bottom-weighted ink wash: 70
          // matches the home hero and saves a third of the bytes.
          quality={70}
          className="object-cover object-center"
        />
      </Parallax>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />

      <div className="absolute inset-0 mx-auto flex max-w-shell flex-col justify-end px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12">
        <div className="max-w-2xl">
          <Reveal travel={0}>
            <p className="type-label text-terracotta">Toronto &amp; the GTA</p>
          </Reveal>
          <WordReveal
            as="p"
            className="type-display mt-6 text-[1.9rem] text-white xs:text-[2.2rem] sm:text-4xl lg:text-[3.1rem]"
          >
            Six million people. A hundred streets to get it right on.
          </WordReveal>
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-lg text-base leading-[1.75] text-white/60 sm:text-[17px]">
              From a first apartment near the line to a unit that needs the right tenant by the
              first of the month &mdash; the same care goes into all of it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
