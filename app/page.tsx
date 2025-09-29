import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"; // Adjust path if needed
import { Footer } from "@/components/footer"
import { FadeIn } from "@/components/fade-in"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <FadeIn>
        <Navigation />
      </FadeIn>
      <main>
        <FadeIn delay={0.1}>
          <HeroSection />
        </FadeIn>
        <FadeIn delay={0.2}>
          <FeaturedProducts />
        </FadeIn>
      </main>
      <FadeIn delay={0.3}>
        <Footer />
      </FadeIn>
    </div>
  )
}
