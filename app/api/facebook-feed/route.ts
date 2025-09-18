// File: app/api/facebook-feed/route.ts

import { NextResponse } from "next/server";
import { fallbackProducts } from "@/lib/data"; // Using your provided data file
import Papa from "papaparse";

export async function GET() {
  try {
    const products = fallbackProducts; // Use the local array as the source of truth

    if (!products || products.length === 0) {
      return new NextResponse("No products found", { status: 404 });
    }
    
    // Map your product data to match Facebook's required columns
    const formattedProducts = products
      .filter(product => product.in_stock) // Only include in-stock items
      .map((product) => ({
        id: product.id,
        title: product.name,
        description: product.description,
        availability: "in stock",
        condition: "new",
        price: `${product.price.toFixed(2)} EGP`,
        link: `https://www.athreg.com/products/${product.slug}`,
        image_link: product.image_url,
        brand: product.brand,
      }));

    // Convert the JSON data to a CSV string
    const csv = Papa.unparse(formattedProducts);

    // Return the CSV data
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="athr_product_feed.csv"`,
      },
    });

  } catch (error) {
    console.error("Failed to generate product feed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}