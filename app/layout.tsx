import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { PageTransition } from "@/components/page-transition"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"
import Script from "next/script"; // <-- 1. Make sure to import Script

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ATHR - Leave a Lasting Impression",
  description:
    "High-quality, long-lasting, and unforgettable — our perfumes combine unique scents with a wide variety to suit every mood and style. Discover your signature fragrance today.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    const PIXEL_ID = "2257559048025856"; // <-- Your Pixel ID

  return (
    <html lang="en">
     <link rel="icon" href="/atthr.svg" sizes="any" />

      <body className={`font-sans ${inter.variable} antialiased`}>
        <CartProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </CartProvider>
         {/* START: Add Meta Pixel Code Here */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* END: Add Meta Pixel Code Here */}
      </body>
    </html>
  )
}
