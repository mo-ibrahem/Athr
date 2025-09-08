"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function AddToCartButton({ product, variant = "default", size = "default", className }: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    setIsAdding(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    addItem(product, selectedSize)
    setIsAdding(false)

    // Item added to cart successfully
  }

  return (
    <div className="space-y-3">
      <Select value={selectedSize} onValueChange={setSelectedSize}>
        <SelectTrigger>
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30ml">30ml - {product.price} EGP</SelectItem>
          <SelectItem value="50ml">50ml - {Math.round(product.price * 1.5)} EGP</SelectItem>
          <SelectItem value="100ml">100ml - {Math.round(product.price * 2.5)} EGP</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={handleAddToCart}
        disabled={isAdding || !selectedSize}
        variant={variant}
        size={size}
        className={className}
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  )
}
