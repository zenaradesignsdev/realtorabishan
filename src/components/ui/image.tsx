import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { blurFor } from '@/lib/image-blur'

/**
 * Thin wrapper around next/image with project-standard defaults.
 *
 * Usage — fixed dimensions:
 *   <Image src="/photo.jpg" alt="..." width={800} height={600} />
 *
 * Usage — fill mode (parent must have position: relative + explicit dimensions):
 *   <div className="relative h-64 w-full">
 *     <Image src="/photo.jpg" alt="..." fill sizes="100vw" />
 *   </div>
 *
 * Usage — responsive above-the-fold image (always provide sizes):
 *   <Image
 *     src="/hero.jpg"
 *     alt="..."
 *     width={1600}
 *     height={900}
 *     priority
 *     sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px"
 *   />
 *
 * Usage — blur placeholder (generate blurDataURL with plaiceholder, added per-project):
 *   <Image src="/photo.jpg" alt="..." width={800} height={600} blurDataURL="data:..." />
 *
 * Notes:
 *   - `sizes` is optional but strongly recommended for any image wider than 640px.
 *     Without it, the browser fetches the largest srcset variant.
 *   - `priority` should be set on the largest above-the-fold image per page (LCP element).
 *   - A blur placeholder is applied automatically for any src present in
 *     src/lib/image-blur.ts; pass `placeholder="empty"` to opt out, or
 *     `blurDataURL` to override it.
 *   - OG images live in /public at 1200×630 and are referenced in metadata only —
 *     they are never rendered via this component.
 */

type ImageProps = NextImageProps

export function Image({ quality = 85, placeholder, blurDataURL, ...props }: ImageProps) {
  /**
   * Resolve a precomputed placeholder when the caller did not pass one.
   *
   * next/image generates blur data automatically for statically imported
   * images; this project references photos by public path, so the equivalent
   * is looked up from the generated map instead (see
   * scripts/generate-image-blur.mjs). Doing it here rather than at each call
   * site means a new photo gets a placeholder as soon as it is regenerated,
   * without touching the component that renders it.
   *
   * Pass `placeholder="empty"` explicitly to opt out.
   */
  const resolvedBlur =
    blurDataURL ?? (typeof props.src === 'string' ? blurFor(props.src) : undefined)

  const resolvedPlaceholder =
    placeholder ?? (resolvedBlur ? 'blur' : 'empty')

  return (
    <NextImage
      quality={quality}
      placeholder={resolvedPlaceholder}
      blurDataURL={resolvedPlaceholder === 'blur' ? resolvedBlur : undefined}
      {...props}
    />
  )
}
