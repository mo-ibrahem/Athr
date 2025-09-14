import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SlideIn } from "@/components/slide-in"
import { FadeIn } from "@/components/fade-in"

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-start justify-center bg-black pt-32 md:pt-48" // Changed items-center to items-start and added padding-top
      style={{
        backgroundImage:
          "url('https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for darkening the image */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content on top of the image */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 text-center">
        {" "}
        {/* Removed mb-[35rem] */}
        <SlideIn direction="up" delay={0.3}>
          <h1 className="mt-8 text-5xl font-light leading-[0.9] tracking-tight text-white drop-shadow-lg md:text-7xl lg:text-8xl">
            ATHR
          </h1>
        </SlideIn>
        <FadeIn delay={0.4}>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-light text-white drop-shadow-lg md:text-2xl">
            High-quality, long-lasting, and unforgettable — our perfumes combine unique scents with a wide
            variety to suit every mood and style.
          </p>
        </FadeIn>
        <SlideIn direction="up" delay={0.5}>
          <div className="mt-12 flex justify-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white bg-transparent px-8 py-6 text-sm font-light tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              <Link href="/products">DISCOVER THE COLLECTION</Link>
            </Button>
          </div>
        </SlideIn>
      </div>
    </section>
  )
}