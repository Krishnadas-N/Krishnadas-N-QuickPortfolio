'use client'

import { motion } from 'framer-motion'
import experienceData from '@/data/experience.json'

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
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
            <span className="text-hacker-green">{'>'}</span> EXPERIENCE.TXT
          </h2>
          <p className="text-hacker-green/70 text-center mb-12 font-mono">
            My professional journey and achievements
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-hacker-green via-hacker-cyan to-hacker-green" />

          {experienceData.experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className={`relative mb-12 flex items-start gap-6 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-hacker-green rounded-full border-4 border-black transform -translate-x-1/2 z-10 shadow-hacker-green" />

              <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-white mb-1 font-mono"
                        style={{
                          textShadow: '0 0 10px rgba(0,255,65,0.3)',
                        }}
                      >
                        <span className="text-hacker-cyan">{'>'}</span> {exp.title}
                      </h3>
                      <p className="text-xl text-hacker-cyan mb-1 font-mono">{exp.company}</p>
                      <p className="text-sm text-hacker-green/70 font-mono">{exp.location}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <span className="inline-block px-3 py-1 rounded-full bg-hacker-purple/20 text-hacker-purple text-sm border border-hacker-purple/30 font-mono">
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                        {exp.current
                          ? 'Present'
                          : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <p className="text-hacker-green/80 mb-4 leading-relaxed font-mono">{exp.description}</p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-hacker-green/80 font-mono">
                          <span className="text-hacker-cyan mt-1">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-terminal-bg text-hacker-cyan border border-hacker-cyan/30 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

