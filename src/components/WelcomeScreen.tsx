'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'

export default function WelcomeScreen() {
  const setScreen = useAppStore((s) => s.setScreen)

  useEffect(() => {
    const timer = setTimeout(() => setScreen(5), 2000)
    return () => clearTimeout(timer)
  }, [setScreen])

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-3"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-light text-black tracking-tight"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Добро пожаловать
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl text-[#8E8E93] font-light"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Ремонт iPhone
        </motion.p>
      </motion.div>
    </div>
  )
}
