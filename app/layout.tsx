import type { Metadata } from 'next'
import { Inter, Rajdhani, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import { getSEOMetadata, getOpenGraphData, getTwitterData, getStructuredData } from '@/lib/seo'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const rajdhani = Rajdhani({ 
  weight: ['500', '600', '700'], // Reduced weights
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

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
const seoMeta = getSEOMetadata()
const ogData = getOpenGraphData()
const twitterData = getTwitterData()

// Safely create metadataBase URL
function getMetadataBase(): URL {
  try {
    return new URL(siteUrl)
  } catch {
    return new URL('https://krishnadas.info')
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: seoMeta.title,
    template: `%s | ${seoMeta.author}`,
  },
  description: seoMeta.description,
  keywords: Array.isArray(seoMeta.keywords) ? seoMeta.keywords.join(', ') : seoMeta.keywords,
  authors: [{ name: seoMeta.author }],
  creator: seoMeta.author,
  publisher: seoMeta.author,
  openGraph: {
    type: ogData.type as 'website',
    locale: ogData.locale,
    url: ogData.url,
    siteName: ogData.siteName,
    title: ogData.title,
    description: ogData.description,
    images: [
      {
        url: ogData.image,
        width: 1200,
        height: 630,
        alt: ogData.title,
      },
    ],
  },
  twitter: {
    card: twitterData.card as 'summary_large_image',
    title: twitterData.title,
    description: twitterData.description,
    images: [twitterData.image],
  },
  robots: {
    index: seoMeta.robots.includes('index'),
    follow: seoMeta.robots.includes('follow'),
    googleBot: {
      index: seoMeta.robots.includes('index'),
      follow: seoMeta.robots.includes('follow'),
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon-192x192.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = getStructuredData()
  const gaId = process.env.NEXT_PUBLIC_GA_ID || ''

  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {gaId && <link rel="dns-prefetch" href="https://www.googletagmanager.com" />}
        {gaId && <link rel="dns-prefetch" href="https://www.google-analytics.com" />}
        
        <meta name="theme-color" content="#0b0f1a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Structured Data - Non-blocking */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Google Analytics - Load asynchronously */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(11, 15, 26, 0.95)',
              color: '#fff',
              border: '1px solid rgba(0, 229, 255, 0.3)',
            },
            success: {
              iconTheme: {
                primary: '#00E5FF',
                secondary: '#0b0f1a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff4444',
                secondary: '#0b0f1a',
              },
            },
          }}
        />
      </body>
    </html>
  )
}

