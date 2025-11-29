'use client'

import { motion } from 'framer-motion'
import testimonialsData from '@/data/testimonials.json'

export default function Testimonials() {
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
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-12 text-white font-mono text-center"
            variants={itemVariants}
            style={{
              textShadow: '0 0 10px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.3)',
            }}
          >
            <span className="text-hacker-green">{'>'}</span> TESTIMONIALS
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="glass terminal-box rounded-lg p-6 relative flex flex-col h-full"
                variants={itemVariants}
              >
                 <div className="mb-4 text-hacker-cyan text-4xl font-serif leading-none opacity-50">
                  &quot;
                </div>
                <p className="text-hacker-green/80 font-mono leading-relaxed mb-6 flex-grow italic">
                  {testimonial.content}
                </p>
                <div className="mt-auto border-t border-hacker-green/20 pt-4">
                  <div className="font-bold text-hacker-green font-mono">{testimonial.name}</div>
                  <div className="text-xs text-hacker-green/60 font-mono">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

