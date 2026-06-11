'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronLeft } from 'lucide-react'

const SERVICE_PRICE = 100

export default function ConfirmScreen() {
  const { selectedModel, selectedServices, serviceQuality, setScreen } = useAppStore()

  const totalAmount = selectedServices.reduce((sum) => sum + SERVICE_PRICE, 0)

  // Build agreement text
  const agreementLines: string[] = []
  agreementLines.push(`ЛИЦЕНЗИОННОЕ СОГЛАШЕНИЕ НА РЕМОНТ iPhone`)
  agreementLines.push(``)
  agreementLines.push(`Модель устройства: ${selectedModel}`)
  agreementLines.push(`Дата оформления: ${new Date().toLocaleDateString('ru-RU')}`)
  agreementLines.push(``)
  agreementLines.push(`═══════════════════════════════════════`)
  agreementLines.push(`ПЕРЕЧЕНЬ УСЛУГ`)
  agreementLines.push(`═══════════════════════════════════════`)
  agreementLines.push(``)

  selectedServices.forEach((service, i) => {
    const sq = serviceQuality[service]
    const qualityLabel = sq?.quality === 'original' ? 'Оригинал' : 'Копия'
    const desc = sq?.description || 'описание описание описание....'

    agreementLines.push(`${i + 1}. ${service}`)
    agreementLines.push(`   Качество: ${qualityLabel}`)
    agreementLines.push(`   Стоимость: ${SERVICE_PRICE} грн`)
    agreementLines.push(`   Описание: ${desc}`)
    agreementLines.push(``)
  })

  agreementLines.push(`═══════════════════════════════════════`)
  agreementLines.push(`ИТОГО: ${totalAmount} грн`)
  agreementLines.push(`═══════════════════════════════════════`)
  agreementLines.push(``)
  agreementLines.push(`Нажимая «Согласен», вы подтверждаете, что ознакомлены`)
  agreementLines.push(`с перечнем услуг, стоимостью и условиями ремонта.`)
  agreementLines.push(``)
  agreementLines.push(`Статус заказа: Ожидает подтверждения`)
  agreementLines.push(`С вами свяжется менеджер для уточнения деталей.`)

  return (
    <div className="fixed inset-0 bg-[#F2F2F7] flex flex-col">
      {/* Header */}
      <div className="bg-white pt-14 pb-4 px-6 border-b border-[#E5E5EA]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen(7)}
            className="p-1 -ml-1 text-[#007AFF] active:text-[#0056CC]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-black"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Лицензионное соглашение
          </motion.h1>
        </div>
      </div>

      {/* Agreement text */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-5"
          >
            <pre
              className="text-sm text-black whitespace-pre-wrap leading-relaxed"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              {agreementLines.join('\n')}
            </pre>
          </motion.div>
        </div>
      </ScrollArea>

      {/* Bottom buttons */}
      <div className="px-6 py-6 bg-white border-t border-[#E5E5EA] flex gap-3">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setScreen(7)}
          className="flex-1 h-12 rounded-xl text-base font-semibold bg-[#E5E5EA] text-black active:bg-[#D1D1D6] transition-all"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Назад
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setScreen(9)}
          className="flex-1 h-12 rounded-xl text-base font-semibold bg-[#007AFF] text-white active:bg-[#0056CC] transition-all"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Согласен
        </motion.button>
      </div>
    </div>
  )
}
