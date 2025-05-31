"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { FilterState } from "@/lib/types"

// Currency conversion rate (USD to NGN)
const NGN_RATE = 1500

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "home", label: "Home" },
  { value: "sports", label: "Sports" },
]

const sortOptions = [
  { value: "name", label: "Name A-Z" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

export default function ProductFilters({ filters, onFiltersChange, onClearFilters }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]],
    })
  }

  const hasActiveFilters =
    filters.category !== "all" || filters.priceRange[0] > 0 || filters.priceRange[1] < 500 || filters.sortBy !== "name"

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4 lg:mb-0">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h2>

        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters} className="hidden lg:flex">
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            {isOpen ? "Hide" : "Show"} Filters
          </Button>
        </div>
      </div>

      <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0 }} className="overflow-hidden lg:!h-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 lg:pt-0">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select
              value={filters.category}
              onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Price Range: ₦{(filters.priceRange[0] * NGN_RATE).toLocaleString()} - ₦
              {(filters.priceRange[1] * NGN_RATE).toLocaleString()}
            </label>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                max={750000}
                min={0}
                step={15000}
                className="w-full"
              />
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <Select
              value={filters.sortBy}
              onValueChange={(value: any) => onFiltersChange({ ...filters, sortBy: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button (Mobile) */}
          <div className="flex items-end lg:hidden">
            {hasActiveFilters && (
              <Button variant="outline" onClick={onClearFilters} className="w-full">
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
