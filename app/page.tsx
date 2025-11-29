'use client'

import { useEffect, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
const MatrixBackground = dynamic(() => import('@/components/MatrixBackground'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-black" />
})

// Lazy load components below the fold for better LCP
const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Skills = dynamic(() => import('@/components/sections/Skills'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Experience = dynamic(() => import('@/components/sections/Experience'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div className="min-h-[400px]" />,
})

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Footer = dynamic(() => import('@/components/sections/Footer'))
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'))
const BackToTop = dynamic(() => import('@/components/BackToTop'))
const HackerGame = dynamic(() => import('@/components/HackerGame'))
const InitialLoader = dynamic(() => import('@/components/InitialLoader'), { ssr: false })

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <InitialLoader />
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
        <Services />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Testimonials />
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

