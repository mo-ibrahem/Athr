import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container px-4 py-12 max-content-width">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand (minimal, no logo) */}
          <div className="space-y-4">
            <span className="font-light text-xl text-black uppercase tracking-wide">ATHR</span>
            <p className="text-sm text-gray-500 max-w-xs">
              Egyptian perfumes crafted for sensual emotions and collective memories through the finest ingredients and ancient traditions.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-black transition-colors text-gray-400">
                <span className="sr-only">Facebook</span>
                {/* Replace emoji with minimal icon or leave empty for minimalism */}
              </Link>
              <Link href="#" className="hover:text-black transition-colors text-gray-400">
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-black transition-colors text-gray-400">
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-light text-black uppercase text-xs tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-black transition-colors text-gray-500">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-black transition-colors text-gray-500">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-black transition-colors text-gray-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black transition-colors text-gray-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-light text-black uppercase text-xs tracking-wide">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="hover:text-black transition-colors text-gray-500">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-black transition-colors text-gray-500">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-black transition-colors text-gray-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-black transition-colors text-gray-500">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-light text-black uppercase text-xs tracking-wide">Contact Info</h3>
            <div className="space-y-3 text-sm text-gray-500">
              <div>Cairo, Egypt</div>
              <div>+20 1023299187</div>
              <div>athrscent@gmail.com</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-xs text-gray-400">
          <p>&copy; 2024 ATHR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}