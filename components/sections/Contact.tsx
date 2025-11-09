'use client'

import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'
import { toast } from 'react-hot-toast'
import profileData from '@/data/profile.json'
import { trackEvent } from '@/lib/analytics'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
        trackEvent('contact_form_submitted', { success: true })
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.')
        trackEvent('contact_form_submitted', { success: false, error: data.error })
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.')
      trackEvent('contact_form_submitted', { success: false, error: 'network_error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleWhatsApp = () => {
    trackEvent('whatsapp_clicked')
    const message = encodeURIComponent(
      `Hi ${profileData.name}, I'm interested in working with you!`
    )
    window.open(`https://wa.me/${profileData.whatsapp?.replace(/\D/g, '')}?text=${message}`, '_blank')
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white text-center font-mono"
            style={{
              textShadow: '0 0 10px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.3)',
            }}
          >
            <span className="text-hacker-green">{'>'}</span> CONTACT.TXT
          </h2>
          <p className="text-hacker-green/70 text-center mb-12 font-mono">
            Have a project in mind? Let&apos;s work together!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass rounded-xl p-6">
              <h3 className="text-2xl font-display font-semibold mb-6 text-white font-mono"
                style={{
                  textShadow: '0 0 10px rgba(0,255,65,0.3)',
                }}
              >
                <span className="text-hacker-cyan">{'>'}</span> CONNECT
              </h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center gap-4 text-hacker-green/80 hover:text-hacker-cyan transition-colors font-mono"
                >
                  <div className="w-12 h-12 rounded-lg bg-hacker-cyan/20 flex items-center justify-center border border-hacker-cyan/30">
                    <svg className="w-6 h-6 text-hacker-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>{profileData.email}</span>
                </a>

                {profileData.linkedin && (
                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-hacker-green/80 hover:text-hacker-cyan transition-colors font-mono"
                  >
                    <div className="w-12 h-12 rounded-lg bg-hacker-purple/20 flex items-center justify-center border border-hacker-purple/30">
                      <svg className="w-6 h-6 text-hacker-purple" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <span>LinkedIn</span>
                  </a>
                )}

                {profileData.github && (
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-hacker-green/80 hover:text-hacker-cyan transition-colors font-mono"
                  >
                    <div className="w-12 h-12 rounded-lg bg-hacker-cyan/20 flex items-center justify-center border border-hacker-cyan/30">
                      <svg className="w-6 h-6 text-hacker-cyan" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <span>GitHub</span>
                  </a>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsApp}
                className="mt-6 w-full px-6 py-3 rounded-lg font-mono font-bold transition-all"
                style={{
                  backgroundColor: '#00ff41',
                  color: '#000000',
                  boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#00ffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#00ff41'
                }}
              >
                {'>'} CHAT_ON_WHATSAPP
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-hacker-green font-mono">
                  {'>'} NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-terminal-bg border border-hacker-green text-hacker-green font-mono focus:outline-none focus:border-hacker-cyan focus:shadow-hacker-green transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-hacker-green font-mono">
                  {'>'} EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-terminal-bg border border-hacker-green text-hacker-green font-mono focus:outline-none focus:border-hacker-cyan focus:shadow-hacker-green transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-hacker-green font-mono">
                  {'>'} SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-terminal-bg border border-hacker-green text-hacker-green font-mono focus:outline-none focus:border-hacker-cyan focus:shadow-hacker-green transition-all"
                  placeholder="What&apos;s this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-hacker-green font-mono">
                  {'>'} MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-terminal-bg border border-hacker-green text-hacker-green font-mono focus:outline-none focus:border-hacker-cyan focus:shadow-hacker-green transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="w-full px-6 py-3 rounded-lg font-mono font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isSubmitting ? '#00ff4180' : '#00ff41',
                  color: '#000000',
                  boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#00ffff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#00ff41'
                  }
                }}
              >
                {isSubmitting ? '[SENDING...]' : '[SEND_MESSAGE]'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

