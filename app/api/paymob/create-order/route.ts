import { type NextRequest, NextResponse } from "next/server"
import { createPaymobClient } from "@/lib/paymob"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Paymob API route called")
    const orderData = await request.json()
    console.log("[v0] Received order data:", orderData)

    // Validate required fields
    if (!orderData.customer || !orderData.items || !orderData.amount) {
      console.log("[v0] Missing required order data")
      return NextResponse.json({ error: "Missing required order data" }, { status: 400 })
    }

    console.log("[v0] Creating Paymob client...")
    // Initialize Paymob client
    const paymobClient = createPaymobClient()
    console.log("[v0] Paymob client created successfully")

    console.log("[v0] Processing payment...")
    // Process payment
    const { paymentUrl, orderId } = await paymobClient.processPayment(orderData)
    console.log("[v0] Payment processed successfully:", { paymentUrl, orderId })

    return NextResponse.json({
      success: true,
      paymentUrl,
      orderId,
    })
  } catch (error) {
    console.error("[v0] Paymob order creation error:", error)
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
  }
}
