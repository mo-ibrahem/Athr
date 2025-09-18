"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter()
  
  // With correct types, this logic is now simple and safe.
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].size)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const { addItem } = useCart()

  // This is now much simpler and more reliable.
  const currentPrice = product.sizes.find(s => s.size === selectedSize)?.price || product.price;

  // META PIXEL EVENT: ViewContent
  useEffect(() => {
    if (product) {
      window.fbq('track', 'ViewContent', {
        content_type: 'product',
        content_ids: [product.id],
        content_name: product.name,
        value: currentPrice,
        currency: 'EGP',
      });
    }
  }, [product, currentPrice]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addItem(product, selectedSize, quantity)

    if (product) {
      window.fbq('track', 'AddToCart', {
        content_type: 'product',
        content_ids: [product.id],
        content_name: product.name,
        value: currentPrice * quantity,
        currency: 'EGP',
      });
    }
    setTimeout(() => setIsAddingToCart(false), 500)
  }

  const handleBuyNow = async () => {
    setIsBuyingNow(true)
    try {
      addItem(product, selectedSize, quantity)
      
      if (product) {
        window.fbq('track', 'AddToCart', {
          content_type: 'product',
          content_ids: [product.id],
          content_name: product.name,
          value: currentPrice * quantity,
          currency: 'EGP',
        });
      }
      router.push("/checkout-fourm")
    } catch (error) {
      console.error("Buy now error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsBuyingNow(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-light text-black uppercase tracking-wide">{product.name}</h1>
          <p className="text-sm text-gray-600 font-light leading-relaxed">{product.description}</p>
          <p className="text-sm text-gray-800 font-medium leading-relaxed">{product.insp}</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xl font-light text-black">{formatPrice(currentPrice)}</span>
        </div>

        <div className="flex items-center gap-2">
          {product.in_stock ? (
            <span className="text-xs text-gray-600 font-light uppercase tracking-wide">In Stock</span>
          ) : (
            <span className="text-xs text-gray-400 font-light uppercase tracking-wide">Out of Stock</span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100"></div>
      
      {product.sizes.length > 1 && (
        <div className="space-y-4">
          <h3 className="text-sm font-light text-black uppercase tracking-wide">Size</h3>
          <div className="grid grid-cols-3 gap-2">
            {product.sizes.map((sizeInfo) => (
              <button
                key={sizeInfo.size}
                className={`py-3 px-4 text-xs font-light uppercase tracking-wide transition-colors border ${
                  selectedSize === sizeInfo.size
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-200 hover:border-black"
                }`}
                onClick={() => setSelectedSize(sizeInfo.size)}
              >
                {sizeInfo.size}
              </button>
            ))}
          </div>
        </div>
      )}

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

      <div className="border-t border-gray-100"></div>

      <div className="space-y-4">
        <h3 className="text-sm font-light text-black uppercase tracking-wide">Ingredients</h3>
        <div className="flex flex-wrap gap-2">
          {product.ingredients?.length > 0 ? (
            product.ingredients.map((ingredient, index) => (
              <span key={index} className="px-3 py-1 text-xs font-light text-gray-600 border border-gray-200">
                {ingredient}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500 font-light">No ingredients listed</p>
          )}
        </div>
      </div>
    </div>
  )
}