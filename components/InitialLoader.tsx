'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InitialLoader({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('INITIALIZING_SYSTEM')

  useEffect(() => {
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'GOOD_MORNING' : hour < 18 ? 'GOOD_AFTERNOON' : 'GOOD_EVENING'

    const texts = [
      'INITIALIZING_SYSTEM...',
      `EXECUTING_${greeting}_PROTOCOL...`,
      'LOADING_KERNEL...',
      'MOUNTING_FILE_SYSTEM...',
      'LOADING_MODULES...',
      'CONFIGURING_NETWORK...',
      'ESTABLISHING_SECURE_CONNECTION...',
      'ACCESS_GRANTED'
    ]

    let currentTextIndex = 0
    
    const textInterval = setInterval(() => {
      if (currentTextIndex < texts.length - 1) {
        currentTextIndex++
        setLoadingText(texts[currentTextIndex])
      }
    }, 150) // Speed up text updates

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(textInterval)
          setTimeout(() => {
            setIsLoading(false)
            if (onComplete) onComplete()
          }, 200) // Reduce exit delay
          return 100
        }
        return prev + Math.random() * 15 + 5 // Speed up progress (was * 5)
      })
    }, 100)

    return () => {
      clearInterval(textInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className="w-full max-w-md px-6">
            <div className="mb-8 text-center">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-hacker-green text-4xl md:text-6xl font-bold mb-4"
                style={{ textShadow: '0 0 10px #00ff41' }}
              >
                KRISHNADAS
              </motion.div>
              <div className="text-hacker-cyan text-sm md:text-base tracking-widest">
                SOFTWARE ENGINEER // FULL STACK
              </div>
            </div>

            <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden border border-hacker-green/30">
              <motion.div
                className="absolute top-0 left-0 h-full bg-hacker-green shadow-[0_0_10px_#00ff41]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex justify-between text-xs md:text-sm text-hacker-green/70">
              <span>{'>'} {loadingText}</span>
              <span>{Math.min(100, Math.round(progress))}%</span>
            </div>
            
            <div className="mt-8 text-center text-xs text-gray-600">
              [v2.0.25] SYSTEM_INTEGRITY_VERIFIED
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

