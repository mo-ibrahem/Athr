import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">You Might Also Like</h2>
        <p className="text-muted-foreground">Discover more fragrances from our collection</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <CardContent className="p-4 space-y-3">
              <div className="space-y-1">
                <h3 className="font-semibold group-hover:text-amber-600 transition-colors">
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{formatPrice(product.price)}</span>
                  </div>
                </div>

                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  <span>🛒</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
