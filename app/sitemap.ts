import { MetadataRoute } from 'next'
import seoData from '@/data/seo.json'

// Ensure URL has protocol
function ensureUrlProtocol(url: string): string {
  if (!url) return 'https://yourdomain.com'
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

const siteUrl = ensureUrlProtocol(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com')

export default function sitemap(): MetadataRoute.Sitemap {
  // Use pages from seo.json if available
  const pages = seoData.pages || [
    { path: '/', title: 'Home', description: '', keywords: [] },
    { path: '/#about', title: 'About', description: '', keywords: [] },
    { path: '/#skills', title: 'Skills', description: '', keywords: [] },
    { path: '/#projects', title: 'Projects', description: '', keywords: [] },
    { path: '/#experience', title: 'Experience', description: '', keywords: [] },
    { path: '/#contact', title: 'Contact', description: '', keywords: [] },
  ]

  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.path === '/#projects' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? 1 : page.path === '/#projects' ? 0.9 : 0.8,
  }))
}

