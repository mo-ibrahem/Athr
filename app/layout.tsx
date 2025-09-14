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
  title: "ATHR - Leave a Lasting Impression",
  description:
    "High-quality, long-lasting, and unforgettable — our perfumes combine unique scents with a wide variety to suit every mood and style. Discover your signature fragrance today.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
     <link rel="icon" href="/atthr.svg" sizes="any" />

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
