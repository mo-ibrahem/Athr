import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SlideIn } from "@/components/slide-in"
import { FadeIn } from "@/components/fade-in"

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-black"
      style={{
        backgroundImage: "url('https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for darkening the image */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content on top of the image */}
      <div className="relative z-10 mb-[35rem] w-full flex flex-col items-center justify-center text-center px-4">
        <SlideIn direction="up" delay={0.3}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mt-8 font-light text-white leading-[0.9] tracking-tight drop-shadow-lg">
            ATHR
          </h1>
        </SlideIn>
        <FadeIn delay={0.4}>
          <p className="mt-8 text-lg md:text-2xl text-white font-light max-w-2xl mx-auto drop-shadow-lg">
            High-quality, long-lasting, and unforgettable — our perfumes combine unique scents with a wide variety to suit every mood and style.
          </p>
        </FadeIn>
        <SlideIn direction="up" delay={0.5}>
          <div className="mt-12 flex justify-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black transition-colors duration-300 px-8 py-6 text-sm font-light tracking-wide bg-transparent"
            >
              <Link href="/products">DISCOVER THE COLLECTION</Link>
            </Button>
          </div>
        </SlideIn>
      </div>
    </section>
  )
}