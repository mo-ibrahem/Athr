import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://rjwpvxfpyzvvvrysusu.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqd3B2eGZweXp2dnZyeXN1ZXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjM5MjQsImV4cCI6MjA3MjU5OTkyNH0.avyRv93L-9Tu4LBcQzfIZKhfW7gX8F4o9AhEVaVi6Fo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          price: number
          category: string
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
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          price: number
          category: string
          image_url: string
          gallery_images?: string[]
          sizes?: string[]
          ingredients?: string[]
          notes?: {
            top: string[]
            middle: string[]
            base: string[]
          }
          in_stock?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          price?: number
          category?: string
          image_url?: string
          gallery_images?: string[]
          sizes?: string[]
          ingredients?: string[]
          notes?: {
            top: string[]
            middle: string[]
            base: string[]
          }
          in_stock?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_email: string
          customer_name: string
          customer_phone: string
          items: {
            product_id: string
            quantity: number
            size: string
            price: number
          }[]
          total_amount: number
          status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          payment_status: "pending" | "paid" | "failed" | "refunded"
          payment_method: string
          shipping_address: {
            street: string
            city: string
            governorate: string
            postal_code: string
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          items: {
            product_id: string
            quantity: number
            size: string
            price: number
          }[]
          total_amount: number
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          payment_status?: "pending" | "paid" | "failed" | "refunded"
          payment_method: string
          shipping_address: {
            street: string
            city: string
            governorate: string
            postal_code: string
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          items?: {
            product_id: string
            quantity: number
            size: string
            price: number
          }[]
          total_amount?: number
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          payment_status?: "pending" | "paid" | "failed" | "refunded"
          payment_method?: string
          shipping_address?: {
            street: string
            city: string
            governorate: string
            postal_code: string
          }
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
