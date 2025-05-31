import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "E-Commerce Mini Platform",
  description: "A modern e-commerce platform built with Next.js, TypeScript, and Zustand",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}  suppressHydrationWarning suppressContentEditableWarning>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
