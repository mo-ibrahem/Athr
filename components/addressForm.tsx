"use client"

import { useState } from "react"
import type { Product } from "@/lib/types" // <-- Add this import

export function AddressForm({ product }: { product: Product }) {
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
      Product: ${product.name}
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
    `

    // Send to your email using Formspree or similar service
    await fetch("https://formspree.io/f/your-form-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: "New Order from ATHR",
        message: orderDetails,
      }),
    })

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-6 bg-green-50 rounded text-center">
        <h2 className="text-xl font-light text-green-700 mb-2">Thank you for your order!</h2>
        <p className="text-gray-600">We have received your details and will contact you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg mt-8">
      <h2 className="text-lg font-light mb-2">Shipping Address</h2>
      <input name="name" required placeholder="Full Name" className="w-full border px-3 py-2 rounded text-sm" value={form.name} onChange={handleChange} />
      <input name="email" required type="email" placeholder="Email" className="w-full border px-3 py-2 rounded text-sm" value={form.email} onChange={handleChange} />
      <input name="phone" required placeholder="Phone" className="w-full border px-3 py-2 rounded text-sm" value={form.phone} onChange={handleChange} />
      <input name="country" required placeholder="Country" className="w-full border px-3 py-2 rounded text-sm" value={form.country} onChange={handleChange} />
      <input name="city" required placeholder="City" className="w-full border px-3 py-2 rounded text-sm" value={form.city} onChange={handleChange} />
      <input name="street" required placeholder="Street Address" className="w-full border px-3 py-2 rounded text-sm" value={form.street} onChange={handleChange} />
      <input name="building" placeholder="Building" className="w-full border px-3 py-2 rounded text-sm" value={form.building} onChange={handleChange} />
      <input name="floor" placeholder="Floor" className="w-full border px-3 py-2 rounded text-sm" value={form.floor} onChange={handleChange} />
      <input name="apartment" placeholder="Apartment" className="w-full border px-3 py-2 rounded text-sm" value={form.apartment} onChange={handleChange} />
      <textarea name="notes" placeholder="Order notes (optional)" className="w-full border px-3 py-2 rounded text-sm" value={form.notes} onChange={handleChange} />
      <button type="submit" className="w-full bg-black text-white py-2 rounded font-light" disabled={loading}>
        {loading ? "Sending..." : "Place Order"}
      </button>
    </form>
  )
}