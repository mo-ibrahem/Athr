// In: lib/client-data.ts

import { createClient } from "@/lib/supabase/client";
import type { Product, SortOption } from "@/lib/types"; 

/**
 * Fetches featured products using the client-side Supabase client.
 * This function is safe to use in "use client" components.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products_detailed")
    .select("*")
    .eq("featured", true)
    .limit(3);

  if (error) {
    console.error("Client-side Error: Failed to fetch featured products.", error);
    return []; // Return an empty array on error
  }

  return data || [];
}

export async function getAndSortProducts(sortBy: SortOption): Promise<Product[]> {
  const supabase = createClient();
  
  let query = supabase
    .from("products_detailed")
    .select("*");

  // Apply sorting based on the sortBy parameter
  switch (sortBy) {
    case "price-low":
      query = query.order("price", { ascending: true });
      break;
    case "price-high":
      query = query.order("price", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    default: // "name"
      query = query.order("name", { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    console.error("Client-side Error: Failed to fetch products.", error);
    return [];
  }

  return data || [];
}
