'use client'

import { motion } from 'framer-motion'
import servicesData from '@/data/services.json'

export default function Services() {
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
    <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
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
            <span className="text-hacker-green">{'>'}</span> SERVICES
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map((service) => (
              <motion.div
                key={service.id}
                className="glass terminal-box rounded-lg p-6 relative group hover:border-hacker-green transition-colors"
                variants={itemVariants}
              >
                <div className="absolute top-2 right-2 text-hacker-green/40 font-mono text-xs">
                  [ID: {service.id.toUpperCase()}]
                </div>
                <h3 className="text-xl font-bold mb-3 text-hacker-cyan font-mono group-hover:text-hacker-green transition-colors">
                  {'>'} {service.title}
                </h3>
                <p className="text-hacker-green/80 font-mono leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

