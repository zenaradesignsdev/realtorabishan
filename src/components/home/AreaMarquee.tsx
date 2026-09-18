import { Marquee } from '@/components/motion/Marquee'
import { SERVICE_AREAS } from '@/lib/services'

/**
 * A running band of the places Abishan actually works.
 *
 * It does two jobs: it is the only piece of continuous motion on the page, so
 * it gives the long editorial scroll a pulse; and concrete place names are a
 * far stronger local-credibility signal than another "serving the GTA" line.
 */
export function AreaMarquee() {
  return (
    <section
      aria-label="Areas served"
      className="relative overflow-hidden border-y rule-dark bg-ink py-5 sm:py-6"
    >
      <Marquee duration={55}>
        {SERVICE_AREAS.map((area) => (
          <span key={area} className="flex items-center">
            <span className="type-heading whitespace-nowrap px-6 text-lg text-white/40 sm:px-9 sm:text-2xl">
              {area}
            </span>
            <span
              aria-hidden="true"
              className="h-1 w-1 shrink-0 rounded-full bg-terracotta/70"
            />
          </span>
        ))}
      </Marquee>

      {/* Edge fades so names dissolve into the band rather than being sliced. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32"
      />
    </section>
  )
}
