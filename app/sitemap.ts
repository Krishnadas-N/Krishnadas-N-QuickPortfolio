import { MetadataRoute } from 'next'

// Ensure URL has protocol
function ensureUrlProtocol(url: string): string {
  if (!url) return 'https://krishnadas.info'
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

const siteUrl = ensureUrlProtocol(process.env.NEXT_PUBLIC_SITE_URL || 'https://krishnadas.info')

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site - only include root path (no fragment URLs)
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
}

