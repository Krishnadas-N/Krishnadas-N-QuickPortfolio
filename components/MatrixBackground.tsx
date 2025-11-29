'use client'

import { useEffect, useRef } from 'react'

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}'
    const matrixArray = matrix.split('')
    const fontSize = 16 // Increased font size to reduce number of columns
    const columns = canvas.width / fontSize
    const drops: number[] = []

    // Only draw every other column on mobile to improve performance
    const step = window.innerWidth < 768 ? 2 : 1

    for (let x = 0; x < columns; x += step) {
      drops[x] = Math.random() * -100
    }

    let animationFrameId: number
    let lastTime = 0
    const fps = 30
    const interval = 1000 / fps

    function draw(currentTime: number) {
      if (!ctx || !canvas) return

      animationFrameId = requestAnimationFrame(draw)

      const deltaTime = currentTime - lastTime
      if (deltaTime < interval) return

      lastTime = currentTime - (deltaTime % interval)

      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px JetBrains Mono`

      for (let i = 0; i < drops.length; i++) {
        // Optimize: skip drawing some drops randomly to reduce draw calls
        if (Math.random() > 0.8) continue

        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    animationFrameId = requestAnimationFrame(draw)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Reset drops on resize to avoid gaps
      const newColumns = Math.floor(canvas.width / fontSize)
      // Preserve existing drops where possible
      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) {
           drops[i] = Math.random() * -100
        }
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-10 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

