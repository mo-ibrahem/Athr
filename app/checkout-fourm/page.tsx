"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const PaymentIcons = {
  cod: (
    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <rect x="3" y="7" width="18" height="13" rx="2" fill="#f3f4f6" />
      <path d="M16 3v4M8 3v4M3 11h18" stroke="#191919" />
    </svg>
  ),
  vodacash: (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#fee2e2" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#b91c1c">VC</text>
    </svg>
  ),
  instapay: (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="#dbeafe" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#1d4ed8">IP</text>
    </svg>
  ),
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    building: "",
    floor: "",
    apartment: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cod") // cod, vodacash, instapay
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Prepare order details
    const orderDetails = `
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Country: ${form.country}
City: ${form.city}
Street: ${form.street}
Building: ${form.building}
Floor: ${form.floor}
Apartment: ${form.apartment}
Notes: ${form.notes}

Payment Method: ${paymentMethod === "cod" ? "Pay on Delivery" : paymentMethod === "vodacash" ? "Vodacash" : "Instapay"}
${paymentMethod === "vodacash" ? "Vodacash Number: 01001234567" : ""}
${paymentMethod === "instapay" ? "Instapay Number: 01007654321" : ""}

Cart:
${items.map(item => 
  `- ${item.product.name} (${item.size}) x${item.quantity} = ${item.actualPrice * item.quantity} EGP
    Image: ${item.product.image_url || "N/A"}`
).join("\n")}
`

    await fetch("https://formspree.io/f/xldwvbqp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: "New Order from ATHR",
        message: orderDetails,
      }),
    })

    setLoading(false)
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-light text-black">Thank you for your order!</h2>
            <p className="text-gray-500">We have received your details and will contact you soon.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow flex flex-col md:flex-row gap-8">
          {/* Left: Cart and Form */}
          <div className="flex-1 space-y-8">
            <div>
  <h3 className="text-lg font-light text-black mb-2">Your Order</h3>
  {items.length === 0 ? (
    <p className="text-sm text-gray-500">Your cart is empty.</p>
  ) : (
    <>
      <ul className="divide-y divide-gray-100 mb-4">
        {items.map((item, idx) => (
          <li key={idx} className="py-2 flex items-center gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100 border">
              <img
                src={item.product.image_url || "/placeholder.svg"}
                alt={item.product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-black">
                {item.product.name} <span className="text-gray-400">({item.size})</span> × {item.quantity}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {item.actualPrice * item.quantity} EGP
            </span>
          </li>
        ))}
      </ul>
      {/* Delivery Fee */}
      <div className="flex items-center justify-between text-sm py-2">
        <span className="text-gray-600">Delivery</span>
        <span className="font-semibold text-black bg-yellow-100 px-2 py-1 rounded">80 EGP</span>
      </div>
      {/* Total */}
      <div className="flex items-center justify-between text-base font-medium py-2 border-t mt-2">
        <span className="text-black">Total</span>
        <span className="text-black">
          {items.reduce((sum, item) => sum + item.actualPrice * item.quantity, 0) + 80} EGP
        </span>
      </div>
    </>
  )}
</div>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-6">
  <h2 className="text-xl font-light text-black mb-4">Checkout</h2>
  <input
    name="name"
    type="text"
    required
    placeholder="Full Name"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none"
    value={form.name}
    onChange={handleChange}
  />
  <input
    name="email"
    type="email"
    required
    placeholder="Email"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none"
    value={form.email}
    onChange={handleChange}
  />
  <input
    name="phone"
    type="tel"
    required
    placeholder="Phone"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none"
    value={form.phone}
    onChange={handleChange}
  />
  <input
    name="country"
    type="text"
    required
    placeholder="Country"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none"
    value={form.country}
    onChange={handleChange}
  />
  <input
    name="city"
    type="text"
    required
    placeholder="City"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none"
    value={form.city}
    onChange={handleChange}
  />
  <input
    name="street"
    type="text"
    required
    placeholder="Street Address"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none"
    value={form.street}
    onChange={handleChange}
  />
  <input
    name="building"
    type="text"
    placeholder="Building"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none"
    value={form.building}
    onChange={handleChange}
  />
  <input
    name="floor"
    type="text"
    placeholder="Floor"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none"
    value={form.floor}
    onChange={handleChange}
  />
  <input
    name="apartment"
    type="text"
    placeholder="Apartment"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none"
    value={form.apartment}
    onChange={handleChange}
  />
  <textarea
    name="notes"
    placeholder="Order notes (optional)"
    className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 bg-gray-50 px-4 py-3 rounded-none transition-all text-sm outline-none resize-none"
    value={form.notes}
    onChange={handleChange}
    rows={3}
  />
  <button
    type="submit"
    className="w-full bg-black text-white py-3 rounded-none font-light text-base hover:bg-gray-900 transition-all"
    disabled={loading}
  >
    {loading ? "Sending..." : "Place Order"}
  </button>
</form>
          </div>
          {/* Right: Modern Payment Options */}
          <div className="w-full md:w-80 flex flex-col justify-center">
            <div className="bg-gray-50 p-6 rounded-xl shadow space-y-6">
              <h3 className="text-lg font-light text-black mb-4 text-center">Payment Method</h3>
              <div className="space-y-4">
                {[
                  { value: "cod", label: "Pay on Delivery", icon: PaymentIcons.cod },
                  { value: "vodacash", label: "Vodacash", icon: PaymentIcons.vodacash, phone: "01001234567", color: "border-red-400" },
                  { value: "instapay", label: "Instapay", icon: PaymentIcons.instapay, phone: "01007654321", color: "border-blue-400" },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      paymentMethod === method.value
                        ? `border-2 ${method.color || "border-black"} bg-white shadow`
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={handlePaymentChange}
                      className="accent-black"
                      style={{ display: "none" }}
                    />
                    <span>{method.icon}</span>
                    <span className="font-medium">{method.label}</span>
                    {paymentMethod === method.value && (
                      <svg className="ml-auto w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                ))}
                {paymentMethod === "vodacash" && (
                  <div className="text-center text-sm text-gray-700 bg-yellow-50 p-2 rounded">
                    Send to: <span className="font-semibold">01023299187</span>
                  </div>
                )}
                {paymentMethod === "instapay" && (
                  <div className="text-center text-sm text-gray-700 bg-blue-50 p-2 rounded">
                    Send to: <span className="font-semibold">01023299187</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}