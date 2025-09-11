import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SlideIn } from "@/components/slide-in"
import { FadeIn } from "@/components/fade-in"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="container px-4 relative z-10 max-hero-width">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-12">
            <div className="space-y-8">
              <SlideIn direction="up" delay={0.3}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl mt-8 font-light text-balance leading-[0.9] tracking-tight">
                  <span className="text-black">ATHR</span>
                </h1>
              </SlideIn>

              <FadeIn delay={0.4}>
                <p className="text-lg text-gray-600  text-pretty font-light">
                  Egyptian perfumes crafted for sensual emotions and collective memories through the finest ingredients
                  and ancient traditions.
                </p>
              </FadeIn>
            </div>

            <SlideIn direction="up" delay={0.5}>
              <div className="flex justify-center lg:justify-start">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-black text-black hover:bg-black hover:text-white transition-colors duration-300 px-8 py-6 text-sm font-light tracking-wide bg-transparent"
                >
                  <Link href="/products">DISCOVER THE COLLECTION</Link>
                </Button>
              </div>
            </SlideIn>
          </div>

          <SlideIn direction="right" delay={0.4}>
            <div className="relative">
              <div className="relative mb-4 overflow-hidden bg-gray-50" style={{ aspectRatio: "1/1", minHeight: 250 }}>
                <Image
                  src="https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/1.png"
                  alt="ATHR Perfume Collection"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
