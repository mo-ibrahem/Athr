import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductReviewsProps {
  product: Product
}

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    userName: "Ahmed Hassan",
    rating: 5,
    comment:
      "Absolutely stunning fragrance! The quality is exceptional and it lasts all day. Truly captures the essence of Egyptian luxury.",
    date: "2024-01-15",
    helpful: 12,
  },
  {
    id: "2",
    userName: "Fatima Al-Zahra",
    rating: 5,
    comment: "This perfume is magical. The blend of oud and saffron is perfect. I get compliments everywhere I go!",
    date: "2024-01-10",
    helpful: 8,
  },
  {
    id: "3",
    userName: "Omar Mahmoud",
    rating: 4,
    comment: "Great fragrance with excellent longevity. The packaging is also very elegant. Highly recommended!",
    date: "2024-01-05",
    helpful: 5,
  },
]

export function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Customer Reviews</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}`}
              >
                ⭐
              </span>
            ))}
          </div>
          <span className="text-2xl font-bold">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Rating Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm">{stars}</span>
                <span className="text-amber-400">⭐</span>
              </div>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-amber-400 h-2 rounded-full"
                  style={{
                    width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%`,
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12">
                {stars === 5 ? "70%" : stars === 4 ? "20%" : stars === 3 ? "5%" : stars === 2 ? "3%" : "2%"}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.userName}</span>
                    <Badge variant="outline" className="text-xs">
                      Verified Purchase
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < review.rating ? "text-amber-400" : "text-gray-300"}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{review.comment}</p>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <span className="mr-1">👍</span>
                  Helpful ({review.helpful})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
