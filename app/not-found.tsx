'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    // Track 404 error
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', '404_error', {
        page_path: window.location.pathname,
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 relative">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl md:text-9xl font-mono font-bold text-hacker-green mb-4"
            style={{
              textShadow: '0 0 20px rgba(0,255,65,0.5), 0 0 40px rgba(0,255,65,0.3)',
            }}
          >
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">
            {'>'} PAGE_NOT_FOUND.EXE
          </h2>
          <p className="text-hacker-green/70 font-mono mb-8 text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg glass border-2 font-mono font-bold transition-all cursor-pointer"
              style={{
                borderColor: '#00ff41',
                color: '#00ff41',
                boxShadow: '0 0 10px rgba(0, 255, 65, 0.3)',
                pointerEvents: 'auto',
                zIndex: 1000,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#00ff41'
                e.currentTarget.style.color = '#000000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#00ff41'
              }}
            >
              [GO_HOME]
            </Link>
            
            <Link
              href="/#projects"
              className="px-6 py-3 rounded-lg glass border-2 font-mono font-bold transition-all cursor-pointer"
              style={{
                borderColor: '#00ffff',
                color: '#00ffff',
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                pointerEvents: 'auto',
                zIndex: 1000,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#00ffff'
                e.currentTarget.style.color = '#000000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#00ffff'
              }}
            >
              [VIEW_PROJECTS]
            </Link>
            
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-lg glass border-2 font-mono font-bold transition-all cursor-pointer"
              style={{
                borderColor: '#ff00ff',
                color: '#ff00ff',
                boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
                pointerEvents: 'auto',
                zIndex: 1000,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff00ff'
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#ff00ff'
              }}
            >
              [CONTACT]
            </Link>
          </div>

          <div className="mt-12 text-hacker-green/50 font-mono text-sm">
            <p>Error Code: 404</p>
            <p className="mt-2">Status: FILE_NOT_FOUND</p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

