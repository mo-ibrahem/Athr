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
import type { Product } from "@/lib/types"

// --- 1. Updated Metadata Function for Live Data & Sale Price ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Fetch the live product data instead of using fallback data
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return { title: "Product not found" };
  }

  // Calculate the sale price for metadata
  const salePrice = product.price > 100 ? product.price - 100 : product.price;

  const openGraphData = {
    title: product.name,
    description: product.description,
    url: `https://www.athreg.com/products/${product.slug}`,
    images: [{ url: product.image_url }],
    type: 'website',
    'product:brand': product.brand,
    'product:availability': product.in_stock ? 'in stock' : 'out of stock',
    'product:condition': 'new',
    'product:price:amount': salePrice.toString(), // Use the calculated sale price
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

  // --- 2. Function to Apply the Discount ---
  const applyDiscount = (p: Product): Product => {
    // Only apply discount if the price is greater than 100
    if (p.price > 100) {
      return {
        ...p,
        original_price: p.price, // Store the database price as the original price
        price: p.price - 100,    // Set the new, discounted price
      };
    }
    return p; // Return the product unchanged if no discount is applied
  };

  // --- 3. Apply Discount to Main and Related Products ---
  const productWithDiscount = applyDiscount(product);
  
  const allCategoryProducts = await getProductsByCategory(product.category)
  const relatedProducts = allCategoryProducts.filter((p) => p.id !== product.id).slice(0, 4)
  const relatedProductsWithDiscount = relatedProducts.map(applyDiscount);

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
                {/* 4. Pass the new discounted product objects to the components */}
                <ProductGallery product={productWithDiscount} />
              </SlideIn>
              <SlideIn direction="right" delay={0.2}>
                <ProductDetails product={productWithDiscount} />
              </SlideIn>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <FadeIn delay={0.4}>
            <section className="py-16 border-t border-gray-100">
              <div className="container px-4 max-content-width">
                <RelatedProducts products={relatedProductsWithDiscount} />
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