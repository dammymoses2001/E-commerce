"use client"

import { ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CartIcon() {
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [prevCount, setPrevCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (totalItems > prevCount) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }
    setPrevCount(totalItems)
  }, [totalItems, prevCount])

  return (
    <Link href="/cart">
      <Button variant="outline" size="sm" className="relative overflow-hidden">
        <motion.div animate={isAnimating ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
          <ShoppingCart className="w-5 h-5" />
        </motion.div>

        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
            >
              <motion.span
                key={totalItems}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse animation when item is added */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-blue-500 rounded-md"
            />
          )}
        </AnimatePresence>
      </Button>
    </Link>
  )
}
