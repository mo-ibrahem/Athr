"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
// No longer need StaggerReveal, as we'll handle staggering with variants
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

// Define animation variants for the container and its children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each child's animation
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

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("products").select("*").eq("in_stock", true).limit(3)

        if (error) {
          console.error("[v0] Error fetching featured products:", error)
          setProducts(getFallbackProducts())
          return
        }

        // Check if data is empty, if so, use fallback
        if (!data || data.length === 0) {
          setProducts(getFallbackProducts())
        } else {
          setProducts(data)
        }
      } catch (error) {
        console.error("[v0] Error fetching featured products:", error)
        setProducts(getFallbackProducts())
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const getFallbackProducts = (): Product[] => [
    {
      id: "1",
      name: "Blue Vibe",
      description: "A refreshing aquatic fragrance inspired by the Mediterranean breeze",
      insp: "s",
      price: 599,
      image_url:
        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/bluevipecropped.jpeg",
      category: "aquatic",
      in_stock: true,
      slug: "blue-vibe-aquatic",
      ingredients: ["Alcohol", "Aqua", "Parfum"],
      sizes: ["30ml", "50ml", "100ml"],
      brand: "ATHR",
      gallery_images: [],
      notes: { top: [], middle: [], base: [] },
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Boje",
      description: "A warm amber fragrance with oriental spices",
      insp: "s",
      price: 699,
      image_url:
        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/bojeeecropped.jpeg",
      category: "oriental",
      in_stock: true,
      slug: "boje-amber-essence",
      ingredients: ["Alcohol", "Aqua", "Parfum"],
      sizes: ["30ml", "50ml", "100ml"],
      brand: "ATHR",
      gallery_images: [],
      notes: { top: [], middle: [], base: [] },
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Milka",
      description: "A delicate floral bouquet with jasmine and rose",
      insp: "s",
      price: 599,
      image_url:
        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milkacropped.jpeg",
      category: "floral",
      in_stock: true,
      slug: "milka-floral-dream",
      ingredients: ["Alcohol", "Aqua", "Parfum"],
      sizes: ["30ml", "50ml", "100ml"],
      brand: "ATHR",
      gallery_images: [],
      notes: { top: [], middle: [], base: [] },
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, "30ml", 1)
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

  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl font-light text-black uppercase tracking-wide">Featured Collection</h2>
            <p className="text-sm text-gray-500 font-light max-w-2xl mx-auto">
              Discover our most beloved perfumes, each telling a unique story.
            </p>
          </div>

          {/* Product Grid - Replaced StaggerReveal with a motion.div */}
          <motion.div
            className="grid md:grid-cols-3 gap-x-6 gap-y-12 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Animate when 20% of the grid is in view, and only once
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="group"
                variants={itemVariants} // Children inherit and animate based on the parent's state
              >
                <Link href={`/products/${product.slug}`} className="block">
                  <motion.div
                    className="relative aspect-square mb-4 overflow-hidden bg-gray-50"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Image
                      src={product.image_url || "/placeholder.svg"}
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

                  {/* Product Info */}
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

          {/* "View All" Button */}
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