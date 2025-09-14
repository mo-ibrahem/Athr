import type { Product, Category } from "./types"
import { createClient } from "@/lib/supabase/server"

export const categories: Category[] = [
  {
    id: "1",
    name: "Luxury",
    nameArabic: "الفاخرة",
    slug: "luxury",
    description: "Premium luxury fragrances inspired by ancient Egyptian traditions",
  },
  {
    id: "2",
    name: "Fresh",
    nameArabic: "المنعشة",
    slug: "fresh",
    description: "Fresh and aquatic scents capturing the essence of the Nile",
  },
  {
    id: "3",
    name: "Floral",
    nameArabic: "الزهرية",
    slug: "floral",
    description: "Delicate floral scents capturing the beauty of Egyptian gardens",
  },
  {
    id: "4",
    name: "Oriental",
    nameArabic: "الشرقية",
    slug: "oriental",
    description: "Exotic oriental fragrances with spices and precious woods",
  },
]

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Blue Vibe",
    slug: "blue-vibe-aquatic",
    description: "A bold and sophisticated fragrance crafted for the modern man. It opens with a fresh burst of citrus and aromatic spices, instantly energizing the senses. The heart reveals elegant woods and subtle florals, adding depth and character, while warm amber and sensual musk create a powerful, long-lasting trail.",
    insp:"the perfect blend of Bleu de Chanel and Dior Sauvage elixir",
    price: 599,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/blue%20vibe.jpg",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Blue%20vibe%20pyr.jpg",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Blue%20Vibe%20second%20photo.png",
      
    ],
    category: "fresh",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    sizes: [
      { size: "50ml", price: 599, multiplier: 1.5 },
    ],
    notes: {
      top: ["Bergamot", "Sea Salt", "Lemon"],
      middle: ["Jasmine", "Rose", "Lily"],
      base: ["Musk", "Amber", "Sandalwood"],
    },
    ingredients: ["Grape fruit", "Spices", "Woody notes"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Boje",
    slug: "boje-amber-essence",
    description: `A deliciously addictive fragrance that wraps you in warmth and sweetness. It opens with the soft, airy glow of toasted marshmallow, blending into creamy vanilla and a touch of sugar for irresistible indulgence. Hints of musk and woods balance the sweetness, leaving a sensual, cozy trail that lingers beautifully.

`,
    insp:"Inspired by Kayali Boujee Marshmallow",

    price: 699,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/BOJE.jpg",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Boje%20pyr.jpg",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Boje%20second%20photo.png",
      
    ],
    category: "oriental",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    sizes: [
      { size: "50ml", price: 699, multiplier: 1.4 },
    ],
    notes: {
      top: ["Saffron", "Cardamom", "Orange"],
      middle: ["Rose", "Oud", "Jasmine"],
      base: ["Amber", "Musk", "Sandalwood"],
    },
    ingredients: ["Marshmallow", "Strawberry", "Whipped cream"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Milka",
    slug: "milka-floral-dream",
    description: `A decadent symphony of sweetness and elegance. It opens with the rich warmth of vanilla, wrapped in a delicate veil of caramel and amber. As it settles, creamy milk notes melt into the heart, softening the richness and adding a comforting, irresistible smoothness. The base lingers with tonka and musk, leaving behind a sensual trail that’s both cozy and captivating

`,

    insp:"The perfect blend of Kayali Vanilla 28 and Bianco Latte",

    price: 599,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka.jpg",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milkla%20pyr.jpg",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Milka%20second%20photo.png",
      
    ],
    category: "floral",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    sizes: [
      { size: "50ml", price: 599, multiplier: 1.4 },
    ],
    notes: {
      top: ["Peony", "Lychee", "Freesia"],
      middle: ["Rose", "Magnolia", "Lily"],
      base: ["Musk", "Cedar", "Amber"],
    },
    ingredients: ["Vanilla", "Caramel", "Amber"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Pink Vibe",
    slug: "pink-vibe",
    description: `A playful yet sophisticated fragrance that radiates confidence. Bursting with juicy berries and exotic fruits, it opens with an irresistible sweetness that instantly uplifts the mood. The heart blooms with delicate florals, adding a touch of elegance and charm, while soft woods and sensual musk create a lasting trail.
`,
    insp:"The perfect blend of Bombshell and Burberry her",

    price: 599,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe.jpg",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe%20pyr.jpg",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Pink%20Vibe%20second%20photo.png ",
      
    ],
    category: "floral",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    sizes: [
      { size: "50ml", price: 599, multiplier: 1.5 },
    ],
    notes: {
      top: ["Rose", "Peony", "Freesia"],
      middle: ["Jasmine", "Lily", "Magnolia"],
      base: ["Musk", "Vanilla", "Sandalwood"],
    },
    ingredients: ["Strawberry", "Peony", "Musk"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Tropix",
    slug: "tropix",
    description: `An irresistibly sensual fragrance that captures the essence of tropical allure. Opening with fresh burst of pineapple and a hint of sweetness, it quickly unfolds into a creamy blend of coconut and tonka bean, creating a warm, addictive heart. Deep woods and amber leave behind a seductive trail that lingers on the skin.`,
    insp:"Inspired by Le Beau Le Parfum by Jean Paul Gaultier",

    price: 599,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropex.jpg",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pyramid%20tropix.jpg",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropix%20second%20photo.png",
    ],
    category: "fruity",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    sizes: [
      { size: "50ml", price: 599, multiplier: 1.5 },
    ],
    notes: {
      top: ["Coconut", "Pineapple", "Mango"],
      middle: ["Passion Fruit", "Guava", "Papaya"],
      base: ["Vanilla", "Sandalwood", "Amber"],
    },
    ingredients: ["Coconut", "Pineapple", "Tonka beans"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

export const products: Product[] = []
export const featuredProducts: Product[] = []

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return fallbackProducts
    }

    return data || fallbackProducts
  } catch (error) {
    console.error("Supabase connection failed:", error)
    return fallbackProducts
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching featured products:", error)
      return fallbackProducts.filter((p) => p.featured)
    }

    return data || fallbackProducts.filter((p) => p.featured)
  } catch (error) {
    console.error("Supabase connection failed:", error)
    return fallbackProducts.filter((p) => p.featured)
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle()

    if (error) {
      console.error("Error fetching product:", error)
      return fallbackProducts.find((p) => p.slug === slug) || null
    }

    return data || fallbackProducts.find((p) => p.slug === slug) || null
  } catch (error) {
    console.error("Supabase connection failed, using fallback data:", error)
    return fallbackProducts.find((p) => p.slug === slug) || null
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", categorySlug)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products by category:", error)
      return fallbackProducts.filter((p) => p.category === categorySlug)
    }

    return data || fallbackProducts.filter((p) => p.category === categorySlug)
  } catch (error) {
    console.error("Supabase connection failed:", error)
    return fallbackProducts.filter((p) => p.category === categorySlug)
  }
}

export const getAllProducts = getProducts

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((category) => category.slug === slug)
}
