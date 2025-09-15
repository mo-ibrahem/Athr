"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const navTextColor = isHomePage ? "text-white" : "text-black"
  const hoverTextColor = isHomePage ? "hover:text-gray-300" : "hover:text-gray-600"
  const cartBadgeBg = isHomePage ? "bg-white" : "bg-black"
  const cartBadgeText = isHomePage ? "text-black" : "text-white"

  return (
    <header
      className={cn(
        "pt-[1rem] top-0 left-0 w-full z-50 transition-all duration-300",
        isHomePage ? "absolute bg-transparent" : "sticky bg-white/80 backdrop-blur-sm border-b border-gray-200"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className={cn("font-light text-xl tracking-wide uppercase", navTextColor)}>
            <svg width="70" height="70" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Minified SVG paths with fill="currentColor" */}
              <path d="M104.524 265.303H98.0669L95.5897 258.99H78.0142L75.5427 265.303H69.0859L82.6418 230.726H90.9737L104.524 265.303ZM86.8048 236.575L80.0556 253.789H93.5598L86.8048 236.575Z" fill="currentColor"/><path d="M135.529 237.406H124.6V265.303H118.711V237.406H107.781V230.726H135.529V237.406Z" fill="currentColor"/><path d="M165.909 265.303H160.02V250.91H144.652V265.309H138.763V230.731H144.652V245.124H160.02V230.731H165.909V265.303Z" fill="currentColor"/><path d="M201.645 265.303H195.768C195.602 263.824 195.24 262.407 194.696 261.094C193.015 256.983 189.552 254.162 185.865 253.898C185.389 253.863 184.506 253.852 183.56 253.84C183.124 253.835 182.722 253.829 182.424 253.823H178.152V265.303H172.28V230.835H172.63V230.726H191.416C197.029 230.726 201.594 235.904 201.594 242.269C201.594 245.801 200.189 249.098 197.74 251.306L196.227 252.676L197.482 254.357C199.799 257.442 201.256 261.301 201.645 265.303ZM196.433 242.274C196.433 239.138 194.185 236.586 191.421 236.586H178.152V247.963H191.421C194.185 247.963 196.433 245.405 196.433 242.274Z" fill="currentColor"/><path d="M164.22 80.8743C162.894 82.6803 161.61 84.4863 160.362 86.2983V70.1943C160.44 70.1523 160.524 70.0743 160.56 69.9903C161.766 68.8683 162.972 67.7823 164.214 66.7383V80.8743H164.22Z" fill="currentColor"/><path d="M157.956 89.8737C156.708 91.7217 155.424 93.6117 154.14 95.4537V77.1777C155.388 75.6117 156.63 74.0877 157.956 72.6777V89.8737Z" fill="currentColor"/><path d="M137.634 129.072L179.322 87.3838V180.882C179.322 186.186 174.942 190.524 169.644 190.44L159.642 190.362H130.446C120.966 190.362 111.852 194.136 105.102 200.844L60.0784 245.91L59.0764 246.912L40.4404 265.548V226.266L59.0764 207.63L68.1904 198.51L76.3444 190.356L95.9824 170.718L98.3524 168.348L100.722 165.978C102.888 163.812 105.822 162.606 108.876 162.606H150.042C150.846 162.606 151.53 161.922 151.53 161.082V144.534C151.53 143.532 151.128 142.566 150.408 141.846L137.634 129.072Z" fill="currentColor"/><path d="M198.678 47.2984C197.394 48.8644 196.386 50.1124 195.666 51.0724C194.904 52.0384 194.34 52.8004 193.938 53.3644C193.494 53.9644 193.014 54.4084 192.414 54.7324C191.85 55.0144 191.412 55.1764 191.046 55.1764C190.848 55.1764 190.686 55.0984 190.566 54.8944C190.446 54.6964 190.404 54.4504 190.404 54.1744C190.404 53.6944 190.602 52.9264 191.046 51.9664C191.406 51.1204 191.97 49.9984 192.774 48.5104C193.536 47.0644 194.46 45.5404 195.462 43.9744C196.428 42.4084 197.43 40.9204 198.432 39.5944C199.398 38.2264 200.28 37.2664 201 36.6244C201 36.5464 200.598 36.3004 199.716 35.9044C198.75 35.4604 197.67 34.9024 196.464 34.2184C195.3 33.4984 194.172 32.7304 193.17 31.8064C192.126 30.8824 191.646 29.9583 191.646 28.9564C191.646 28.5543 191.808 28.0744 192.168 27.5104C192.528 26.9104 192.972 26.3044 193.536 25.5844C194.1 24.9004 194.658 24.1804 195.264 23.3764C195.864 22.5724 196.428 21.7324 196.95 20.8444C197.832 19.2784 198.84 17.5924 199.962 15.7444C201.084 13.8964 202.254 12.3304 203.454 11.0884C204.9 9.52235 206.544 8.11835 208.434 6.82835C210.324 5.50235 212.37 4.86035 214.536 4.86035C216.384 4.86035 217.992 5.46035 219.438 6.63035C220.884 7.83635 221.604 9.36035 221.604 11.2504C221.604 12.1744 221.364 13.0984 220.962 14.0224C220.56 14.9044 219.798 15.3904 218.712 15.3904C217.908 15.3904 217.224 15.2284 216.624 14.8684C216.024 14.5444 215.376 14.1844 214.776 13.7824C214.134 13.3384 213.492 12.9784 212.808 12.6184C212.166 12.2584 211.362 12.0544 209.516 12.0544C208.908 12.0544 207.384 12.5764 205.98 13.6624C204.576 14.7064 203.568 15.9904 202.968 17.5204C203.694 18.3244 204.534 19.1284 205.578 19.9324C206.58 20.7784 207.666 21.4984 208.83 22.1824C209.994 22.8244 211.2 23.3884 212.442 23.8264C213.69 24.2704 214.854 24.4684 215.976 24.4684C217.224 24.4684 218.424 24.1864 219.552 23.6224C220.674 23.0224 221.964 22.2964 223.326 21.3304C224.61 20.5264 225.774 19.8064 226.902 19.2844C227.988 18.7204 228.87 18.3184 229.512 18.0364C229.914 17.8744 230.514 17.6764 231.318 17.4364C232.122 17.2384 232.722 17.1124 233.166 17.1124C233.328 17.1124 233.526 17.1904 233.766 17.3104C233.964 17.4724 234.09 17.5924 234.09 17.7904C234.09 18.1504 233.928 18.5104 233.61 18.8764C233.328 19.2364 233.046 19.5604 232.764 19.7584C231.72 20.6044 230.718 21.4024 229.752 22.1704C228.786 22.9324 227.742 23.7364 226.62 24.5824C225.096 25.7044 223.728 26.7484 222.486 27.6723C221.28 28.5543 220.074 29.4784 218.91 30.3604C217.704 31.2424 216.498 32.1664 215.214 33.1324C213.93 34.0984 212.52 35.1784 210.996 36.3844C209.832 37.2664 208.668 38.1904 207.462 39.1564C206.298 40.1224 205.134 41.0824 204.048 42.0484C202.926 43.0144 201.918 43.9384 201.036 44.8204C200.124 45.6964 199.326 46.5364 198.678 47.2984Z" fill="currentColor"/><path d="M234.87 31.8359V265.182L212.376 242.73C211.896 242.25 211.452 241.764 211.05 241.242C208.482 238.026 207.072 234.054 207.072 229.914V80.6759L205.668 79.2719L196.548 70.1579L234.87 31.8359Z" fill="currentColor"/><path d="M190.65 57.5043C188.64 58.9083 187.878 59.3103 185.268 61.0383C180.93 64.0083 176.394 66.9003 172.698 70.7163C170.532 72.9243 168.522 75.2943 166.632 77.7063V64.8123C173.418 59.4723 181.05 55.3323 189.204 52.4043C188.88 53.1303 188.724 53.2863 188.562 53.8083C187.998 54.9303 188.118 55.6143 188.442 56.4603C188.562 56.8203 188.766 57.1443 188.964 57.3423C189.126 57.5403 189.324 57.7023 189.606 57.6663C189.966 57.6603 190.128 57.7803 190.65 57.5043Z" fill="currentColor"/><path d="M139.2 98.2264C143.256 92.7244 147.312 86.2984 151.728 80.3164V98.7904C147.672 104.496 143.778 110.394 138.876 115.338C134.178 120.078 128.874 125.178 122.61 127.746C115.662 130.638 109.8 130.638 106.14 130.8C103.65 130.92 99.0715 130.356 100.434 128.91C102.642 126.582 116.016 122.844 120.834 119.148C129.078 112.848 133.176 106.38 139.2 98.2264Z" fill="currentColor"/>
            </svg>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className={cn("text-sm font-light transition-colors", navTextColor, hoverTextColor)}>Home</Link>
          <Link href="/products" className={cn("text-sm font-light transition-colors", navTextColor, hoverTextColor)}>Products</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <CartDrawer>
            <Button variant="ghost" size="icon" className={cn("relative", navTextColor, hoverTextColor)}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1" stroke="currentColor" /><circle cx="20" cy="21" r="1" stroke="currentColor" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" />
              </svg>
              {totalItems > 0 && (
                <span className={cn("absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center", cartBadgeBg, cartBadgeText)}>
                  {totalItems}
                </span>
              )}
            </Button>
          </CartDrawer>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("md:hidden", navTextColor, hoverTextColor)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" /><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" /><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" />
                </svg>
              </Button>
            </SheetTrigger>
            
            {/* START: Updated Mobile Menu Styling */}
            <SheetContent>
              <div className="flex h-full flex-col items-center justify-center">
                <nav className="flex flex-col items-center gap-8 text-center">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-light uppercase tracking-widest text-black transition-colors hover:text-gray-600"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-light uppercase tracking-widest text-black transition-colors hover:text-gray-600"
                  >
                    Products
                  </Link>
                </nav>
              </div>
            </SheetContent>
            {/* END: Updated Mobile Menu Styling */}
          </Sheet>
        </div>
      </div>
    </header>
  )
}