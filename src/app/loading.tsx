/**
 * Every route is statically generated, so this is only ever a brief flash during
 * a client-side transition. Ink ground so it matches the hero the incoming page
 * is about to paint, rather than flashing white between two dark screens.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-[100svh] items-center justify-center bg-ink"
      aria-label="Loading"
      role="status"
    >
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-terracotta motion-reduce:animate-none" />
    </div>
  )
}
