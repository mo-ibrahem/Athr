export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-light mb-4 text-black">Payment Successful</h1>
        <p className="text-gray-600 mb-8">Thank you for your purchase! Your order has been confirmed.</p>
        <a href="/" className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors">
          Continue Shopping
        </a>
      </div>
    </div>
  )
}
