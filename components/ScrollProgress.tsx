'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-terminal-bg border-b border-hacker-green/30">
      <div
        className="h-full bg-hacker-green transition-all duration-150 shadow-hacker-green"
        style={{ width: `${scrollProgress}%` }}
      />
      <div 
        className="absolute top-0 h-full w-1 bg-hacker-cyan animate-pulse"
        style={{ left: `${scrollProgress}%` }}
      />
    </div>
  )
}

