import seoData from '@/data/seo.json'
import profileData from '@/data/profile.json'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

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

  return {
    ...og,
    url: siteUrl,
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

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    ...structured.person,
  }
}

