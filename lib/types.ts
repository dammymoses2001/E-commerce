export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  images: string[]
  rating: number
  reviews: number
  inStock: boolean
  features: string[]
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isInCart: (productId: string) => boolean
  getItemQuantity: (productId: string) => number
}

export interface FilterState {
  category: string
  priceRange: [number, number]
  sortBy: "name" | "price-low" | "price-high" | "rating"
}
