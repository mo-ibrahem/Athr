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

import type { Metadata } from 'next';
import { fallbackProducts } from "@/lib/data";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = fallbackProducts.find(p => p.slug === params.slug);

  if (!product) {
    return { title: "Product not found" };
  }

  // Create the openGraph object in a separate variable
  // This satisfies TypeScript while allowing custom properties
  const openGraphData = {
    title: product.name,
    description: product.description,
    url: `https://www.athreg.com/products/${product.slug}`,
    images: [{ url: product.image_url }],
    type: 'website',
    'product:brand': product.brand,
    'product:availability': product.in_stock ? 'in stock' : 'out of stock',
    'product:condition': 'new',
    'product:price:amount': product.price.toString(),
    'product:price:currency': 'EGP',
  };

  return {
    title: product.name,
    description: product.description,
    openGraph: openGraphData,
  };
}

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
