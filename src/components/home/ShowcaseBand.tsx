import { Image } from '@/components/ui/image'

export function ShowcaseBand() {
  return (
    <section className="relative h-[380px] overflow-hidden sm:h-[440px]">
      <Image
        src="/images/pexels-19836798.jpg"
        alt="Sunlit luxury living room with a warm neutral sofa, marble coffee table, and terracotta accent pillows"
        fill
        sizes="100vw"
        className="object-cover object-[50%_62%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand/85 via-brand/50 to-brand/[0.08]" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
            The right home, the right move
          </p>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            From first homes to luxury listings
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Thoughtful, detail-focused representation across every price point and property type,
            always centered on what matters most to you.
          </p>
        </div>
      </div>
    </section>
  )
}
