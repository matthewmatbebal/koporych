import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  weight: string
  image: string
  quantity: number
}

export interface LastOrder {
  orderNumber: string
  customer: { name: string; phone: string; email: string }
  items: CartItem[]
  total: number
  delivery: { method: string; address?: string }
  payment: { method: string }
  comment?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  totalPrice: () => number
  totalCount: () => number

  lastOrder: LastOrder | null
  setLastOrder: (order: LastOrder) => void
  clearLastOrder: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(i => i.id === item.id)
        if (existing) {
          set({
            items: get().items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          })
        } else {
          set({ items: [...get().items, item] })
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) })
      },

      updateQuantity: (id, qty) => {
        set({ items: get().items.map(i => i.id === id ? { ...i, quantity: qty } : i) })
      },

      clearCart: () => set({ items: [] }),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      lastOrder: null,
      setLastOrder: (order) => set({ lastOrder: order }),
      clearLastOrder: () => set({ lastOrder: null }),
    }),
    {
      name: 'koporych-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
