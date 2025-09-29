"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

// 1. We import our new function from the client-safe data file
import { getFeaturedProducts } from "@/lib/client-data"

// Animation variants (no changes here)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  // 2. The useEffect hook is now much simpler and calls our clean function
  useEffect(() => {
    async function loadData() {
      const data = await getFeaturedProducts()
      setProducts(data)
      setLoading(false)
    }

    loadData()
  }, [])

  // 3. The hardcoded getFallbackProducts function has been removed

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    // 4. Updated the Quick Add to use "50ml" as discussed
    addItem(product, "50ml", 1)
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center">
            <span className="text-sm text-gray-500 font-light">Loading featured products...</span>
          </div>
        </div>
      </section>
    )
  }

  // The rest of your JSX remains the same
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl font-light text-black uppercase tracking-wide">Featured Collection</h2>
            <p className="text-sm text-gray-500 font-light max-w-2xl mx-auto">
              Discover our most beloved perfumes, each telling a unique story.
            </p>
          </div>
          <motion.div
            className="grid md:grid-cols-3 gap-x-6 gap-y-12 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {products.map((product) => (
              <motion.div key={product.id} className="group" variants={itemVariants}>
                <Link href={`/products/${product.slug}`} className="block">
                  <motion.div
                    className="relative aspect-square mb-4 overflow-hidden bg-gray-50"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Image
                       src={product.thumbnail_url || product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <span className="text-xs text-gray-500 font-light">OUT OF STOCK</span>
                      </div>
                    )}
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-light text-black group-hover:text-gray-600 transition-colors uppercase tracking-wide">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 font-light">{formatPrice(product.price)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-light h-auto p-1 hover:bg-transparent hover:text-black"
                        disabled={!product.in_stock}
                        onClick={(e) => handleQuickAdd(e, product)}
                      >
                        ADD
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-16">
            <Button
              asChild
              variant="ghost"
              className="text-sm font-light hover:bg-transparent hover:text-gray-600 uppercase tracking-wide"
            >
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}