import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductsGrid } from "@/components/products-grid"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <section className="py-12 md:py-16">
          <div className="container px-4">
            <div className="text-center space-y-6">
              <h1 className="text-3xl md:text-4xl font-light tracking-wide text-black uppercase">Perfumes</h1>
              <p className="text-sm text-gray-600 max-w-xl mx-auto font-light leading-relaxed">
                Discover our collection of authentic Egyptian fragrances, crafted with the finest ingredients and
                inspired by ancient traditions.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container px-4">
            <ProductsGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
