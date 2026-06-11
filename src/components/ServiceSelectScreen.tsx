'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Check, Plus, Search, ChevronLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'

const SERVICES = [
  'Замена экрана',
  'Замена аккумулятора',
  'Замена порта зарядки',
  'Замена верхнего динамика',
  'Замена нижнего динамика',
  'Замена основной камеры',
  'Замена фронтальной камеры',
  'Замена кнопки Home',
  'Замена кнопки включения',
  'Замена кнопок громкости',
  'Замена вибромотора',
  'Замена модуля Wi-Fi',
  'Замена материнской платы',
  'Замена задней крышки',
  'Замена рамки корпуса',
  'Замена разъема наушников',
  'Замена датчика приближения',
  'Замена датчика Face ID',
  'Замена модуля сотовой связи',
  'Замена контроллера питания',
  'Замена шлейфа экрана',
  'Замена антенны',
  'Восстановление после попадания влаги',
  'Прошивка / обновление ПО',
  'Замена стекла камеры',
  'Замена слухового динамика',
  'Ремонт цепи зарядки',
  'Замена контроллера подсветки',
]

const SERVICE_PRICE = 100

export default function ServiceSelectScreen() {
  const { selectedModel, selectedServices, addService, removeService, setScreen } = useAppStore()
  const [search, setSearch] = useState('')

  const filteredServices = SERVICES.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  )

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      removeService(service)
    } else {
      addService(service)
    }
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="pt-14 pb-4 px-6">
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => setScreen(5)}
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
            Выберите услуги
          </motion.h1>
        </div>
        <p
          className="text-[#8E8E93] text-sm ml-9"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          {selectedModel}
        </p>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск услуги..."
            className="pl-9 bg-[#F2F2F7] border-none rounded-lg h-10 text-base placeholder:text-[#8E8E93]"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
          />
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1 px-4">
        <div className="bg-white rounded-xl overflow-hidden">
          {filteredServices.map((service, index) => {
            const isSelected = selectedServices.includes(service)
            return (
              <motion.button
                key={service}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.015, duration: 0.2 }}
                onClick={() => toggleService(service)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F2F2F7] active:bg-[#E5E5EA] transition-colors border-b border-[#F2F2F7] last:border-b-0"
              >
                <div className="flex flex-col items-start">
                  <span
                    className={`text-base ${
                      isSelected ? 'text-[#007AFF] font-medium' : 'text-black'
                    }`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {service}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm text-[#8E8E93]"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {SERVICE_PRICE} грн
                  </span>
                  {isSelected ? (
                    <Check className="w-5 h-5 text-[#007AFF]" />
                  ) : (
                    <Plus className="w-5 h-5 text-[#8E8E93]" />
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
        {filteredServices.length === 0 && (
          <div className="flex items-center justify-center py-10">
            <p
              className="text-[#8E8E93] text-base"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Услуга не найдена
            </p>
          </div>
        )}
      </ScrollArea>

      {/* Bottom buttons */}
      <div className="px-6 py-6 bg-white border-t border-[#F2F2F7] flex flex-col gap-3">
        {selectedServices.length > 0 && (
          <div
            className="text-center text-sm text-[#8E8E93]"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Выбрано: {selectedServices.length} · {selectedServices.length * SERVICE_PRICE} грн
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => selectedServices.length > 0 && setScreen(7)}
          disabled={selectedServices.length === 0}
          className={`w-full h-12 rounded-xl text-base font-semibold transition-all ${
            selectedServices.length > 0
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
