"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
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
      name_arabic: "النسيم الأزرق",
      description: "A refreshing aquatic fragrance inspired by the Mediterranean breeze",
      price: 299,
      original_price: 399,
      image_url:
        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/blue%20vibe%20first%20photo.png",
      hover_image_url:
        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
      category: "aquatic",
      in_stock: true,
      slug: "blue-vibe",
      fragrance_notes: ["Sea Salt", "Bergamot", "Ambergris"],
      ingredients: ["Alcohol", "Aqua", "Parfum"],
      sizes: [
        { size: "30ml", price: 299 },
        { size: "50ml", price: 449 },
        { size: "100ml", price: 699 },
      ],
    },
    {
      id: "2",
      name: "Boje",
      name_arabic: "بوجة",
      description: "A warm amber fragrance with oriental spices",
      price: 349,
      original_price: 449,
      image_url:
        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/boje%20first%20photo.png",
      hover_image_url:
        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
      category: "oriental",
      in_stock: true,
      slug: "boje-amber-essence",
      fragrance_notes: ["Amber", "Saffron", "Oud"],
      ingredients: ["Alcohol", "Aqua", "Parfum"],
      sizes: [
        { size: "30ml", price: 349 },
        { size: "50ml", price: 499 },
        { size: "100ml", price: 749 },
      ],
    },
    {
      id: "3",
      name: "Milka",
      name_arabic: "ميلكا",
      description: "A delicate floral bouquet with jasmine and rose",
      price: 279,
      original_price: 359,
      image_url:
        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka%20first%20photo.png",
      hover_image_url:
        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
      category: "floral",
      in_stock: true,
      slug: "milka-floral-dream",
      fragrance_notes: ["Jasmine", "Rose", "White Musk"],
      ingredients: ["Alcohol", "Aqua", "Parfum"],
      sizes: [
        { size: "30ml", price: 279 },
        { size: "50ml", price: 419 },
        { size: "100ml", price: 649 },
      ],
    },
  ]

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, "30ml", 1)
    alert("Added to cart!")
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
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-2xl font-light text-black uppercase tracking-wide">Featured Collection</h2>
          <p className="text-sm text-gray-500 font-light max-w-2xl mx-auto">
            Discover our most beloved perfumes, each telling a unique story of Egyptian heritage and luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-x-6 gap-y-12 max-w-4xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/products/${product.slug}`} className="block">
                {/* Product Image */}
                <div className="relative aspect-square mb-4 overflow-hidden bg-gray-50">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500"
                  />

                  {product.hover_image_url && product.hover_image_url !== product.image_url && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={product.hover_image_url || "/placeholder.svg"}
                        alt={`${product.name} hover`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  )}

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
            </div>
          ))}
        </div>

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
    </section>
  )
}
