"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "../../../store/cart-store"
import { useHydration } from "../../../hooks/useHydration"

interface CartIconProps {
  onClick: () => void
}

export function CartIcon({ onClick }: CartIconProps) {
  const { getItemCount } = useCartStore()
  const isHydrated = useHydration()
  const itemCount = isHydrated ? getItemCount() : 0

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={onClick}>
      <ShoppingCart className="w-5 h-5" />
      {isHydrated && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Button>
  )
}
