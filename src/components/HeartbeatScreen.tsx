'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useAppStore } from '@/lib/store'

export default function HeartbeatScreen() {
  const setScreen = useAppStore((s) => s.setScreen)
  const [beatCount, setBeatCount] = useState(0)
  const [phase, setPhase] = useState<'heartbeat' | 'glow' | 'progress'>('heartbeat')
  const [progress, setProgress] = useState(0)
  const [logoScale, setLogoScale] = useState(1)
  const beatTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Beat animation
  useEffect(() => {
    const beat = () => {
      // Scale up
      setLogoScale(1.15)
      setTimeout(() => {
        // Scale down
        setLogoScale(1.0)
      }, 250)

      // Count the beat after the full animation
      setTimeout(() => {
        setBeatCount((prev) => {
          const newCount = prev + 1

          if (newCount === 4) {
            setPhase('glow')
          }
          if (newCount === 7) {
            setPhase('progress')
          }
          if (newCount >= 10) {
            // Stop the interval
            if (beatTimerRef.current) {
              clearInterval(beatTimerRef.current)
              beatTimerRef.current = null
            }
          }

          return newCount
        })
      }, 500)
    }

    // Start the first beat immediately
    beat()

    // Then repeat every 1 second
    beatTimerRef.current = setInterval(beat, 1000)

    return () => {
      if (beatTimerRef.current) {
        clearInterval(beatTimerRef.current)
      }
    }
  }, [])

  // Transition to welcome screen after progress completes
  useEffect(() => {
    if (beatCount >= 10 && progress >= 100) {
      const timer = setTimeout(() => setScreen(4), 600)
      return () => clearTimeout(timer)
    }
  }, [beatCount, progress, setScreen])

  // Progress bar animation during progress phase
  useEffect(() => {
    if (phase !== 'progress') return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 100 / 60 // ~3 seconds at 20fps
      })
    }, 50)

    return () => clearInterval(interval)
  }, [phase])

  const showGlow = phase === 'glow' || phase === 'progress'
  const showProgress = phase === 'progress'

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center" style={{ width: 500, height: 500 }}>
        {/* Blue glow */}
        <AnimatePresence>
          {showGlow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute"
              style={{
                width: 1000,
                height: 1000,
                background:
                  'radial-gradient(circle, rgba(0,122,255,0.3) 0%, rgba(0,122,255,0.08) 40%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
          )}
        </AnimatePresence>

        {/* Apple logo with heartbeat animation */}
        <motion.div
          animate={{ scale: logoScale }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <Image
            src="/logo.png"
            alt="Apple Logo"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Progress bar - iOS restore style */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-64 mt-10"
          >
            <div className="w-full h-[4px] bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #007AFF, #5AC8FA)',
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-black/60 text-sm tracking-wide"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Восстановление...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
