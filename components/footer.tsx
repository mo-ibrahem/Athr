import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl text-white">ATHR</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              Egyptian perfumes crafted for sensual emotions and collective memories through the finest ingredients and
              ancient traditions.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-amber-400 transition-colors">
                <span className="text-lg">📘</span>
              </Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                <span className="text-lg">📷</span>
              </Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                <span className="text-lg">🐦</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-amber-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-amber-400 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="hover:text-amber-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-amber-400 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-amber-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">📍</span>
                <span>Cairo, Egypt</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">📞</span>
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">✉️</span>
                <span>info@athr.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2024 ATHR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
