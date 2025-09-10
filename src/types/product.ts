export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  colors: string[]
  materials: string[]
  dimensions: {
    width: number
    height: number
    depth: number
  }
  weight?: number
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  features: string[]
  specifications?: Array<{ name: string; value: string }>
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductFilters {
  search?: string
  category?: string
  subcategory?: string
  priceRange?: [number, number]
  colors?: string[]
  materials?: string[]
  inStock?: boolean
  rating?: number
  sortBy?: "name" | "price" | "rating" | "newest"
  sortOrder?: "asc" | "desc"
}
