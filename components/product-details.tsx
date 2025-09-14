"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const router = useRouter()

  const availableSizes =
    product.sizes?.length > 0
      ? product.sizes.map((sizeObj) => (typeof sizeObj === "string" ? sizeObj : sizeObj.size))
      : [ "50ml"]
  const [selectedSize, setSelectedSize] = useState(availableSizes[0])
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)

  const { addItem } = useCart()

  const getSizePrice = (size: string) => {
    if (product.sizes?.length > 0) {
      const sizeObj = product.sizes.find((s) => (typeof s === "string" ? s : s.size) === size)
      if (sizeObj && typeof sizeObj === "object") {
        return sizeObj.price
      }
    }

    // Fallback pricing logic
    const basePrice = product.price
    switch (size) {
      case "50ml":
        return Math.round(basePrice * 1.5)
      case "100ml":
        return Math.round(basePrice * 2.5)
      default:
        return basePrice
    }
  }

  const currentPrice = getSizePrice(selectedSize)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    addItem(product, selectedSize, quantity)
    setIsAddingToCart(false)
  }

 const handleBuyNow = async () => {
    setIsBuyingNow(true)
    try {
      // Add the product to the cart
      addItem(product, selectedSize, quantity)
      // Redirect to checkout page
      router.push("/checkout-fourm") // or "/checkout" if that's your route
    } catch (error) {
      console.error("Buy now error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsBuyingNow(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Product Info */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-light text-black uppercase tracking-wide">{product.name}</h1>
          <p className="text-sm text-gray-600 font-light leading-relaxed">{product.description}</p>
          <p className="text-sm text-gray-800 font-meduim leading-relaxed">{product.insp}</p>

        </div>

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-xl font-light text-black">{formatPrice(currentPrice)}</span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          {product.in_stock ? (
            <span className="text-xs text-gray-600 font-light uppercase tracking-wide">In Stock</span>
          ) : (
            <span className="text-xs text-gray-400 font-light uppercase tracking-wide">Out of Stock</span>
          )}
        </div>
      </div>

      {/* Minimal separator line */}
      <div className="border-t border-gray-100"></div>

      {/* Size Selection */}
      {/* <div className="space-y-4">
        <h3 className="text-sm font-light text-black uppercase tracking-wide">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              className={`py-3 px-4 text-xs font-light uppercase tracking-wide transition-colors border ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div> */}

      {/* Quantity */}
      <div className="space-y-4">
        <h3 className="text-sm font-light text-black uppercase tracking-wide">Quantity</h3>
        <div className="flex items-center gap-0 border border-gray-200 w-fit">
          <button
            className="w-10 h-10 flex items-center justify-center text-black hover:bg-gray-50 transition-colors disabled:text-gray-300"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-12 h-10 flex items-center justify-center text-sm font-light border-x border-gray-200">
            {quantity}
          </span>
          <button
            className="w-10 h-10 flex items-center justify-center text-black hover:bg-gray-50 transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          className="w-full py-4 bg-black text-white text-sm font-light uppercase tracking-wide hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!product.in_stock || isAddingToCart}
          onClick={handleAddToCart}
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
        <button
          className="w-full py-4 border border-gray-200 text-black text-sm font-light uppercase tracking-wide hover:border-black transition-colors disabled:border-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          disabled={!product.in_stock || isBuyingNow}
          onClick={handleBuyNow}
        >
          {isBuyingNow ? "Processing..." : "Buy Now"}
        </button>
      </div>

      {/* Minimal separator line */}
      <div className="border-t border-gray-100"></div>

      {/* Ingredients */}
      <div className="space-y-4">
        <h3 className="text-sm font-light text-black uppercase tracking-wide">Ingredients</h3>
        <div className="flex flex-wrap gap-2">
          {product.ingredients?.map((ingredient, index) => (
            <span key={index} className="px-3 py-1 text-xs font-light text-gray-600 border border-gray-200">
              {ingredient}
            </span>
          )) || <p className="text-sm text-gray-500 font-light">No ingredients listed</p>}
        </div>
      </div>

      {/* Features */}
      {/* <div className="grid grid-cols-1 gap-4 pt-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm font-light text-black">Free Shipping</span>
          <span className="text-xs text-gray-500 font-light">On orders over EGP 500</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm font-light text-black">Authentic</span>
          <span className="text-xs text-gray-500 font-light">100% genuine products</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-light text-black">Easy Returns</span>
          <span className="text-xs text-gray-500 font-light">30-day return policy</span>
        </div>
      </div> */}
    </div>
  )
}
