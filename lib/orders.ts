import { supabase } from "./supabase"
import type { Database } from "./supabase"

type Order = Database["public"]["Tables"]["orders"]["Row"]
type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"]

export async function createOrder(orderData: OrderInsert): Promise<Order | null> {
  const { data, error } = await supabase.from("orders").insert(orderData).select().single()

  if (error) {
    console.error("Error creating order:", error)
    return null
  }

  return data
}

export async function getOrderById(id: string): Promise<Order | null> {
  const { data, error } = await supabase.from("orders").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching order:", error)
    return null
  }

  return data
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<boolean> {
  const { error } = await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", id)

  if (error) {
    console.error("Error updating order status:", error)
    return false
  }

  return true
}

export async function updatePaymentStatus(id: string, paymentStatus: Order["payment_status"]): Promise<boolean> {
  const { error } = await supabase
    .from("orders")
    .update({ payment_status: paymentStatus, updated_at: new Date().toISOString() })
    .eq("id", id)

  if (error) {
    console.error("Error updating payment status:", error)
    return false
  }

  return true
}
