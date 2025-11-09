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
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// Ensure URL has protocol
function ensureUrlProtocol(url: string): string {
  if (!url) return 'https://yourdomain.com'
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

const siteUrl = ensureUrlProtocol(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com')
const seoMeta = getSEOMetadata()
const ogData = getOpenGraphData()
const twitterData = getTwitterData()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoMeta.title,
    template: `%s | ${seoMeta.author}`,
  },
  description: seoMeta.description,
  keywords: seoMeta.keywords,
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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

  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0b0f1a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

