"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "./types"

interface CartItem {
  product: Product
  quantity: number
  size: string
  actualPrice: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: string, quantity?: number) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const SIZE_MULTIPLIERS: Record<string, number> = {
  "30ml": 1,
  "50ml": 1.5,
  "100ml": 2.5,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, size: string, quantity = 1) => {
    const multiplier = SIZE_MULTIPLIERS[size] || 1
    const actualPrice = product.price * multiplier

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id && item.size === size)

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id && item.size === size ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...prevItems, { product, size, quantity, actualPrice }]
    })
  }

  const removeItem = (productId: string, size: string) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.product.id === productId && item.size === size)))
  }

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.product.id === productId && item.size === size ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => setItems([])

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.actualPrice * item.quantity, 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
