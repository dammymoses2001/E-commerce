"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { useAuthStore } from "@/lib/auth"
import { useOrderStore } from "@/lib/orders"
import { PaystackService } from "@/lib/paystack"
import type { Order } from "@/lib/orders"

// Currency conversion rate (USD to NGN)
const NGN_RATE = 1500

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const { addOrder, updatePaymentStatus } = useOrderStore()
  const [loading, setLoading] = useState(false)

  const subtotal = getTotalPrice() * NGN_RATE
  const tax = subtotal * 0.075 // 7.5% VAT
  const shipping = getTotalPrice() > 50 ? 0 : 10 * NGN_RATE
  const total = subtotal + tax + shipping

  const handlePayment = async () => {
    if (!user) return

    setLoading(true)

    try {
      const reference = PaystackService.generateReference()

      // Create order first
      const order: Order = {
        id: `order_${Date.now()}`,
        userId: user.id,
        items,
        totalAmount: total,
        status: "pending",
        paymentReference: reference,
        paymentStatus: "pending",
        shippingAddress: user.address || {
          street: "",
          city: "",
          state: "",
          country: "Nigeria",
          zipCode: "",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      addOrder(order)

      // Initialize Paystack payment
      await PaystackService.initializePayment({
        email: user.email,
        amount: Math.round(total * 100), // Convert to kobo
        currency: "NGN",
        reference,
        callback: (response) => {
          console.log("Payment successful:", response)
          updatePaymentStatus(order.id, "success")
          clearCart()
          onClose()
          // You can redirect to success page or show success message
        },
        onClose: () => {
          console.log("Payment cancelled")
          updatePaymentStatus(order.id, "failed")
        },
        metadata: {
          custom_fields: [
            {
              display_name: "Order ID",
              variable_name: "order_id",
              value: order.id,
            },
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: `${user.firstName} ${user.lastName}`,
            },
          ],
        },
      })
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Summary */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                        <div>
                          <p className="font-medium text-sm">{item.product.name}</p>
                          <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        ₦{(item.product.price * item.quantity * NGN_RATE).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (7.5%)</span>
                    <span>₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              {user && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p className="text-sm text-gray-600">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  {user.address && (
                    <p className="text-sm text-gray-600">
                      {user.address.street}, {user.address.city}, {user.address.state}
                    </p>
                  )}
                </div>
              )}

              {/* Security Features */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure payment with Paystack</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>Free shipping on orders over ₦75,000</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={loading || !user}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay ₦{total.toLocaleString()} with Paystack
                  </div>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
