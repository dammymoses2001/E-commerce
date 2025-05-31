"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProductGrid from "@/components/ProductGrid"
import ProductFilters from "@/components/ProductFilters"
import CartIcon from "@/components/CartIcon"
import type { Product, FilterState } from "@/lib/types"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 500], // Keep in USD for backend compatibility
    sortBy: "name",
  })

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.category !== "all") params.append("category", filters.category)
      if (filters.priceRange[0] > 0) params.append("minPrice", filters.priceRange[0].toString())
      if (filters.priceRange[1] < 500) params.append("maxPrice", filters.priceRange[1].toString())
      if (filters.sortBy) params.append("sortBy", filters.sortBy)

      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      priceRange: [0, 500], // Keep in USD for backend compatibility
      sortBy: "name",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900"
            >
              E-Commerce Store
            </motion.h1>
            <CartIcon />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ProductFilters filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} />

          <div className="mb-4">
            <p className="text-gray-600">{loading ? "Loading..." : `Showing ${products.length} products`}</p>
          </div>

          <ProductGrid products={products} loading={loading} />
        </motion.div>
      </main>
    </div>
  )
}
