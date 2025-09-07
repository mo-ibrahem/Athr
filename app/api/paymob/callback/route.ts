import { type NextRequest, NextResponse } from "next/server"
import { createPaymobClient } from "@/lib/paymob"

export async function POST(request: NextRequest) {
  try {
    const callbackData = await request.json()

    // Initialize Paymob client
    const paymobClient = createPaymobClient()

    // Verify callback signature
    const isValid = paymobClient.verifyCallback(callbackData)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid callback signature" }, { status: 400 })
    }

    // Process the payment result
    const { success, pending, txn_response_code } = callbackData

    if (success === "true") {
      // Payment successful
      console.log("Payment successful:", callbackData)

      // Here you would typically:
      // 1. Update order status in database
      // 2. Send confirmation email
      // 3. Update inventory

      return NextResponse.json({ status: "success" })
    } else if (pending === "true") {
      // Payment pending
      console.log("Payment pending:", callbackData)
      return NextResponse.json({ status: "pending" })
    } else {
      // Payment failed
      console.log("Payment failed:", callbackData)
      return NextResponse.json({ status: "failed" })
    }
  } catch (error) {
    console.error("Paymob callback error:", error)
    return NextResponse.json({ error: "Callback processing failed" }, { status: 500 })
  }
}
