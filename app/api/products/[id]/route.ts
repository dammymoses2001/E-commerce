import { NextResponse } from "next/server"
import type { Product } from "@/lib/types"

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium noise-cancelling headphones with crystal-clear audio and 30-hour battery life for all-day listening. Experience superior sound quality with deep bass and crisp highs. Perfect for music lovers, commuters, and professionals who demand the best in audio technology.",
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
    features: [
      "Active Noise Cancelling",
      "30h Battery Life",
      "Bluetooth 5.0",
      "Quick Charge (15min = 3h)",
      "Foldable Design",
      "Voice Assistant Compatible",
    ],
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description:
      "Track your health metrics and fitness goals with our advanced smartwatch. Featuring heart rate monitoring, GPS, and sleep tracking, it's the perfect companion for an active lifestyle. Stay connected and motivated on your fitness journey.",
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
    features: [
      "Heart Rate Monitor",
      "Built-in GPS",
      "Water Resistant (50m)",
      "7-day Battery",
      "Sleep Tracking",
      "Multiple Sport Modes",
    ],
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description:
      "Experience ultimate comfort with our eco-friendly organic cotton t-shirt. Made from sustainably sourced materials, this soft and breathable tee is perfect for everyday wear. Feel good about looking good.",
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
    features: [
      "100% Organic Cotton",
      "Fair Trade Certified",
      "Machine Washable",
      "Pre-shrunk",
      "Tagless Design",
      "Available in Multiple Colors",
    ],
  },
  {
    id: "4",
    name: "Leather Messenger Bag",
    description:
      "Carry your essentials in style with our handcrafted leather messenger bag. Made from premium full-grain leather, this timeless bag combines durability and sophistication. Perfect for professionals and students alike.",
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
    features: [
      "Genuine Full-Grain Leather",
      'Laptop Compartment (15")',
      "Adjustable Shoulder Strap",
      "Handcrafted Quality",
      "Multiple Pockets",
      "Brass Hardware",
    ],
  },
  {
    id: "5",
    name: "Ceramic Coffee Mug Set",
    description:
      "Start your day right with our artisanal ceramic coffee mug set. Each mug is handcrafted with care, making your morning coffee ritual even more special. Enjoy the perfect blend of style and functionality.",
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
    features: [
      "Handmade Ceramic",
      "Dishwasher Safe",
      "Set of 4 Mugs",
      "Microwave Safe",
      "Lead-Free Glaze",
      "12oz Capacity",
    ],
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    description:
      "Elevate your yoga practice with our premium non-slip yoga mat. Designed for comfort and stability, this mat provides excellent cushioning and support. Made from eco-friendly materials for a sustainable workout.",
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
    features: [
      "Non-slip Surface",
      "Eco-friendly TPE Material",
      "Carrying Strap Included",
      "6mm Thickness",
      "Lightweight",
      "Easy to Clean",
    ],
  },
  {
    id: "7",
    name: "Wireless Charging Pad",
    description:
      "Simplify your charging experience with our fast wireless charging pad. Compatible with all Qi-enabled devices, this sleek pad delivers efficient power without the clutter of cables. Keep your devices charged and ready to go.",
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
    features: [
      "Fast Charging (10W)",
      "Qi Compatible",
      "LED Indicator",
      "Slim Design",
      "Non-slip Base",
      "Overcharge Protection",
    ],
  },
  {
    id: "8",
    name: "Denim Jacket",
    description:
      "Elevate your style with our classic denim jacket. Crafted from premium denim, this versatile jacket offers a timeless look and comfortable fit. A must-have addition to any wardrobe.",
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
    features: [
      "100% Cotton Denim",
      "Classic Fit",
      "Button Closure",
      "Multiple Pockets",
      "Reinforced Stitching",
      "Vintage Wash",
    ],
  },
]

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params)
    const product = products.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
