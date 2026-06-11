'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { CheckCircle } from 'lucide-react'

export default function ThankYouScreen() {
  const setScreen = useAppStore((s) => s.setScreen)

  useEffect(() => {
    const timer = setTimeout(() => setScreen(11), 5000)
    return () => clearTimeout(timer)
  }, [setScreen])

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="mb-8"
      >
        <CheckCircle className="w-20 h-20 text-green-500" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-3xl font-semibold text-black text-center mb-3"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        Спасибо за заказ!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-base text-[#8E8E93] text-center mb-10"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        Ваш заказ оформлен. Подождите, с вами сейчас свяжутся.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setScreen(11)}
        className="w-full max-w-xs h-12 rounded-xl bg-[#007AFF] text-white text-base font-semibold active:bg-[#0056CC] transition-all"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        Перейти в личный кабинет
      </motion.button>
    </div>
  )
}
