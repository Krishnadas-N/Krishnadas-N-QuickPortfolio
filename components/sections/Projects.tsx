'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import projectsData from '@/data/projects.json'

interface ProjectModalProps {
  project: typeof projectsData.projects[0]
  isOpen: boolean
  onClose: () => void
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative z-50"
              style={{ pointerEvents: 'auto' }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-hacker-green hover:text-hacker-red transition-colors font-mono"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-3xl font-display font-bold mb-4 text-white font-mono"
                style={{
                  textShadow: '0 0 10px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.3)',
                }}
              >
                {'>'} {project.title}
              </h3>
              <p className="text-hacker-green/80 mb-6 leading-relaxed font-mono">
                {project.longDescription || project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-hacker-cyan/20 text-hacker-cyan text-sm border border-hacker-cyan/30 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 relative" style={{ zIndex: 100 }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      window.open(project.github, '_blank', 'noopener,noreferrer')
                    }}
                    className="px-6 py-3 rounded-lg glass border-2 font-mono font-bold transition-all cursor-pointer relative"
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
                    View Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      window.open(project.live, '_blank', 'noopener,noreferrer')
                    }}
                    className="px-6 py-3 rounded-lg font-mono font-bold transition-all cursor-pointer relative"
                    style={{
                      backgroundColor: '#00ff41',
                      color: '#000000',
                      boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
                      pointerEvents: 'auto',
                      zIndex: 1000,
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#00ffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#00ff41'
                    }}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const featuredProjects = projectsData.projects.filter((p) => p.featured)
  const otherProjects = projectsData.projects.filter((p) => !p.featured)

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
        duration: 0.5,
      },
    },
  }

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
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
            <span className="text-hacker-green">{'>'}</span> PROJECTS - Full Stack & Serverless Development
          </h2>
          <p className="text-hacker-green/70 text-center mb-12 font-mono">
            Some of my recent work and side projects
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer relative"
              onClick={() => setSelectedProject(project.id)}
              style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
            >
              <div className="relative h-48 bg-gradient-to-br from-hacker-cyan/20 to-hacker-purple/20 flex items-center justify-center border-b border-hacker-green/30">
                <div className="text-6xl opacity-50">{project.category === 'Full Stack' ? '🚀' : project.category === 'AI/ML' ? '🤖' : '💬'}</div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-display font-semibold text-hacker-cyan group-hover:text-hacker-purple transition-colors font-mono"
                    style={{
                      textShadow: '0 0 10px rgba(0,255,65,0.3)',
                    }}
                  >
                    {project.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded bg-hacker-purple/20 text-hacker-purple font-mono border border-hacker-purple/30">
                    {project.category}
                  </span>
                </div>
                <p className="text-hacker-green/80 mb-4 line-clamp-2 font-mono text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded bg-terminal-bg text-hacker-cyan border border-hacker-cyan/30 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded bg-terminal-bg text-hacker-green border border-hacker-green/30 font-mono">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 relative" style={{ zIndex: 50 }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        window.open(project.github, '_blank', 'noopener,noreferrer')
                      }}
                      className="text-hacker-cyan hover:text-hacker-purple transition-colors text-sm font-mono cursor-pointer relative inline-block px-2 py-1 border border-hacker-cyan rounded hover:border-hacker-purple"
                      style={{ 
                        pointerEvents: 'auto',
                        zIndex: 100,
                        position: 'relative'
                      }}
                    >
                      GitHub →
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        window.open(project.live, '_blank', 'noopener,noreferrer')
                      }}
                      className="text-hacker-purple hover:text-hacker-cyan transition-colors text-sm font-mono cursor-pointer relative inline-block px-2 py-1 border border-hacker-purple rounded hover:border-hacker-cyan"
                      style={{ 
                        pointerEvents: 'auto',
                        zIndex: 100,
                        position: 'relative'
                      }}
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {otherProjects.length > 0 && (
          <>
            <h3 className="text-2xl font-display font-semibold mb-6 text-white text-center font-mono"
              style={{
                textShadow: '0 0 10px rgba(0,255,65,0.3)',
              }}
            >
              <span className="text-hacker-purple">{'>'}</span> OTHER_PROJECTS
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="glass rounded-xl p-6 cursor-pointer group"
                  onClick={() => setSelectedProject(project.id)}
                >
                  <h4 className="text-xl font-semibold mb-2 text-hacker-cyan group-hover:text-hacker-purple transition-colors font-mono"
                    style={{
                      textShadow: '0 0 10px rgba(0,255,65,0.2)',
                    }}
                  >
                    {project.title}
                  </h4>
                  <p className="text-hacker-green/70 text-sm mb-4 line-clamp-2 font-mono">
                    {project.description}
                  </p>
                  <span className="text-xs text-hacker-purple font-mono">View Details →</span>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {selectedProject && (
          <ProjectModal
            project={projectsData.projects.find((p) => p.id === selectedProject)!}
            isOpen={true}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  )
}

