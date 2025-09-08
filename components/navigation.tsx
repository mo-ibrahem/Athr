"use client"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/lib/cart-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    // ...existing code...
<header className="sticky top-0 z-50 w-full border-b bg-white">
  <div className="container flex h-16 items-center justify-between px-4 max-content-width">
    {/* Remove the logo, keep only the ATHR text */}
    <Link href="/" className="flex items-center">
      <span className="font-light text-xl text-black tracking-wide uppercase">ATHR</span>
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center space-x-8">
      <Link href="/" className="text-sm font-light hover:text-gray-600 transition-colors text-black">
        Home
      </Link>
      <Link href="/products" className="text-sm font-light hover:text-gray-600 transition-colors text-black">
        Products
      </Link>
      <Link href="/collections" className="text-sm font-light hover:text-gray-600 transition-colors text-black">
        Collections
      </Link>
      <Link href="/about" className="text-sm font-light hover:text-gray-600 transition-colors text-black">
        About
      </Link>
      <Link href="/contact" className="text-sm font-light hover:text-gray-600 transition-colors text-black">
        Contact
      </Link>
    </nav>

    {/* Actions */}
    <div className="flex items-center space-x-2">
      {/* Use SVG icons for black and white style */}
      <Button variant="ghost" size="icon" className="hidden sm:flex text-black hover:text-gray-600">
        <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" stroke="black" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="black" />
        </svg>
      </Button>
      <Button variant="ghost" size="icon" className="text-black hover:text-gray-600">
        <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" stroke="black" />
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4" stroke="black" />
        </svg>
      </Button>

      <CartDrawer>
        <Button variant="ghost" size="icon" className="text-black hover:text-gray-600 relative">
          <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1" stroke="black" />
            <circle cx="20" cy="21" r="1" stroke="black" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="black" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </CartDrawer>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden text-black hover:text-gray-600">
            <svg width="24" height="24" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" stroke="black" />
              <line x1="3" y1="12" x2="21" y2="12" stroke="black" />
              <line x1="3" y1="18" x2="21" y2="18" stroke="black" />
            </svg>
          </Button>
        </SheetTrigger>
        {/* ...existing SheetContent... */}
      </Sheet>
    </div>
  </div>
</header>
// ...existing code...
  )
}
