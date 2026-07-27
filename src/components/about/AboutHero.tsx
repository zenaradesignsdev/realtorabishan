import { Image } from '@/components/ui/image'

export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#EFF6F5] via-[#E8F2F0] to-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 opacity-[0.14] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0)_92%)]"
      >
        <Image
          src="/images/pexels-2478248.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-28 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(14,59,54,0.16)_0%,rgba(14,59,54,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -right-16 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(201,111,74,0.14)_0%,rgba(201,111,74,0)_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">About</p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-brand sm:text-5xl">
            Real estate guidance that puts you first
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Abishan Umashanker is a Toronto-based REALTOR&reg; helping buyers, sellers, and
            investors move forward with confidence. His approach is simple: understand your goals,
            give you straight answers, and represent your interests with care from the first
            conversation to the final signature.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            With a focus on the Toronto and GTA market, he combines current local knowledge with
            patient, transparent communication, so you always know where things stand and what
            comes next.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[340px]">
          <div className="absolute -inset-3.5 rounded-3xl border border-terracotta-border" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-2xl border border-terracotta/40 bg-brand shadow-2xl shadow-brand/25">
            <Image
              src="/images/abishan.webp"
              alt="Abishan Umashanker, REALTOR®, standing portrait"
              width={680}
              height={1020}
              priority
              sizes="(max-width: 1024px) 80vw, 340px"
              className="block h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
