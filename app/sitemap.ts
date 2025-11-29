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
  // Add main sections as separate URLs if they were separate pages,
  // but since it's a single page app with anchors, we typically index just the root.
  // However, if we want to hint importance, we can add them, but canonical will likely resolve to root.
  // For a single page portfolio, the root is sufficient.
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
}

