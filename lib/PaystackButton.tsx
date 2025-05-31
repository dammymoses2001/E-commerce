'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PaystackConfig } from './paystack'
import { PaystackService } from './paystack'
import { toast } from 'sonner'

interface PaystackButtonProps {
  config: PaystackConfig
  className?: string
  children?: React.ReactNode
}

export default function PaystackButton({ config, className, children }: PaystackButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setIsLoading(true)
      await PaystackService.initializePayment({
        ...config,
        callback: (reference) => {
          if (reference.status === "success") {
            config.callback(reference)
            toast.success("Payment successful!")
          } else {
            toast.error("Payment did not succeed.")
          }
        },
        onClose: () => {
          toast.info("Payment was cancelled")
          config.onClose()
        }
      })
    } catch (error) {
      toast.error("Failed to initialize payment")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      className={className}
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : (children || 'Pay with Paystack')}
    </Button>
  )
} 