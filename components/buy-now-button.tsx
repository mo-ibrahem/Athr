"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BuyNowButtonProps {
  product: Product
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function BuyNowButton({ product, variant = "default", size = "default", className }: BuyNowButtonProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBuyNow = async () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, this would redirect to payment gateway
    alert(`Redirecting to payment for ${product.name} (${selectedSize})...`)

    setIsProcessing(false)
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
        onClick={handleBuyNow}
        disabled={isProcessing || !selectedSize}
        variant={variant}
        size={size}
        className={className}
      >
        {isProcessing ? "Processing..." : "Buy Now"}
      </Button>
    </div>
  )
}
