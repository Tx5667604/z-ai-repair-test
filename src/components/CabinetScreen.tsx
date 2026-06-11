'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, OrderData } from '@/lib/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp, Plus, User, Mail, Package } from 'lucide-react'

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: 'Ожидает', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Подтверждён', color: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'В работе', color: 'bg-purple-100 text-purple-800' },
  completed: { label: 'Выполнен', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Отменён', color: 'bg-red-100 text-red-800' },
}

export default function CabinetScreen() {
  const { currentUser, orders, resetForNewOrder, setOrders } = useAppStore()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Refresh orders
  useEffect(() => {
    if (currentUser?.id) {
      fetch(`/api/orders?userId=${currentUser.id}`)
        .then((res) => res.ok ? res.json() : [])
        .then((data) => setOrders(data))
        .catch(() => {})
    }
  }, [currentUser?.id, setOrders])

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="fixed inset-0 bg-[#F2F2F7] flex flex-col">
      {/* Header */}
      <div className="bg-white pt-14 pb-4 px-6 border-b border-[#E5E5EA]">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-black"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Личный кабинет
        </motion.h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* User info card */}
          {currentUser && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#007AFF] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="text-base font-semibold text-black"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {currentUser.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-[#8E8E93]">
                    <Mail className="w-3.5 h-3.5" />
                    <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                      {currentUser.email}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Orders */}
          <div>
            <h2
              className="text-sm font-medium text-[#8E8E93] uppercase tracking-wide mb-2 px-1"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              История заказов
            </h2>

            {orders.length === 0 ? (
              <div className="bg-white rounded-xl p-8 flex flex-col items-center">
                <Package className="w-12 h-12 text-[#8E8E93] mb-3" />
                <p
                  className="text-[#8E8E93] text-base"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Заказов пока нет
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {orders.map((order: OrderData, index: number) => {
                  const status = STATUS_MAP[order.status] || STATUS_MAP.pending
                  const isExpanded = expandedOrder === order.id
                  const date = new Date(order.createdAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleOrder(order.id)}
                        className="w-full p-4 flex items-center justify-between active:bg-[#F2F2F7] transition-colors"
                      >
                        <div className="flex flex-col items-start">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-sm text-[#8E8E93]"
                              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                            >
                              {date}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${status.color}`}
                            >
                              {status.label}
                            </Badge>
                          </div>
                          <span
                            className="text-base font-semibold text-black"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                          >
                            {order.totalAmount} грн
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-[#8E8E93]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#8E8E93]" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && order.items && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-[#F2F2F7] px-4 py-3 space-y-2">
                              {order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-start justify-between py-1"
                                >
                                  <div className="flex-1">
                                    <p
                                      className="text-sm text-black"
                                      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                                    >
                                      {item.service}
                                    </p>
                                    <p
                                      className="text-xs text-[#8E8E93]"
                                      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                                    >
                                      {item.iphoneModel} ·{' '}
                                      {item.quality === 'original' ? 'Оригинал' : 'Копия'}
                                    </p>
                                    {item.description && item.description !== 'описание описание описание....' && (
                                      <p
                                        className="text-xs text-[#8E8E93] mt-0.5"
                                        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                                      >
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                  <span
                                    className="text-sm text-black font-medium ml-2"
                                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                                  >
                                    {item.price} грн
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* New order button */}
      <div className="px-6 py-6 bg-white border-t border-[#E5E5EA]">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={resetForNewOrder}
          className="w-full h-12 rounded-xl bg-[#007AFF] text-white text-base font-semibold active:bg-[#0056CC] transition-all flex items-center justify-center gap-2"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          <Plus className="w-5 h-5" />
          Новый заказ
        </motion.button>
      </div>
    </div>
  )
}
