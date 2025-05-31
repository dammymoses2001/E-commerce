"use client"

import type React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ShoppingCart, Check, Plus, Minus } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import ImageWithFallback from "./ImageWithFallback"

interface ProductCardProps {
  product: Product
}

// Currency conversion rate (USD to NGN)
const NGN_RATE = 1500

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart, getItemQuantity, updateQuantity } = useCartStore()
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const inCart = isInCart(product.id)
  const cartQuantity = getItemQuantity(product.id)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)

    // Optimistic UI - add immediately
    addItem(product)

    // Show success animation
    setTimeout(() => {
      setIsAdding(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }, 500)
  }

  const handleQuantityChange = (e: React.MouseEvent, change: number) => {
    e.preventDefault()
    const newQuantity = cartQuantity + change
    if (newQuantity <= 0) return
    updateQuantity(product.id, newQuantity)
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Convert price to Naira
  const priceInNaira = product.price * NGN_RATE
  const originalPriceInNaira = product.originalPrice ? product.originalPrice * NGN_RATE : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <ImageWithFallback
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.originalPrice && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
              >
                -{discountPercentage}%
              </motion.div>
            )}
            {product.rating >= 4.5 && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                ⭐ Top Rated
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.682l-1.318-1.364a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        {/* Category */}
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{product.category}</div>

        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-xl mb-2 line-clamp-2 hover:text-blue-600 transition-colors min-h-[3.5rem] leading-tight text-gray-900">
            {product.name}
          </h3>
        </Link>

        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-2 line-clamp-2 leading-relaxed">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2 font-medium">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">₦{priceInNaira.toLocaleString()}</span>
            {originalPriceInNaira && (
              <span className="text-lg text-gray-500 line-through">₦{originalPriceInNaira.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Section */}
        <div className="mt-auto">
          <AnimatePresence mode="wait">
            {!inCart ? (
              <motion.div key="add-button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  variant={isAdding ? "secondary" : "default"}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Adding...
                      </motion.div>
                    ) : showSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center text-green-600"
                      >
                        <Check className="w-5 h-5 mr-2" />
                        Added!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="quantity-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-center space-x-3 bg-gray-50 rounded-xl p-3">
                  <button
                    onClick={(e) => handleQuantityChange(e, -1)}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-lg min-w-[2rem] text-center">{cartQuantity}</span>
                  <button
                    onClick={(e) => handleQuantityChange(e, 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center text-sm text-green-600 font-medium">✓ In Cart</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
