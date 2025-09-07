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
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-8 w-8">
            <Image src="/athr-logo.jpg" alt="ATHR" width={32} height={32} className="w-full h-full object-contain" />
          </div>
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
          <Button variant="ghost" size="icon" className="hidden sm:flex text-black hover:text-gray-600">
            <span className="text-xs">🔍</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-black hover:text-gray-600">
            <span className="text-xs">👤</span>
          </Button>

          <CartDrawer>
            <Button variant="ghost" size="icon" className="text-black hover:text-gray-600 relative">
              <span className="text-xs">🛍️</span>
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
                <span className="text-xs">☰</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link href="/products" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Products
                </Link>
                <Link href="/collections" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Collections
                </Link>
                <Link href="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
