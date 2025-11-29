import seoData from '@/data/seo.json'
import profileData from '@/data/profile.json'

// Ensure URL has protocol - with validation
function ensureUrlProtocol(url: string | undefined): string {
  if (!url || typeof url !== 'string') return 'https://krishnadas.info'
  const trimmed = url.trim()
  if (!trimmed) return 'https://krishnadas.info'
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return `https://${trimmed}`
}

// Get and validate site URL
function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const url = ensureUrlProtocol(envUrl)
  // Validate URL can be constructed
  try {
    new URL(url)
    return url
  } catch {
    return 'https://krishnadas.info'
  }
}

const siteUrl = getSiteUrl()

export function getSEOMetadata() {
  // Use seo.json if available, otherwise fallback to profile data
  const meta = seoData.meta || {
    title: `${profileData.name} - ${profileData.title}`,
    description: profileData.summary || 'Personal portfolio of a software engineer and freelancer',
    keywords: ['software engineer', 'full stack developer', 'freelancer'],
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    author: meta.author || profileData.name,
    robots: meta.robots || 'index, follow',
    language: meta.language || 'en',
  }
}

export function getOpenGraphData() {
  const og = seoData.openGraph || {
    title: `${profileData.name} - Software Engineer Portfolio`,
    description: profileData.summary || 'Full stack developer and software engineer',
    type: 'website',
    image: `${siteUrl}/og-image.jpg`,
    siteName: `${profileData.name} Portfolio`,
  }

  // Ensure URL has protocol - check if url exists in og object
  const ogUrl = (og as any).url ? ensureUrlProtocol((og as any).url) : siteUrl

  return {
    ...og,
    url: ogUrl,
    locale: 'en_US',
  }
}

export function getTwitterData() {
  const twitter = seoData.twitter || {
    card: 'summary_large_image',
    title: `${profileData.name} - Software Engineer`,
    description: profileData.summary || 'Full stack developer building amazing web applications',
    image: `${siteUrl}/og-image.jpg`,
  }

  return twitter
}

export function getStructuredData() {
  const structured = seoData.structuredData || {
    person: {
      name: profileData.name,
      jobTitle: profileData.role,
      description: profileData.summary,
      url: siteUrl,
      sameAs: [
        profileData.linkedin,
        profileData.github,
        profileData.twitter,
      ].filter(Boolean),
      email: profileData.email,
    },
  }

  // Ensure URL has protocol
  const personUrl = structured.person?.url ? ensureUrlProtocol(structured.person.url) : siteUrl

  // Ensure all sameAs URLs have protocols
  const sameAs = (structured.person?.sameAs || []).map((url: string) => {
    if (!url) return null
    try {
      return ensureUrlProtocol(url)
    } catch {
      return null
    }
  }).filter(Boolean) as string[]

  // Build the Person schema object
  const personSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: structured.person?.name || profileData.name,
    alternateName: structured.person?.alternateName,
    jobTitle: structured.person?.jobTitle || profileData.role,
    description: structured.person?.description || profileData.summary,
    url: personUrl,
    sameAs: sameAs.length > 0 ? sameAs : structured.person?.sameAs || [],
    email: structured.person?.email || profileData.email,
  }

  // Add worksFor if present
  if (structured.person?.worksFor) {
    personSchema.worksFor = structured.person.worksFor
  }

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: profileData.name,
    url: siteUrl,
    description: profileData.summary,
    author: {
      '@type': 'Person',
      name: profileData.name,
    },
  }

  return [personSchema, websiteSchema]
}

