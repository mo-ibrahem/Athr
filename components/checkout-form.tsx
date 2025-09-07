"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
}

export function CheckoutForm() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Checkout form submitted")
    console.log("[v0] Cart items:", items)
    console.log("[v0] Total price:", getTotalPrice())

    setIsProcessing(true)
    setError(null)

    try {
      // Prepare order data
      const orderData = {
        amount: getTotalPrice(),
        currency: "EGP",
        customer: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        items: items.map((item) => ({
          name: `${item.product.name} (${item.size})`,
          amount: item.actualPrice,
          quantity: item.quantity,
        })),
      }

      console.log("[v0] Order data prepared:", orderData)

      // Create payment order (server-side processing)
      console.log("[v0] Making API call to /api/paymob/create-order")
      const response = await fetch("/api/paymob/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      console.log("[v0] API response status:", response.status)
      console.log("[v0] API response ok:", response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.log("[v0] API error response:", errorText)
        throw new Error(`Failed to create payment order: ${errorText}`)
      }

      const responseData = await response.json()
      console.log("[v0] API response data:", responseData)

      const { paymentUrl } = responseData

      console.log("[v0] Payment URL:", paymentUrl)
      console.log("[v0] Clearing cart and redirecting...")

      clearCart()

      // Redirect to Paymob payment page
      window.location.href = paymentUrl
    } catch (err) {
      console.log("[v0] Checkout error:", err)
      setError(err instanceof Error ? err.message : "Payment processing failed")
    } finally {
      setIsProcessing(false)
    }
  }

  const totalPrice = getTotalPrice()

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    Size: {item.size} • Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">EGP {(item.actualPrice * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>EGP {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <Button type="submit" className="w-full" disabled={isProcessing || items.length === 0}>
                {isProcessing ? "Processing..." : `Pay EGP ${totalPrice.toFixed(2)}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
