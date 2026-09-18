/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const isDev = process.env.NODE_ENV === 'development'

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // unsafe-eval is required for Next.js hot reload in dev; removed in production
      isDev ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'" : "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data:",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
]

const nextConfig = {
  env: {
    // Stamped once at build time; used by sitemap.ts for stable lastModified dates.
    // On Vercel this is set automatically. For local builds it falls back to Date.now() in sitemap.ts.
    BUILD_TIME: new Date().toISOString(),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Every source image is a static file that never changes under its own
    // name, so the optimizer's output can be cached hard. The default is 60s,
    // which makes repeat visitors re-fetch derivatives that are byte-identical.
    minimumCacheTTL: 31536000,
    // The site's largest rendering of any image is a 100vw hero; 3840 only
    // serves 4K displays and costs a build-time derivative per hero.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Default ladder jumps 128 -> 256. The brokerage mark renders at 67px, so
    // a 2x screen needs ~134 and was being served 256 on every page load.
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],
    // Add per-client remote domains here:
    // remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
