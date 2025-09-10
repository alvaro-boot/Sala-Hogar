"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "../../../store/cart-store"
import { toast } from "sonner"
import { formatPrice } from "../../../lib/currency"
import type { Product } from "../../../types/product"

interface ProductCardProps {
  product: Product
  onProductClick?: (product: Product) => void
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCartStore()
  const router = useRouter()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, selectedColor)
    toast.success(`${product.name} agregado al carrito`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? "Eliminado de favoritos" : "Agregado a favoritos")
  }

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product)
    } else {
      router.push(`/productos/${product.id}`)
    }
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleCardClick}>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">Nuevo</Badge>}
          {product.discount && product.discount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white">-{product.discount}%</Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="w-8 h-8 bg-white/90 hover:bg-white"
            onClick={handleWishlist}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Agregar al Carrito
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <Badge variant="outline" className="text-xs">
          {product.category}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Color:</span>
          <div className="flex gap-1">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? "border-blue-600" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {product.inStock ? (
            <Badge variant="outline" className="text-green-600 border-green-600">
              En Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="text-red-600 border-red-600">
              Agotado
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
