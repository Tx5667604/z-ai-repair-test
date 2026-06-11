import { create } from 'zustand'

export interface ServiceQuality {
  quality: 'copy' | 'original'
  description: string
}

export interface OrderItemData {
  id: string
  iphoneModel: string
  service: string
  quality: string
  price: number
  description: string
}

export interface OrderData {
  id: string
  userId: string
  status: string
  totalAmount: number
  createdAt: string
  items: OrderItemData[]
}

export interface CurrentUser {
  id: string
  email: string
  name: string
}

interface AppState {
  currentScreen: number
  selectedModel: string | null
  selectedServices: string[]
  serviceQuality: Record<string, ServiceQuality>
  currentUser: CurrentUser | null
  orders: OrderData[]
  beatCount: number

  setScreen: (screen: number) => void
  selectModel: (model: string) => void
  addService: (service: string) => void
  removeService: (service: string) => void
  setQuality: (service: string, quality: ServiceQuality) => void
  setUser: (user: CurrentUser | null) => void
  setOrders: (orders: OrderData[]) => void
  setBeatCount: (count: number) => void
  reset: () => void
  resetForNewOrder: () => void
}

const initialState = {
  currentScreen: 1,
  selectedModel: null,
  selectedServices: [] as string[],
  serviceQuality: {} as Record<string, ServiceQuality>,
  currentUser: null,
  orders: [] as OrderData[],
  beatCount: 0,
}

export const useAppStore = create<AppState>((set) => ({
  ...initialState,

  setScreen: (screen) => set({ currentScreen: screen }),
  selectModel: (model) => set({ selectedModel: model }),
  addService: (service) =>
    set((state) => {
      if (state.selectedServices.includes(service)) return state
      return {
        selectedServices: [...state.selectedServices, service],
        serviceQuality: {
          ...state.serviceQuality,
          [service]: { quality: 'copy', description: 'описание описание описание....' },
        },
      }
    }),
  removeService: (service) =>
    set((state) => {
      const { [service]: _, ...rest } = state.serviceQuality
      return {
        selectedServices: state.selectedServices.filter((s) => s !== service),
        serviceQuality: rest,
      }
    }),
  setQuality: (service, quality) =>
    set((state) => ({
      serviceQuality: { ...state.serviceQuality, [service]: quality },
    })),
  setUser: (user) => set({ currentUser: user }),
  setOrders: (orders) => set({ orders }),
  setBeatCount: (count) => set({ beatCount: count }),
  reset: () => set(initialState),
  resetForNewOrder: () =>
    set((state) => ({
      ...initialState,
      currentScreen: 5,
      currentUser: state.currentUser,
      orders: state.orders,
    })),
}))
