export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  brand: string
  image_url: string
  gallery_images: string[]
  sizes: string[]
  ingredients: string[]
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
  in_stock: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

export interface SizeOption {
  size: string
  price: number
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  nameArabic: string
  slug: string
  description: string
}

export interface CartItem {
  productId: string
  quantity: number
  selectedSize: string
}

export interface Order {
  id: string
  user_id: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  customer_email: string
  customer_name: string
  customer_phone?: string
  shipping_address: {
    street: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  payment_method?: string
  payment_status: "pending" | "paid" | "failed" | "refunded"
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  size: string
  price: number
  created_at: string
}

export interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  comment: string
  date: string
}
