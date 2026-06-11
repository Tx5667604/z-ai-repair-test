'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft } from 'lucide-react'

const SERVICE_PRICE = 100

export default function QualitySelectScreen() {
  const {
    selectedModel,
    selectedServices,
    serviceQuality,
    setQuality,
    setScreen,
  } = useAppStore()

  const allQualitySelected = selectedServices.every(
    (s) => serviceQuality[s]?.quality
  )

  const totalAmount = selectedServices.reduce((sum, s) => {
    return sum + SERVICE_PRICE
  }, 0)

  return (
    <div className="fixed inset-0 bg-[#F2F2F7] flex flex-col">
      {/* Header */}
      <div className="bg-white pt-14 pb-4 px-6 border-b border-[#E5E5EA]">
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => setScreen(6)}
            className="p-1 -ml-1 text-[#007AFF] active:text-[#0056CC]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold text-black"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Качество и описание
          </motion.h1>
        </div>
        <p
          className="text-[#8E8E93] text-sm ml-9"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          {selectedModel} · {selectedServices.length} услуг
        </p>
      </div>

      {/* List of services with quality selection */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {selectedServices.map((service, index) => {
            const currentQuality = serviceQuality[service] || {
              quality: 'copy' as const,
              description: 'описание описание описание....',
            }

            return (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-white rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-base font-medium text-black"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {service}
                  </h3>
                  <span
                    className="text-sm text-[#8E8E93]"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {SERVICE_PRICE} грн
                  </span>
                </div>

                {/* Quality radio buttons - iOS style */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() =>
                      setQuality(service, {
                        quality: 'copy',
                        description: currentQuality.description,
                      })
                    }
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      currentQuality.quality === 'copy'
                        ? 'bg-[#007AFF] text-white'
                        : 'bg-[#F2F2F7] text-[#8E8E93] active:bg-[#E5E5EA]'
                    }`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        currentQuality.quality === 'copy'
                          ? 'border-white'
                          : 'border-[#8E8E93]'
                      }`}
                    >
                      {currentQuality.quality === 'copy' && (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </span>
                    Копия
                  </button>
                  <button
                    onClick={() =>
                      setQuality(service, {
                        quality: 'original',
                        description: currentQuality.description,
                      })
                    }
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      currentQuality.quality === 'original'
                        ? 'bg-[#007AFF] text-white'
                        : 'bg-[#F2F2F7] text-[#8E8E93] active:bg-[#E5E5EA]'
                    }`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        currentQuality.quality === 'original'
                          ? 'border-white'
                          : 'border-[#8E8E93]'
                      }`}
                    >
                      {currentQuality.quality === 'original' && (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </span>
                    Оригинал
                  </button>
                </div>

                {/* Description */}
                <Textarea
                  value={currentQuality.description}
                  onChange={(e) =>
                    setQuality(service, {
                      quality: currentQuality.quality,
                      description: e.target.value,
                    })
                  }
                  placeholder="Описание..."
                  className="bg-[#F2F2F7] border-none rounded-lg text-sm resize-none min-h-[60px] placeholder:text-[#8E8E93]"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                />
              </motion.div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Bottom button */}
      <div className="px-6 py-6 bg-white border-t border-[#E5E5EA]">
        <div
          className="text-center text-sm text-[#8E8E93] mb-3"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Итого: {totalAmount} грн
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => allQualitySelected && setScreen(8)}
          disabled={!allQualitySelected}
          className={`w-full h-12 rounded-xl text-base font-semibold transition-all ${
            allQualitySelected
              ? 'bg-[#007AFF] text-white active:bg-[#0056CC]'
              : 'bg-[#E5E5EA] text-[#8E8E93] cursor-not-allowed'
          }`}
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Далее
        </motion.button>
      </div>
    </div>
  )
}
