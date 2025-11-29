'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GameState {
  score: number
  level: number
  timeLeft: number
  isPlaying: boolean
  isGameOver: boolean
}

export default function HackerGame() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    timeLeft: 30,
    isPlaying: false,
    isGameOver: false,
  })
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; value: number }>>([])
  const [showGame, setShowGame] = useState(false)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const spawnRef = useRef<NodeJS.Timeout | null>(null)

  const spawnTarget = useCallback(() => {
    if (!gameAreaRef.current) return

    const newTarget = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10-90% to avoid edges
      y: Math.random() * 80 + 10, // 10-90% to avoid edges
      value: Math.floor(Math.random() * 3) + 1,
    }

    setTargets((prev) => [...prev, newTarget])

    // Auto-remove target after 3 seconds
    setTimeout(() => {
      setTargets((prev) => prev.filter((t) => t.id !== newTarget.id))
    }, 3000)
  }, [])

  // Game Timer Effect
  useEffect(() => {
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setGameState((prev) => {
          if (prev.timeLeft <= 1) {
            return { ...prev, timeLeft: 0, isPlaying: false, isGameOver: true }
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 }
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [gameState.isPlaying])

  // Target Spawning Effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isGameOver) {
      const spawnInterval = 2000 - (gameState.level - 1) * 100
      
      // Initial spawn
      if (targets.length === 0 && gameAreaRef.current) {
        spawnTarget()
      }

      spawnRef.current = setInterval(() => {
        if (gameAreaRef.current) {
          spawnTarget()
        }
      }, Math.max(500, spawnInterval))
    }

    return () => {
      if (spawnRef.current) {
        clearInterval(spawnRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.isGameOver, gameState.level, spawnTarget])

  const handleTargetClick = (value: number, id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setGameState((prev) => ({
      ...prev,
      score: prev.score + value * prev.level,
    }))
    setTargets((prev) => prev.filter((t) => t.id !== id))
  }

  const startGame = () => {
    setGameState({
      score: 0,
      level: 1,
      timeLeft: 30,
      isPlaying: true,
      isGameOver: false,
    })
    setTargets([])
    // Spawn first target immediately after state updates
    setTimeout(() => {
      if (gameAreaRef.current) {
        spawnTarget()
      }
    }, 100)
  }

  const resetGame = () => {
    setGameState({
      score: 0,
      level: 1,
      timeLeft: 30,
      isPlaying: false,
      isGameOver: false,
    })
    setTargets([])
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    if (spawnRef.current) {
      clearInterval(spawnRef.current)
    }
  }

  return (
    <>
      {/* Game Toggle Button */}
      <motion.button
        onClick={() => setShowGame(!showGame)}
        className="fixed bottom-24 right-4 md:right-8 z-50 glass border-2 border-hacker-green px-3 sm:px-4 py-2 rounded-lg text-hacker-green font-mono text-xs sm:text-sm hover:bg-hacker-green hover:text-black transition-all shadow-hacker-green"
        style={{ pointerEvents: 'auto' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle game"
      >
        {showGame ? '[CLOSE]' : '[GAME]'}
      </motion.button>

      <AnimatePresence>
        {showGame && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-36 right-4 md:right-8 z-50 glass terminal-box rounded-lg p-3 sm:p-4 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-[calc(100vw-2rem)] sm:max-w-none max-h-[500px] overflow-y-auto"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="mb-4 relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-mono text-base sm:text-lg"
                  style={{
                    textShadow: '0 0 10px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.3)',
                  }}
                >
                  {'>'} HACKER_GAME.EXE
                </h3>
                <button
                  onClick={() => {
                    setShowGame(false)
                    resetGame()
                  }}
                  className="text-hacker-green hover:text-hacker-red transition-colors font-mono text-sm cursor-pointer relative z-50"
                  style={{ pointerEvents: 'auto' }}
                  aria-label="Close game"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-hacker-green/70 text-xs font-mono mb-4">
                Click the green targets before they disappear!
              </p>

              {!gameState.isPlaying && !gameState.isGameOver && (
                <button
                  onClick={startGame}
                  className="w-full px-4 py-2 bg-hacker-green text-black font-mono font-bold rounded hover:bg-hacker-cyan transition-colors shadow-hacker-green cursor-pointer relative z-20"
                  style={{ pointerEvents: 'auto' }}
                >
                  [START]
                </button>
              )}

              {gameState.isPlaying && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-hacker-green font-mono text-xs sm:text-sm">
                    <span>SCORE: {gameState.score}</span>
                    <span>TIME: {gameState.timeLeft}s</span>
                  </div>
                  <div className="w-full bg-terminal-bg h-2 rounded overflow-hidden border border-hacker-green/30">
                    <div
                      className="bg-hacker-green h-full transition-all duration-1000 shadow-hacker-green"
                      style={{ width: `${(gameState.timeLeft / 30) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {gameState.isGameOver && (
                <div className="text-center mb-4">
                  <p className="text-white font-mono mb-2 text-lg">GAME OVER</p>
                  <p className="text-hacker-green font-mono text-xl mb-4 neon-text">
                    FINAL SCORE: {gameState.score}
                  </p>
                  <button
                    onClick={resetGame}
                    className="px-4 py-2 bg-hacker-cyan text-black font-mono font-bold rounded hover:bg-hacker-purple transition-colors cursor-pointer relative z-20"
                    style={{ pointerEvents: 'auto' }}
                  >
                    [PLAY AGAIN]
                  </button>
                </div>
              )}

              {gameState.isPlaying && (
                <div
                  ref={gameAreaRef}
                  className="relative w-full h-64 bg-terminal-bg border-2 border-hacker-green rounded overflow-hidden"
                  style={{ minHeight: '256px', pointerEvents: 'auto' }}
                >
                  {targets.length === 0 && gameState.timeLeft > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                      <p className="text-hacker-green/50 font-mono text-sm">Loading targets...</p>
                    </div>
                  )}
                  {targets.map((target) => (
                    <motion.button
                      key={target.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={(e) => handleTargetClick(target.value, target.id, e)}
                      onMouseDown={(e) => e.stopPropagation()} // Stop event propagation for clicks
                      className="absolute w-12 h-12 bg-hacker-green rounded-full border-2 border-hacker-cyan flex items-center justify-center text-black font-mono font-bold text-sm hover:scale-110 transition-transform cursor-pointer shadow-hacker-green z-50"
                      style={{
                        left: `${target.x}%`,
                        top: `${target.y}%`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'auto',
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +{target.value}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
