import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 max-content-width">
        <h1 className="text-3xl font-light text-center mb-8 text-black">CHECKOUT</h1>
        <CheckoutForm />
      </div>
    </div>
  )
}
