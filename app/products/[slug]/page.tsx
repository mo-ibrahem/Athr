import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product-gallery"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { FadeIn } from "@/components/fade-in"
import { SlideIn } from "@/components/slide-in"
import { getProductBySlug, getProductsByCategory } from "@/lib/data"
import { PageTransition } from "@/components/page-transition"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const allCategoryProducts = await getProductsByCategory(product.category)
  const relatedProducts = allCategoryProducts.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <PageTransition>
    <div className="min-h-screen bg-white">
      <FadeIn>
        <Navigation />
      </FadeIn>
      <main>
        {/* Product Section */}
        <section className="py-16">
          <div className="container px-4 max-content-width">
            <div className="grid lg:grid-cols-2 gap-16">
              <SlideIn direction="left" delay={0.1}>
                <ProductGallery product={product} />
              </SlideIn>
              <SlideIn direction="right" delay={0.2}>
                <ProductDetails product={product} />
              </SlideIn>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <FadeIn delay={0.4}>
            <section className="py-16 border-t border-gray-100">
              <div className="container px-4 max-content-width">
                <RelatedProducts products={relatedProducts} />
              </div>
            </section>
          </FadeIn>
        )}
      </main>
      <FadeIn delay={0.5}>
        <Footer />
      </FadeIn>
    </div>
    </PageTransition>
  )
}
