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

    try {
      // Calculate price based on size
      const sizeMultipliers: Record<string, number> = {
        "30ml": 1,
        "50ml": 1.5,
        "100ml": 2.5,
      }
      const multiplier = sizeMultipliers[selectedSize] || 1
      const actualPrice = product.price * multiplier

      // Prepare order data for Paymob
      const orderData = {
        amount: actualPrice,
        currency: "EGP",
        customer: {
          first_name: "Customer", // You might want to get this from user input
          last_name: "Name",
          email: "customer@example.com", // You might want to get this from user input
          phone: "+201234567890", // You might want to get this from user input
        },
        items: [
          {
            name: `${product.name} (${selectedSize})`,
            amount: actualPrice,
            quantity: 1,
            description: product.description,
            image_url: product.image_url,
          },
        ],
      }

      console.log("Creating payment order for:", orderData)

      // Create payment order (server-side processing)
      const response = await fetch("/api/paymob/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Payment order creation failed:", errorText)
        throw new Error(`Failed to create payment order: ${errorText}`)
      }

      const responseData = await response.json()
      console.log("Payment order created:", responseData)

      const { paymentUrl } = responseData

      // Redirect to Paymob payment page
      window.location.href = paymentUrl
    } catch (error) {
      console.error("Buy now error:", error)
      alert(`Payment processing failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsProcessing(false)
    }
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
