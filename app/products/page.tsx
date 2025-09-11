import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductsGrid } from "@/components/products-grid"
import { FadeIn } from "@/components/fade-in"
import { PageTransition } from "@/components/page-transition"

export default function ProductsPage() {
  return (
    <PageTransition>
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <FadeIn>
          <section className="py-12 md:py-16">
            <div className="container px-4 max-content-width">
              <div className="text-center space-y-6">
                <h1 className="text-3xl md:text-4xl font-light tracking-wide text-black uppercase">Shop</h1>
                <p className="text-sm text-gray-600 max-w-xl mx-auto font-light leading-relaxed">
                  Discover our collection , crafted with the finest ingredients.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="pb-16">
            <div className="container px-4">
              <ProductsGrid />
            </div>
          </section>
        </FadeIn>
      </main>
      <Footer />
    </div>
    </PageTransition>
  )
}
