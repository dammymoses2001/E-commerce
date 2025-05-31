'use client'

import { usePaystackPayment } from 'react-paystack'
import { Button } from '@/components/ui/button'
import { PaystackConfig } from '@/lib/paystack'
import { PaystackService } from '@/lib/paystack'

interface PaystackButtonProps {
  config: PaystackConfig
  className?: string
  children?: React.ReactNode
}

export default function PaystackButton({ config, className, children }: PaystackButtonProps) {
  const paystackConfig = PaystackService.getConfig(config)
  const initializePayment = usePaystackPayment(paystackConfig)

  return (
    <Button
      onClick={() => {
        initializePayment({
          onSuccess: (reference) => config.callback(reference),
          onClose: config.onClose
        })
      }}
      className={className}
    >
      {children || 'Pay with Paystack'}
    </Button>
  )
} 