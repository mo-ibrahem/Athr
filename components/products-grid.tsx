"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { StaggerReveal } from "@/components/stagger-reveal"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import type { Product, SortOption } from "@/lib/types"

// Import our new, powerful sorting function
import { getAndSortProducts } from "@/lib/client-data"

export function ProductsGrid() {
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  // This useEffect hook now re-fetches when 'sortBy' changes
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const data = await getAndSortProducts(sortBy);
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [sortBy]); // <-- Re-runs this effect whenever sortBy changes

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    // Using the correct "50ml" size
    addItem(product, "50ml", 1) 
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
      <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product, idx) => ( // The 'products' state is now already sorted
          <motion.div
            key={product.id}
            className="group"
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
                  // Using the thumbnail image with a fallback to the main image
                  src={product.thumbnail_url || product.image_url || "/placeholder.svg"}
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