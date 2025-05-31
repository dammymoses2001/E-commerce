import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "./types"

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentReference: string
  paymentStatus: "pending" | "success" | "failed"
  shippingAddress: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  createdAt: string
  updatedAt: string
}

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  updatePaymentStatus: (orderId: string, status: Order["paymentStatus"]) => void
  getUserOrders: (userId: string) => Order[]
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }))
      },

      updateOrderStatus: (orderId: string, status: Order["status"]) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order,
          ),
        }))
      },

      updatePaymentStatus: (orderId: string, paymentStatus: Order["paymentStatus"]) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, paymentStatus, updatedAt: new Date().toISOString() } : order,
          ),
        }))
      },

      getUserOrders: (userId: string) => {
        return get().orders.filter((order) => order.userId === userId)
      },
    }),
    {
      name: "orders-storage",
    },
  ),
)
