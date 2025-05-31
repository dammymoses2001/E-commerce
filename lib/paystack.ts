import { usePaystackPayment } from 'react-paystack';
import dynamic from 'next/dynamic'

export interface PaystackConfig {
  email: string
  amount: number // in kobo (multiply by 100)
  currency: string
  reference: string
  callback: (response: PaystackResponse) => void
  onClose: () => void
  metadata?: {
    custom_fields: Array<{
      display_name: string
      variable_name: string
      value: string
    }>
  }
}

interface PaystackResponse {
  reference: string
  trans: string
  status: string
  message: string
  transaction: string
  trxref: string
}

export class PaystackService {
  private static getPaystackPublicKey(): string {
    // Use environment variable if available, otherwise fallback to default test key
    return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_decc784990e95381dcaffa7b35c0ac948f9cd116"
  }

  static getConfig(config: PaystackConfig) {
    return {
      reference: config.reference,
      email: config.email,
      amount: config.amount,
      publicKey: this.getPaystackPublicKey(),
      currency: config.currency || "NGN",
      metadata: config.metadata,
    }
  }

  static generateReference(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    return `ecom_${timestamp}_${random}`
  }

  static async initializePayment(config: PaystackConfig): Promise<void> {
    if (typeof window === "undefined") {
      throw new Error("Paystack can only be initialized in the browser")
    }

    try {
      const paystackConfig = this.getConfig(config)
      const { usePaystackPayment } = await import('react-paystack')
      const initializePayment = usePaystackPayment(paystackConfig)

      initializePayment({
        onSuccess: (reference) => {
          if (reference.status === "success") {
            config.callback(reference)
          }
        },
        onClose: config.onClose
      })
    } catch (error) {
      throw new Error(`Failed to initialize payment: ${error}`)
    }
  }
}

// Hook for using Paystack in React components
export const usePaystack = (config: PaystackConfig) => {
  const paystackConfig = PaystackService.getConfig(config)
  const initializePayment = usePaystackPayment(paystackConfig)

  return {
    initializePayment: () => {
      initializePayment({
        onSuccess: (reference) => config.callback(reference),
        onClose: config.onClose
      })
    }
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    PaystackPop: any
  }
}

// Create a client-side only component for Paystack
const PaystackButton = dynamic(
  () => import('./PaystackButton'),
  { ssr: false }
)

export { PaystackButton }
