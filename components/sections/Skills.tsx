'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import skillsData from '@/data/skills.json'

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
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
            <span className="text-hacker-green">{'>'}</span> SKILLS.TXT
          </h2>
          <p className="text-hacker-green/70 text-center mb-12 font-mono">
            Technologies I work with to build amazing products
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {skillsData.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className="mb-12"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-display font-semibold mb-6 text-white font-mono"
                style={{
                  textShadow: '0 0 10px rgba(0,255,65,0.3)',
                }}
              >
                <span className="text-hacker-cyan">{'>'}</span> {category.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="glass rounded-xl p-6 text-center cursor-pointer group relative overflow-hidden"
                  >
                    <div className="text-4xl mb-3">{skill.icon}</div>
                    <h4 className="font-semibold text-sm mb-2">{skill.name}</h4>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-terminal-bg border border-hacker-green/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-hacker-green to-hacker-cyan"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      />
                    </div>
                    <span className="text-xs text-hacker-green/70 mt-1 block font-mono">{skill.level}%</span>

                    {/* Hover glow effect */}
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="absolute inset-0 border-2 border-hacker-green rounded-xl shadow-hacker-green"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)',
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

