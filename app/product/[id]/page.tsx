"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, ShoppingCart, ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import ImageZoom from "@/components/ImageZoom"
import CartIcon from "@/components/CartIcon"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const loadProduct = async () => {
      const resolvedParams = await params
      if (!resolvedParams?.id) return
      await fetchProduct(resolvedParams.id)
    }
    loadProduct()
  }, [params])

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return

    setIsAdding(true)
    addItem(product, quantity)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsAdding(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
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
                Back to Products
              </Button>
            </Link>
            <CartIcon />
          </div>
        </div>
      </header>

      {/* Product Details */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Product Images */}
          <div>
            <ImageZoom images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">₦{(product.price * 1500).toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₦{(product.originalPrice * 1500).toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                  Save ₦{((product.originalPrice - product.price) * 1500).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleAddToCart} disabled={!product.inStock || isAdding} className="flex-1" size="lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAdding ? "Adding..." : `Add to Cart - ₦${(product.price * quantity * 1500).toLocaleString()}`}
                </Button>

                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {!product.inStock && <p className="text-red-600 text-sm">This item is currently out of stock.</p>}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
