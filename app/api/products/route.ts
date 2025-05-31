import { NextResponse } from "next/server"
import type { Product } from "@/lib/types"

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium noise-cancelling headphones with crystal-clear audio and 30-hour battery life for all-day listening.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    ],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    features: ["Noise Cancelling", "30h Battery", "Bluetooth 5.0", "Quick Charge"],
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description:
      "Track your fitness goals with advanced heart rate monitoring, GPS, and comprehensive health insights.",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop",
    ],
    rating: 4.3,
    reviews: 89,
    inStock: true,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery"],
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Sustainably made from 100% organic cotton, this comfortable tee is perfect for everyday wear.",
    price: 29.99,
    originalPrice: 39.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    ],
    rating: 4.7,
    reviews: 203,
    inStock: true,
    features: ["100% Organic Cotton", "Fair Trade", "Machine Washable", "Pre-shrunk"],
  },
  {
    id: "4",
    name: "Leather Messenger Bag",
    description:
      "Handcrafted from genuine leather, this professional bag combines style with functionality for work or travel.",
    price: 149.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    ],
    rating: 4.6,
    reviews: 67,
    inStock: true,
    features: ["Genuine Leather", "Laptop Compartment", "Adjustable Strap", "Handcrafted"],
  },
  {
    id: "5",
    name: "Ceramic Coffee Mug Set",
    description:
      "Artisan-crafted ceramic mugs perfect for your morning coffee ritual. Set includes 4 unique handmade pieces.",
    price: 49.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1572916118970-fb5c8a1a912f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565792508300-adb6be5355c9?w=400&h=400&fit=crop",
    ],
    rating: 4.4,
    reviews: 156,
    inStock: true,
    features: ["Handmade Ceramic", "Dishwasher Safe", "Set of 4", "Microwave Safe"],
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    description: "Eco-friendly yoga mat with superior grip and cushioning, perfect for all types of yoga practice.",
    price: 79.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506629905607-c60f40813d8d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    ],
    rating: 4.8,
    reviews: 94,
    inStock: true,
    features: ["Non-slip Surface", "Eco-friendly", "Carrying Strap", "6mm Thickness"],
  },
  {
    id: "7",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for all Qi-enabled devices with sleek design and LED charging indicator.",
    price: 39.99,
    originalPrice: 59.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1609592806596-b7c5c1e8e3c7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
    ],
    rating: 4.2,
    reviews: 75,
    inStock: true,
    features: ["Fast Charging", "Qi Compatible", "LED Indicator", "Slim Design"],
  },
  {
    id: "8",
    name: "Denim Jacket",
    description:
      "Classic denim jacket with modern fit and premium quality construction. A timeless wardrobe essential.",
    price: 89.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    ],
    rating: 4.5,
    reviews: 112,
    inStock: true,
    features: ["100% Cotton Denim", "Classic Fit", "Button Closure", "Multiple Pockets"],
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const sortBy = searchParams.get("sortBy")

  let filteredProducts = [...products]

  // Filter by category
  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price >= Number.parseFloat(minPrice))
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= Number.parseFloat(maxPrice))
  }

  // Sort products
  if (sortBy) {
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
  }

  return NextResponse.json(filteredProducts)
}
