'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import profileData from '@/data/profile.json'

export default function About() {
  const [aboutText, setAboutText] = useState(profileData.bio || profileData.summary)

  useEffect(() => {
    // Try to load AI-generated about text
    fetch('/api/ai-content')
      .then((res) => res.json())
      .then((data) => {
        if (data.aboutText) {
          setAboutText(data.aboutText)
        }
      })
      .catch(() => {
        // Fallback to default
      })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-4 text-white font-mono"
            variants={itemVariants}
            style={{
              textShadow: '0 0 10px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.3)',
            }}
          >
            <span className="text-hacker-green">{'>'}</span> ABOUT - Software Engineer & Full Stack Developer
          </motion.h2>

          <motion.div
            className="glass terminal-box rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 mt-8 relative mx-4 sm:mx-0"
            variants={itemVariants}
          >
            <div className="absolute top-2 left-2 text-hacker-green font-mono text-xs opacity-60">
              {'┌─[SYSTEM_INFO]────────────────────────────────┐'}
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-lg text-hacker-green/90 leading-relaxed mb-6 font-mono">
                  {aboutText}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="text-hacker-green font-mono text-2xl">{'>'}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-hacker-green font-mono">[ROLE]</h3>
                      <p className="text-hacker-cyan font-mono">{profileData.currentRole}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-hacker-cyan font-mono text-2xl">{'>'}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-hacker-cyan font-mono">[EXP]</h3>
                      <p className="text-hacker-green font-mono">{profileData.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-hacker-green font-mono text-2xl">{'>'}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-hacker-green font-mono">[LOC]</h3>
                      <p className="text-hacker-cyan font-mono">{profileData.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-hacker-purple font-mono text-2xl">{'>'}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-hacker-purple font-mono">[FOCUS]</h3>
                      <p className="text-hacker-green font-mono">{profileData.focusAreas?.join(' | ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

