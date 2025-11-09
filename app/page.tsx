'use client'

import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import MatrixBackground from '@/components/MatrixBackground'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import HackerGame from '@/components/HackerGame'
import { trackPageView } from '@/lib/analytics'

export default function Home() {
  useEffect(() => {
    // Track page view on mount
    trackPageView()
  }, [])

  return (
    <main className="relative min-h-screen bg-black">
      <MatrixBackground />
      <Navigation />
      <ScrollProgress />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <BackToTop />
      <HackerGame />
    </main>
  )
}

