'use client'

import { useEffect, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import MatrixBackground from '@/components/MatrixBackground'
import { trackPageView } from '@/lib/analytics'

// Lazy load components below the fold for better LCP
const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Skills = dynamic(() => import('@/components/sections/Skills'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Experience = dynamic(() => import('@/components/sections/Experience'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Footer = dynamic(() => import('@/components/sections/Footer'))
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'))
const BackToTop = dynamic(() => import('@/components/BackToTop'))
const HackerGame = dynamic(() => import('@/components/HackerGame'))

export default function Home() {
  useEffect(() => {
    // Track page view on mount
    trackPageView()
  }, [])

  return (
    <main className="relative min-h-screen bg-black">
      <MatrixBackground />
      <Navigation />
      <Suspense fallback={null}>
        <ScrollProgress />
      </Suspense>
      <Hero />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <About />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
      <Suspense fallback={null}>
        <HackerGame />
      </Suspense>
    </main>
  )
}

