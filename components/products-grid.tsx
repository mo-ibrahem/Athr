"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

type SortOption = "name" | "price-low" | "price-high" | "newest"

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Blue Vibe",
    slug: "blue-vibe",
    description: "A refreshing aquatic fragrance inspired by the Mediterranean breeze",
    price: 299,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/blue%20vibe%20first%20photo.png",
    category: "Aquatic",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: { "30ml": 299, "50ml": 449, "100ml": 699 },
    notes: { top: ["Bergamot", "Sea Salt"], middle: ["Jasmine", "Rose"], base: ["Musk", "Amber"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    hover_image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
  },
  {
    id: "2",
    name: "Boje",
    slug: "boje",
    description: "A warm amber fragrance with oriental spices",
    price: 349,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/boje%20first%20photo.png",
    category: "Oriental",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: { "30ml": 349, "50ml": 499, "100ml": 799 },
    notes: { top: ["Saffron", "Cardamom"], middle: ["Oud", "Rose"], base: ["Amber", "Sandalwood"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    hover_image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
  },
  {
    id: "3",
    name: "Milka",
    slug: "milka",
    description: "A delicate floral bouquet with Egyptian jasmine",
    price: 279,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka%20first%20photo.png",
    category: "Floral",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: { "30ml": 279, "50ml": 399, "100ml": 599 },
    notes: { top: ["Jasmine", "Neroli"], middle: ["Rose", "Lily"], base: ["White Musk", "Vanilla"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    hover_image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
  },
  {
    id: "4",
    name: "Pink Vibe",
    slug: "pink-vibe",
    description: "A romantic floral fragrance with rose and peony",
    price: 319,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe%20first%20photo.png",
    category: "Floral",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: { "30ml": 319, "50ml": 469, "100ml": 719 },
    notes: { top: ["Rose", "Peony"], middle: ["Jasmine", "Lily"], base: ["Musk", "Vanilla"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    hover_image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
  },
  {
    id: "5",
    name: "Tropix",
    slug: "tropix",
    description: "A tropical escape with coconut and exotic fruits",
    price: 289,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropix%20first%20photo.png",
    category: "Fruity",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: { "30ml": 289, "50ml": 429, "100ml": 649 },
    notes: { top: ["Coconut", "Pineapple"], middle: ["Mango", "Passion Fruit"], base: ["Vanilla", "Sandalwood"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    hover_image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
  },
  {
    id: "6",
    name: "ATHR",
    slug: "athr",
    description: "The signature fragrance of our brand",
    price: 399,
    image_url: "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/1.png",
    category: "Signature",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: { "30ml": 399, "50ml": 599, "100ml": 899 },
    notes: { top: ["Bergamot", "Lemon"], middle: ["Lavender", "Geranium"], base: ["Vetiver", "Cedarwood"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    hover_image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
  },
]

export function ProductsGrid() {
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("products").select("*").order("name")

        if (error) {
          console.error("Supabase error:", error.message)
          setProducts(mockProducts)
        } else {
          setProducts(data || mockProducts)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts(mockProducts)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, "30ml", 1)
    alert("Added to cart!")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-sm text-gray-500 font-light">Loading products...</span>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Minimal Toolbar */}
      <div className="flex items-center justify-between pb-8 border-b border-gray-200">
        <div>
          <span className="text-sm text-gray-500 font-light">({products.length})</span>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-sm text-gray-500 hover:text-black transition-colors font-light">FILTER +</button>

          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-[140px] border-0 text-sm font-light">
              <SelectValue placeholder="SORT" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">NAME</SelectItem>
              <SelectItem value="price-low">PRICE LOW</SelectItem>
              <SelectItem value="price-high">PRICE HIGH</SelectItem>
              <SelectItem value="newest">NEWEST</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clean Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {sortedProducts.map((product) => (
          <div key={product.id} className="group">
            <Link href={`/products/${product.slug}`} className="block">
              {/* Product Image with Hover Transition */}
              <div className="relative aspect-square mb-4 overflow-hidden bg-gray-50">
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      console.log("[v0] Default image failed to load:", product.image_url)
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Image
                    src="https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png"
                    alt={`${product.name} hover`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      console.log(
                        "[v0] Hover image failed to load:",
                        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
                      )
                      e.currentTarget.style.display = "none"
                    }}
                    onLoad={() => {
                      console.log(
                        "[v0] Hover image loaded successfully:",
                        "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png",
                      )
                    }}
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
          </div>
        ))}
      </div>
    </div>
  )
}
