'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Mail, Phone, User, Loader2 } from 'lucide-react'

export default function RegisterScreen() {
  const { setScreen, setUser, selectedModel, selectedServices, serviceQuality, setOrders } = useAppStore()
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showNameFields, setShowNameFields] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const SERVICE_PRICE = 100

  const handleGoogleClick = () => {
    setShowEmailInput(true)
  }

  const handleEmailSubmit = async () => {
    if (!email.trim()) return
    setShowNameFields(true)
  }

  const handleSubmit = async () => {
    if (!email.trim() || !name.trim()) return
    setIsLoading(true)
    setError('')

    try {
      // Create or find user
      const userRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), phone: phone.trim() }),
      })

      if (!userRes.ok) {
        const errData = await userRes.json()
        setError(errData.error || 'Ошибка создания пользователя')
        setIsLoading(false)
        return
      }

      const userData = await userRes.json()

      // Create order
      const totalAmount = selectedServices.length * SERVICE_PRICE
      const items = selectedServices.map((service, index) => {
        const sq = serviceQuality[service]
        return {
          iphoneModel: selectedModel || '',
          service,
          quality: sq?.quality || 'copy',
          price: SERVICE_PRICE,
          description: sq?.description || 'описание описание описание....',
          order: index,
        }
      })

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData.id,
          totalAmount,
          items,
        }),
      })

      if (!orderRes.ok) {
        const errData = await orderRes.json()
        setError(errData.error || 'Ошибка создания заказа')
        setIsLoading(false)
        return
      }

      const orderData = await orderRes.json()

      setUser({ id: userData.id, email: userData.email, name: userData.name })

      // Fetch all orders
      const ordersRes = await fetch(`/api/orders?userId=${userData.id}`)
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        setOrders(ordersData)
      } else {
        setOrders([orderData])
      }

      setScreen(10)
    } catch {
      setError('Произошла ошибка. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="pt-14 pb-4 px-6">
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => setScreen(8)}
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
            Введите данные
          </motion.h1>
        </div>
        <p
          className="text-[#8E8E93] text-sm ml-9"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          для оформления заказа
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {/* Google sign-in button */}
          {!showEmailInput ? (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGoogleClick}
              className="w-full h-12 rounded-xl bg-white border border-[#E5E5EA] flex items-center justify-center gap-3 text-base font-medium text-black active:bg-[#F2F2F7] transition-all"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Войти через Google
            </motion.button>
          ) : (
            <>
              {/* Email input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]" />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  className="pl-10 bg-[#F2F2F7] border-none rounded-xl h-12 text-base placeholder:text-[#8E8E93]"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                />
              </div>

              {!showNameFields ? (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleEmailSubmit}
                  disabled={!email.trim()}
                  className={`w-full h-12 rounded-xl text-base font-semibold transition-all ${
                    email.trim()
                      ? 'bg-[#007AFF] text-white active:bg-[#0056CC]'
                      : 'bg-[#E5E5EA] text-[#8E8E93] cursor-not-allowed'
                  }`}
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Продолжить
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Name input */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Имя"
                      className="pl-10 bg-[#F2F2F7] border-none rounded-xl h-12 text-base placeholder:text-[#8E8E93]"
                      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                    />
                  </div>

                  {/* Phone input */}
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]" />
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Телефон"
                      type="tel"
                      className="pl-10 bg-[#F2F2F7] border-none rounded-xl h-12 text-base placeholder:text-[#8E8E93]"
                      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                    />
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Submit button */}
      <div className="px-6 py-6 bg-white border-t border-[#F2F2F7]">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleSubmit}
          disabled={isLoading || !email.trim() || !name.trim()}
          className={`w-full h-12 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 ${
            email.trim() && name.trim() && !isLoading
              ? 'bg-[#007AFF] text-white active:bg-[#0056CC]'
              : 'bg-[#E5E5EA] text-[#8E8E93] cursor-not-allowed'
          }`}
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Оформление...
            </>
          ) : (
            'Подтвердить заказ'
          )}
        </motion.button>
      </div>
    </div>
  )
}
