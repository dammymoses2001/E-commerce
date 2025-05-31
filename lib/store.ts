import { create } from "zustand"
import type { CartStore, Product } from "./types"
import { dbManager } from "./db"
import { SessionManager } from "./session"

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product: Product, quantity = 1) => {
    const sessionId = SessionManager.getSessionId()

    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)

      let newItems
      if (existingItem) {
        // If item exists, update quantity
        newItems = state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        // Add new item
        newItems = [...state.items, { id: product.id, product, quantity }]
      }

      // Persist to IndexedDB with session
      if (typeof window !== "undefined") {
        dbManager.saveCart(newItems, sessionId).catch(console.error)
      }

      return { items: newItems }
    })
  },

  removeItem: (productId: string) => {
    const sessionId = SessionManager.getSessionId()

    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId)
      if (typeof window !== "undefined") {
        dbManager.saveCart(newItems, sessionId).catch(console.error)
      }
      return { items: newItems }
    })
  },

  updateQuantity: (productId: string, quantity: number) => {
    const sessionId = SessionManager.getSessionId()

    set((state) => {
      const newItems =
        quantity <= 0
          ? state.items.filter((item) => item.id !== productId)
          : state.items.map((item) => (item.id === productId ? { ...item, quantity } : item))

      if (typeof window !== "undefined") {
        dbManager.saveCart(newItems, sessionId).catch(console.error)
      }
      return { items: newItems }
    })
  },

  clearCart: () => {
    const sessionId = SessionManager.getSessionId()
    set({ items: [] })
    if (typeof window !== "undefined") {
      dbManager.saveCart([], sessionId).catch(console.error)
    }
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  },

  isInCart: (productId: string) => {
    return get().items.some((item) => item.id === productId)
  },

  getItemQuantity: (productId: string) => {
    const item = get().items.find((item) => item.id === productId)
    return item ? item.quantity : 0
  },
}))

// Load cart from IndexedDB on initialization
if (typeof window !== "undefined") {
  const loadCart = async () => {
    try {
      const sessionId = SessionManager.getSessionId()
      const items = await dbManager.loadCart(sessionId)
      useCartStore.setState({ items })
    } catch (error) {
      console.error("Failed to load cart:", error)
    }
  }
  
  loadCart()
}
