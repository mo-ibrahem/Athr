import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { PageTransition } from "@/components/page-transition"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Athr - Egyptian Perfumes",
  description:
    "Discover the finest collection of authentic Egyptian perfumes, inspired by ancient traditions and crafted with premium ingredients.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <CartProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </CartProvider>
      </body>
    </html>
  )
}
