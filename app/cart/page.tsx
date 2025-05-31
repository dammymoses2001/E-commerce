"use client"
import dynamic from 'next/dynamic'

// Dynamically import the cart page component with no SSR
const CartPage = dynamic(() => import('./CartPage'), {
  ssr: false,
})

export default function Page() {
  return <CartPage />
}
