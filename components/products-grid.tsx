"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { StaggerReveal } from "@/components/stagger-reveal"
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
    slug: "blue-vibe-aquatic",
    description: "A refreshing aquatic fragrance inspired by the Mediterranean breeze",
        insp:'s',

    price: 599,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/bluevipecropped.jpeg",
    gallery_images: [],
    category: "Aquatic",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ["30ml", "50ml", "100ml"],
    notes: { top: ["Bergamot", "Sea Salt"], middle: ["Jasmine", "Rose"], base: ["Musk", "Amber"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
  },
  {
    id: "2",
    name: "Boje",
    slug: "boje-amber-essence",
    description: "A warm amber fragrance with oriental spices",
        insp:'s',

    price: 699,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/bojeeecropped.jpeg",
    gallery_images: [],
    category: "Oriental",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ["30ml", "50ml", "100ml"],
    notes: { top: ["Saffron", "Cardamom"], middle: ["Oud", "Rose"], base: ["Amber", "Sandalwood"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
  },
  {
    id: "4",
    name: "Pink Vibe",
    slug: "pink-vibe",
    description: "A romantic floral fragrance with rose and peony",
        insp:'s',

    price: 599,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pinkcripped.jpeg",
    gallery_images: [],
    category: "Floral",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ["30ml", "50ml", "100ml"],
    notes: { top: ["Rose", "Peony"], middle: ["Jasmine", "Lily"], base: ["Musk", "Vanilla"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
  },
  {
    id: "5",
    name: "Tropix",
    slug: "tropix",
    description: "A tropical escape with coconut and exotic fruits",
        insp:'s',

    price: 599,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropix.jpeg",
    gallery_images: [],
    category: "Fruity",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ["30ml", "50ml", "100ml"],
    notes: { top: ["Coconut", "Pineapple"], middle: ["Mango", "Passion Fruit"], base: ["Vanilla", "Sandalwood"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
  },
  {
    id: "3",
    name: "Milka",
    slug: "milka-floral-dream",
    description: "A delicate floral bouquet with Egyptian jasmine",
    insp:'s',
    price: 599,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milkacropped.jpeg",
    gallery_images: [],
    category: "Floral",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizes: ["30ml", "50ml", "100ml"],
    notes: { top: ["Jasmine", "Neroli"], middle: ["Rose", "Lily"], base: ["White Musk", "Vanilla"] },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
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
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-sm text-gray-500 font-light">Loading products...</span>
      </div>
    )
  }

  return (
    <div className="space-y-12 max-content-width mx-auto">
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
<StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
    {sortedProducts.map((product, idx) => (
    <motion.div
  key={product.id}
  className="group"
  // Remove custom, variants, initial, animate, exit
  whileHover="hover"
  transition={{ duration: 0.2, ease: "easeOut" }}
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
      className="object-cover transition-transform"
    />
    {!product.in_stock && (
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
        <span className="text-xs text-gray-500 font-light">OUT OF STOCK</span>
      </div>
    )}
  </motion.div>
</Link>

            {/* Product Info */}
            <div className="space-y-2">
              <Link href={`/products/${product.slug}`}>
                <h3 className="text-sm font-light text-black group-hover:text-gray-600 transition-colors uppercase tracking-wide cursor-pointer">
                  {product.name}
                </h3>
              </Link>

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
          </motion.div>
        ))}
      </StaggerReveal>
    </div>
  )
}
