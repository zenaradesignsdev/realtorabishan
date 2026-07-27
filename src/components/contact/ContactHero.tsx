import { Image } from '@/components/ui/image'

export function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(120%_120%_at_50%_0%,#155048_0%,#0E3B36_60%,#071F1C_100%)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4/5 opacity-25 [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_88%)]">
        <Image
          src="/images/pexels-5071177.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand/50 via-brand/15 to-[#071F1C]/45" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">Contact</p>
        <h1 className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          Let&rsquo;s start the conversation
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
          Tell me a little about what you are looking for and I&rsquo;ll be in touch. Prefer to
          talk? Call any time.
        </p>
      </div>
    </section>
  )
}
