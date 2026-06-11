'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import HeartbeatScreen from '@/components/HeartbeatScreen'
import WelcomeScreen from '@/components/WelcomeScreen'
import ModelSelectScreen from '@/components/ModelSelectScreen'
import ServiceSelectScreen from '@/components/ServiceSelectScreen'
import QualitySelectScreen from '@/components/QualitySelectScreen'
import ConfirmScreen from '@/components/ConfirmScreen'
import RegisterScreen from '@/components/RegisterScreen'
import ThankYouScreen from '@/components/ThankYouScreen'
import CabinetScreen from '@/components/CabinetScreen'

function getTransitionConfig(screen: number) {
  // Fade transition for heartbeat → welcome
  if (screen <= 4) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.6, ease: 'easeInOut' },
    }
  }
  // Slide transition for all other screens
  return {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.35, ease: 'easeInOut' },
  }
}

function ScreenRenderer({ screen }: { screen: number }) {
  switch (screen) {
    case 1:
    case 2:
    case 3:
      return <HeartbeatScreen />
    case 4:
      return <WelcomeScreen />
    case 5:
      return <ModelSelectScreen />
    case 6:
      return <ServiceSelectScreen />
    case 7:
      return <QualitySelectScreen />
    case 8:
      return <ConfirmScreen />
    case 9:
      return <RegisterScreen />
    case 10:
      return <ThankYouScreen />
    case 11:
      return <CabinetScreen />
    default:
      return <HeartbeatScreen />
  }
}

export default function Home() {
  const currentScreen = useAppStore((s) => s.currentScreen)
  const config = getTransitionConfig(currentScreen)

  // Use a stable key for screens 1-3 (all handled by HeartbeatScreen)
  const transitionKey = currentScreen <= 3 ? 'heartbeat' : currentScreen

  return (
    <main
      className="fixed inset-0 overflow-hidden"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          initial={config.initial}
          animate={config.animate}
          exit={config.exit}
          transition={config.transition}
          className="fixed inset-0"
        >
          <ScreenRenderer screen={currentScreen} />
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
