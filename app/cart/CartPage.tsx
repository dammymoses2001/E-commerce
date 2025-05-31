"use client"

import { motion } from "framer-motion"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCartStore } from "@/lib/store"
import { useAuthStore } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import CartIcon from "@/components/CartIcon"
import ImageWithFallback from "@/components/ImageWithFallback"
import AuthModal from "@/components/AuthModal"
import CheckoutModal from "@/components/CheckoutModal"
import { useState } from "react"

// Currency conversion rate (USD to NGN)
const NGN_RATE = 1500

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup")
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setAuthMode("signup")
      setShowAuthModal(true)
    } else {
      setShowCheckoutModal(true)
    }
  }

  // Calculate totals in Naira
  const subtotal = getTotalPrice() * NGN_RATE
  const shipping = getTotalPrice() * NGN_RATE > 75000 ? 0 : 15000 // Free shipping over ₦75,000
  const tax = subtotal * 0.075 // 7.5% VAT
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <CartIcon />
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link href="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <CartIcon />
          </div>
        </div>
      </header>

      {/* Cart Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <Button variant="outline" onClick={clearCart} className="text-red-600 hover:text-red-700">
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm">{item.product.category}</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ₦{(item.product.price * NGN_RATE).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x min-w-[3rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Subtotal: ₦{(item.product.price * item.quantity * NGN_RATE).toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 sticky top-8"
              >
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (7.5%)</span>
                    <span>₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="w-full" size="lg">
                  {isAuthenticated ? "Proceed to Checkout" : "Sign Up & Checkout"}
                </Button>

                {!isAuthenticated && (
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setAuthMode("login")
                        setShowAuthModal(true)
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Sign in
                    </button>
                  </p>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">Secure checkout with SSL encryption</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* Checkout Modal */}
      <CheckoutModal isOpen={showCheckoutModal} onClose={() => setShowCheckoutModal(false)} />
    </div>
  )
} 