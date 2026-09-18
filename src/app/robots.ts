import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

/**
 * Generates /robots.txt dynamically so the sitemap URL always matches the
 * deployed domain (read from NEXT_PUBLIC_SITE_URL via siteConfig).
 *
 * Non-production deployments are disallowed outright. Vercel gives every preview
 * a publicly reachable hostname, and without this a crawler that finds one
 * indexes a full duplicate of the site — the worst kind of duplicate content,
 * because the preview and the real domain are byte-identical. `VERCEL_ENV` is
 * only set on Vercel, so a self-hosted or local production build still allows
 * crawling as normal.
 */
const vercelEnv = process.env.VERCEL_ENV
const isPublicDeployment = !vercelEnv || vercelEnv === 'production'

export default function robots(): MetadataRoute.Robots {
  if (!isPublicDeployment) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
