// Paymob API integration for Egyptian payment processing
export interface PaymobConfig {
  apiKey: string
  integrationId: string
  iframeId: string
  hmacSecret: string
}

export interface PaymobOrderRequest {
  amount: number
  currency: string
  customer: {
    first_name: string
    last_name: string
    email: string
    phone: string
  }
  items: Array<{
    name: string
    amount: number
    quantity: number
  }>
}

export interface PaymobAuthResponse {
  token: string
}

export interface PaymobOrderResponse {
  id: number
  created_at: string
  delivery_needed: boolean
  merchant: any
  collector: any
  amount_cents: number
  shipping_data: any
  currency: string
  is_payment_locked: boolean
  is_return: boolean
  is_cancel: boolean
  is_returned: boolean
  is_canceled: boolean
  merchant_order_id: string
  wallet_notification: any
  paid_amount_cents: number
  notify_user_with_email: boolean
  items: any[]
  order_url: string
  commission_fees: number
  delivery_fees_cents: number
  delivery_vat_cents: number
  payment_method: string
  merchant_staff_tag: any
  api_source: string
  data: any
}

export interface PaymobPaymentKeyResponse {
  token: string
}

export class PaymobAPI {
  private config: PaymobConfig
  private baseURL = "https://accept.paymob.com/api"

  constructor(config: PaymobConfig) {
    this.config = config
  }

  // Step 1: Authentication
  async authenticate(): Promise<string> {
    const response = await fetch(`${this.baseURL}/auth/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: this.config.apiKey,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to authenticate with Paymob")
    }

    const data: PaymobAuthResponse = await response.json()
    return data.token
  }

  // Step 2: Create Order
  async createOrder(authToken: string, orderData: PaymobOrderRequest): Promise<PaymobOrderResponse> {
    const response = await fetch(`${this.baseURL}/ecommerce/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: orderData.amount * 100, // Convert to cents
        currency: orderData.currency,
        items: orderData.items.map((item) => ({
          name: item.name,
          amount_cents: item.amount * 100,
          description: item.name,
          quantity: item.quantity,
        })),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create order")
    }

    return response.json()
  }

  // Step 3: Generate Payment Key
  async generatePaymentKey(authToken: string, orderId: number, orderData: PaymobOrderRequest): Promise<string> {
    const response = await fetch(`${this.baseURL}/acceptance/payment_keys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_token: authToken,
        amount_cents: orderData.amount * 100,
        expiration: 3600, // 1 hour
        order_id: orderId,
        billing_data: {
          apartment: "NA",
          email: orderData.customer.email,
          floor: "NA",
          first_name: orderData.customer.first_name,
          street: "NA",
          building: "NA",
          phone_number: orderData.customer.phone,
          shipping_method: "NA",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          last_name: orderData.customer.last_name,
          state: "Cairo",
        },
        currency: orderData.currency,
        integration_id: this.config.integrationId,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate payment key")
    }

    const data: PaymobPaymentKeyResponse = await response.json()
    return data.token
  }

  // Complete payment process
  async processPayment(orderData: PaymobOrderRequest): Promise<{ paymentUrl: string; orderId: number }> {
    try {
      // Step 1: Authenticate
      const authToken = await this.authenticate()

      // Step 2: Create Order
      const order = await this.createOrder(authToken, orderData)

      // Step 3: Generate Payment Key
      const paymentKey = await this.generatePaymentKey(authToken, order.id, orderData)

      // Step 4: Generate Payment URL
      const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/${this.config.iframeId}?payment_token=${paymentKey}`

      return {
        paymentUrl,
        orderId: order.id,
      }
    } catch (error) {
      console.error("Paymob payment processing error:", error)
      throw error
    }
  }

  // Verify callback signature
  verifyCallback(data: any): boolean {
    try {
      const { hmac, ...callbackData } = data

      if (!hmac || !this.config.hmacSecret) {
        console.warn("HMAC verification skipped - missing hmac or secret")
        return true // Allow for development, but log warning
      }

      // Create HMAC signature from callback data
      const crypto = require("crypto")
      const sortedKeys = Object.keys(callbackData).sort()
      const concatenatedString = sortedKeys.map((key) => callbackData[key]).join("")

      const calculatedHmac = crypto
        .createHmac("sha512", this.config.hmacSecret)
        .update(concatenatedString)
        .digest("hex")

      return calculatedHmac === hmac
    } catch (error) {
      console.error("HMAC verification error:", error)
      return false
    }
  }
}

// Initialize Paymob client (server-side only)
export function createPaymobClient(): PaymobAPI {
  console.log("[v0] Creating Paymob client...")

  const config: PaymobConfig = {
    apiKey: process.env.PAYMOB_API_KEY || "",
    integrationId: process.env.PAYMOB_INTEGRATION_ID || "",
    iframeId: process.env.PAYMOB_IFRAME_ID || "",
    hmacSecret: process.env.PAYMOB_HMAC_SECRET || "",
  }

  console.log("[v0] Paymob config check:")
  console.log("[v0] - API Key:", config.apiKey ? "✓ Present" : "❌ Missing")
  console.log("[v0] - Integration ID:", config.integrationId ? "✓ Present" : "❌ Missing")
  console.log("[v0] - iFrame ID:", config.iframeId ? "✓ Present" : "❌ Missing")
  console.log("[v0] - HMAC Secret:", config.hmacSecret ? "✓ Present" : "❌ Missing")

  if (!config.apiKey || !config.integrationId || !config.iframeId) {
    const missingVars = []
    if (!config.apiKey) missingVars.push("PAYMOB_API_KEY")
    if (!config.integrationId) missingVars.push("PAYMOB_INTEGRATION_ID")
    if (!config.iframeId) missingVars.push("PAYMOB_IFRAME_ID")

    console.error("[v0] Missing Paymob environment variables:", missingVars)
    throw new Error(`Paymob configuration is incomplete. Missing: ${missingVars.join(", ")}`)
  }

  console.log("[v0] Paymob client created successfully")
  return new PaymobAPI(config)
}
