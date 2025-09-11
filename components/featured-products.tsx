"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { StaggerReveal } from "@/components/stagger-reveal"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

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

        console.log("[v0] Fetched featured products:", data)
        setProducts(getFallbackProducts())
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
      price: 299,
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
      price: 349,
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
      price: 279,
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
        {/* This new wrapper div groups and centers the entire content block */}
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl font-light text-black uppercase tracking-wide">Featured Collection</h2>
            <p className="text-sm text-gray-500 font-light max-w-2xl mx-auto">
              Discover our most beloved perfumes, each telling a unique story of Egyptian heritage and luxury.
            </p>
          </div>

          {/* Product Grid - max-w-5xl and mx-auto are removed from here */}
          <StaggerReveal className="grid md:grid-cols-3 gap-x-6 gap-y-12 w-full">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="group"
                whileHover="hover"
                initial="rest"
                animate="rest"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative aspect-square mb-4 overflow-hidden bg-gray-50">
                    <motion.div
                      className="absolute inset-0"
                      variants={{
                        rest: { opacity: 1 },
                        hover: { opacity: 0 },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Image
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0"
                      variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Image
                        src="https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png"
                        alt={`${product.name} hover`}
                        fill
                        className="object-cover"
                      />
                </motion.div>
        {!product.in_stock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-xs text-gray-500 font-light">OUT OF STOCK</span>
          </div>
        )}
      </div>

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
          </StaggerReveal>

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