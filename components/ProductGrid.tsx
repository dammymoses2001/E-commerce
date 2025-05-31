"use client"

import { motion } from "framer-motion"
import ProductCard from "./ProductCard"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse h-[420px] flex flex-col">
            <div className="aspect-square bg-gray-200" />
            <div className="p-4 flex-grow flex flex-col">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="mt-auto">
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="h-full"
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
