'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Check, Search } from 'lucide-react'

const IPHONE_MODELS = [
  'iPhone 5',
  'iPhone 5s',
  'iPhone 5c',
  'iPhone 6',
  'iPhone 6 Plus',
  'iPhone 6s',
  'iPhone 6s Plus',
  'iPhone SE',
  'iPhone 7',
  'iPhone 7 Plus',
  'iPhone 8',
  'iPhone 8 Plus',
  'iPhone X',
  'iPhone XR',
  'iPhone XS',
  'iPhone XS Max',
  'iPhone 11',
  'iPhone 11 Pro',
  'iPhone 11 Pro Max',
  'iPhone SE 2',
  'iPhone 12',
  'iPhone 12 mini',
  'iPhone 12 Pro',
  'iPhone 12 Pro Max',
  'iPhone 13',
  'iPhone 13 mini',
  'iPhone 13 Pro',
  'iPhone 13 Pro Max',
  'iPhone SE 3',
  'iPhone 14',
  'iPhone 14 Plus',
  'iPhone 14 Pro',
  'iPhone 14 Pro Max',
  'iPhone 15',
  'iPhone 15 Plus',
  'iPhone 15 Pro',
  'iPhone 15 Pro Max',
  'iPhone 16',
  'iPhone 16 Plus',
  'iPhone 16 Pro',
  'iPhone 16 Pro Max',
]

export default function ModelSelectScreen() {
  const { selectedModel, selectModel, setScreen } = useAppStore()
  const [search, setSearch] = useState('')

  const filteredModels = IPHONE_MODELS.filter((m) =>
    m.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="pt-14 pb-4 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-black text-center"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Выберите модель iPhone
        </motion.h1>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="pl-9 bg-[#F2F2F7] border-none rounded-lg h-10 text-base placeholder:text-[#8E8E93]"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
          />
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1 px-4">
        <div className="bg-white rounded-xl overflow-hidden">
          {filteredModels.map((model, index) => (
            <motion.button
              key={model}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02, duration: 0.2 }}
              onClick={() => selectModel(model)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F2F2F7] active:bg-[#E5E5EA] transition-colors border-b border-[#F2F2F7] last:border-b-0"
            >
              <span
                className={`text-base ${
                  selectedModel === model ? 'text-[#007AFF] font-medium' : 'text-black'
                }`}
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                {model}
              </span>
              {selectedModel === model && <Check className="w-5 h-5 text-[#007AFF]" />}
            </motion.button>
          ))}
        </div>
        {filteredModels.length === 0 && (
          <div className="flex items-center justify-center py-10">
            <p
              className="text-[#8E8E93] text-base"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Модель не найдена
            </p>
          </div>
        )}
      </ScrollArea>

      {/* Bottom button */}
      <div className="px-6 py-8 bg-white border-t border-[#F2F2F7]">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => selectedModel && setScreen(6)}
          disabled={!selectedModel}
          className={`w-full h-12 rounded-xl text-base font-semibold transition-all ${
            selectedModel
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
