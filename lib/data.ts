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
    description: "A fresh aquatic fragrance capturing the essence of the Mediterranean breeze",
    price: 299,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/blue%20vibe%20first%20photo.png",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Blue%20Vibe%20second%20photo.png",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/blue%20vibe.jpg",
    ],
    category: "fresh",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    sizes: [
      { size: "30ml", price: 299, multiplier: 1 },
      { size: "50ml", price: 449, multiplier: 1.5 },
      { size: "100ml", price: 699, multiplier: 2.3 },
    ],
    notes: {
      top: ["Bergamot", "Sea Salt", "Lemon"],
      middle: ["Jasmine", "Rose", "Lily"],
      base: ["Musk", "Amber", "Sandalwood"],
    },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Boje Amber Essence",
    slug: "boje-amber-essence",
    description: "A warm and sophisticated amber fragrance with oriental spices",
    price: 349,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/boje%20first%20photo.png",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Boje%20second%20photo.png",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/BOJE.jpg",
    ],
    category: "oriental",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    sizes: [
      { size: "30ml", price: 349, multiplier: 1 },
      { size: "50ml", price: 499, multiplier: 1.4 },
      { size: "100ml", price: 749, multiplier: 2.1 },
    ],
    notes: {
      top: ["Saffron", "Cardamom", "Orange"],
      middle: ["Rose", "Oud", "Jasmine"],
      base: ["Amber", "Musk", "Sandalwood"],
    },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Milka Floral Dream",
    slug: "milka-floral-dream",
    description: "A delicate floral bouquet inspired by Egyptian gardens",
    price: 279,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka%20first%20photo.png",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Milka%20second%20photo.png",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka.jpg",
    ],
    category: "floral",
    brand: "ATHR",
    in_stock: true,
    featured: true,
    sizes: [
      { size: "30ml", price: 279, multiplier: 1 },
      { size: "50ml", price: 399, multiplier: 1.4 },
      { size: "100ml", price: 599, multiplier: 2.1 },
    ],
    notes: {
      top: ["Peony", "Lychee", "Freesia"],
      middle: ["Rose", "Magnolia", "Lily"],
      base: ["Musk", "Cedar", "Amber"],
    },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Pink Vibe",
    slug: "pink-vibe",
    description: "A romantic floral fragrance with rose and peony",
    price: 319,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe%20first%20photo.png",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe%20second%20photo.png",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe.jpg",
    ],
    category: "floral",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    sizes: [
      { size: "30ml", price: 319, multiplier: 1 },
      { size: "50ml", price: 469, multiplier: 1.5 },
      { size: "100ml", price: 719, multiplier: 2.3 },
    ],
    notes: {
      top: ["Rose", "Peony", "Freesia"],
      middle: ["Jasmine", "Lily", "Magnolia"],
      base: ["Musk", "Vanilla", "Sandalwood"],
    },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Tropix",
    slug: "tropix",
    description: "A tropical escape with coconut and exotic fruits",
    price: 289,
    image_url:
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropix%20first%20photo.png",
    gallery_images: [
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropix%20second%20photo.png",
      "https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropix.jpg",
    ],
    category: "fruity",
    brand: "ATHR",
    in_stock: true,
    featured: false,
    sizes: [
      { size: "30ml", price: 289, multiplier: 1 },
      { size: "50ml", price: 429, multiplier: 1.5 },
      { size: "100ml", price: 649, multiplier: 2.3 },
    ],
    notes: {
      top: ["Coconut", "Pineapple", "Mango"],
      middle: ["Passion Fruit", "Guava", "Papaya"],
      base: ["Vanilla", "Sandalwood", "Amber"],
    },
    ingredients: ["Alcohol", "Parfum", "Aqua"],
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
