import { MetadataRoute } from 'next'

// Ensure URL has protocol
function ensureUrlProtocol(url: string): string {
  if (!url) return 'https://yourdomain.com'
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

const siteUrl = ensureUrlProtocol(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

