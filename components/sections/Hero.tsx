'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import profileData from '@/data/profile.json'
import { trackEvent } from '@/lib/analytics'
import MatrixBackground from '@/components/MatrixBackground'

export default function Hero() {
  const [tagline, setTagline] = useState('Engineering the Future in Code')
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    fetch('/api/ai-content')
      .then((res) => res.json())
      .then((data) => {
        if (data.heroTagline) {
          setTagline(data.heroTagline)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    let index = 0
    const text = tagline
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [tagline])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const handleHireMe = () => {
    trackEvent('hire_me_clicked')
    const message = encodeURIComponent(
      `Hi ${profileData.name}, I'm interested in working with you!`
    )
    window.open(`https://wa.me/${profileData.whatsapp?.replace(/\D/g, '')}?text=${message}`, '_blank')
  }

  const handleDownloadResume = () => {
    trackEvent('resume_downloaded')
    window.open(profileData.resume, '_blank')
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 z-10"
    >
      <MatrixBackground />
      
      {/* Terminal scan lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-hacker-green opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-hacker-green opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        className="relative z-20 max-w-6xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Terminal prompt */}
        <motion.div
          className="mb-8 text-hacker-green/80 font-mono text-sm md:text-base tracking-wider flex items-center justify-center gap-2"
          variants={itemVariants}
        >
          <span className="terminal-prompt text-hacker-green/80">root@portfolio:~$</span>
          <span className="typing">_</span>
        </motion.div>

        {/* ASCII Art Name */}
        <motion.div
          className="mb-6 font-mono text-xs md:text-sm text-hacker-green/50 whitespace-pre"
          variants={itemVariants}
        >
          {`
╔═══════════════════════════════════════╗
║  INITIALIZING SYSTEM...               ║
║  LOADING PROFILE: ${profileData.name.padEnd(20)} ║
╚═══════════════════════════════════════╝
          `}
        </motion.div>

        {/* Main Name - Classy Robotic Style */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 relative px-4"
          variants={itemVariants}
        >
          <span 
            className="block mb-2 text-white font-black relative z-10 font-mono tracking-tight"
            style={{
              textShadow: '0 0 5px rgba(0,255,65,0.4), 0 0 10px rgba(0,255,65,0.3), 0 0 15px rgba(0,255,65,0.2), 0 2px 0 rgba(0,255,65,0.1)',
              letterSpacing: '0.05em',
            }}
          >
            {profileData.name.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="inline-block"
                style={{
                  textShadow: index % 2 === 0 
                    ? '0 0 5px rgba(0,255,65,0.4), 0 0 10px rgba(0,255,65,0.2)' 
                    : '0 0 5px rgba(0,255,255,0.3), 0 0 10px rgba(0,255,255,0.15)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
          <motion.span
            className="block text-base sm:text-xl md:text-3xl lg:text-4xl font-mono text-hacker-cyan mt-4 px-4"
            variants={itemVariants}
          >
            <span className="terminal-prompt">$</span>
            <span className="ml-2">{typedText}</span>
            {showCursor && <span className="text-hacker-green animate-pulse">_</span>}
          </motion.span>
        </motion.h1>

        {/* System Status */}
        <motion.div
          className="glass terminal-box rounded-lg p-4 sm:p-6 mb-8 max-w-2xl mx-4 sm:mx-auto relative"
          variants={itemVariants}
        >
          <div className="text-left font-mono text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-hacker-green">[STATUS]</span>
              <span className="text-hacker-cyan">{profileData.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-hacker-green">[LOCATION]</span>
              <span className="text-hacker-cyan">{profileData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-hacker-green">[EXPERIENCE]</span>
              <span className="text-hacker-cyan">{profileData.experience}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-hacker-green/30">
              <p className="text-hacker-green/80 leading-relaxed">{profileData.summary}</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons - Terminal Style */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-12 px-4"
          variants={itemVariants}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px #00ff41' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHireMe}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-mono font-bold text-sm sm:text-lg transition-all duration-300 relative overflow-hidden group"
            style={{
              backgroundColor: '#00ff41',
              color: '#000000',
              boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
            }}
          >
            <span className="relative z-10">[HIRE_ME]</span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: '#00ffff' }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px #00ffff' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadResume}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg glass border-2 font-mono font-bold text-sm sm:text-lg transition-all duration-300"
            style={{
              borderColor: '#00ffff',
              color: '#00ffff',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)',
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
            [DOWNLOAD_RESUME]
          </motion.button>

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px #ff00ff' }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg glass border-2 font-mono font-bold text-sm sm:text-lg transition-all duration-300 text-center"
            style={{
              borderColor: '#ff00ff',
              color: '#ff00ff',
              boxShadow: '0 0 10px rgba(255, 0, 255, 0.3), inset 0 0 10px rgba(255, 0, 255, 0.1)',
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
            [VIEW_PROJECTS]
          </motion.a>
        </motion.div>

        {/* Social Links - Terminal Style */}
        <motion.div
          className="flex gap-6 justify-center mb-12"
          variants={itemVariants}
        >
          {profileData.github && (
            <motion.a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, y: -5, filter: 'brightness(1.5)' }}
              className="text-hacker-green hover:text-hacker-cyan transition-all"
              aria-label="GitHub"
            >
              <div className="glass p-3 rounded-lg border border-hacker-green hover:border-hacker-cyan">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </motion.a>
          )}
          {profileData.linkedin && (
            <motion.a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, y: -5, filter: 'brightness(1.5)' }}
              className="text-hacker-green hover:text-hacker-cyan transition-all"
              aria-label="LinkedIn"
            >
              <div className="glass p-3 rounded-lg border border-hacker-green hover:border-hacker-cyan">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </motion.a>
          )}
          {profileData.twitter && (
            <motion.a
              href={profileData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, y: -5, filter: 'brightness(1.5)' }}
              className="text-hacker-green hover:text-hacker-cyan transition-all"
              aria-label="Twitter"
            >
              <div className="glass p-3 rounded-lg border border-hacker-green hover:border-hacker-cyan">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
            </motion.a>
          )}
        </motion.div>

        {/* Scroll indicator - Terminal style */}
        <motion.div
          className="mt-16"
          variants={itemVariants}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-hacker-green/60 font-mono"
          >
            <span className="text-xs mb-2 terminal-prompt">SCROLL_DOWN</span>
            <div className="w-px h-8 bg-hacker-green animate-pulse" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
