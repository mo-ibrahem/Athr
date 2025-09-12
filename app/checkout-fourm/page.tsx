"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

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
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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

Cart:
${items.map(item => 
  `- ${item.product.name} (${item.size}) x${item.quantity} = ${item.actualPrice * item.quantity} EGP
    Image: ${item.product.image_url || "N/A"}`
).join("\n")}
`

    // Send to your email using Formspree (or similar service)
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
                <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow space-y-8">

        <div>
  <h3 className="text-lg font-light text-black mb-2">Your Order</h3>
  {items.length === 0 ? (
    <p className="text-sm text-gray-500">Your cart is empty.</p>
  ) : (
    // ...existing code...
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
// ...existing code...
  )}
</div>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow space-y-6">
  <h2 className="text-xl font-light text-black mb-4">Checkout</h2>
  <input
    name="name"
    type="text"
    required
    placeholder="Full Name"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.name}
    onChange={handleChange}
  />
  <input
    name="email"
    type="email"
    required
    placeholder="Email"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.email}
    onChange={handleChange}
  />
  <input
    name="phone"
    type="tel"
    required
    placeholder="Phone"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.phone}
    onChange={handleChange}
  />
  <input
    name="country"
    type="text"
    required
    placeholder="Country"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.country || ""}
    onChange={handleChange}
  />
  <input
    name="city"
    type="text"
    required
    placeholder="City"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.city || ""}
    onChange={handleChange}
  />
  <input
    name="street"
    type="text"
    required
    placeholder="Street Address"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.street || ""}
    onChange={handleChange}
  />
  <input
    name="building"
    type="text"
    placeholder="Building"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.building || ""}
    onChange={handleChange}
  />
  <input
    name="floor"
    type="text"
    placeholder="Floor"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.floor || ""}
    onChange={handleChange}
  />
  <input
    name="apartment"
    type="text"
    placeholder="Apartment"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.apartment || ""}
    onChange={handleChange}
  />
  <textarea
    name="notes"
    placeholder="Order notes (optional)"
    className="w-full border px-3 py-2 rounded text-sm"
    value={form.notes}
    onChange={handleChange}
  />
  <button
    type="submit"
    className="w-full bg-black text-white py-2 rounded font-light"
    disabled={loading}
  >
    {loading ? "Sending..." : "Place Order"}
  </button>
</form>
</div>

      </main>
      <Footer />
    </div>
  )
}