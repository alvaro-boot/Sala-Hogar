"use client"

import { useState } from "react"
import { X, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCartStore } from "../../store/cart-store"
import { useHydration } from "../../hooks/useHydration"
import { formatPrice } from "../../lib/currency"
import { CustomerInfoForm } from "../checkout/CustomerInfoForm"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore()
  const isHydrated = useHydration()
  const [showCustomerForm, setShowCustomerForm] = useState(false)

  const total = isHydrated ? getTotal() : 0
  const itemCount = isHydrated ? getItemCount() : 0

  const handleWhatsAppCheckout = () => {
    setShowCustomerForm(true)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">
              Carrito ({itemCount} {itemCount === 1 ? "producto" : "productos"})
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500 mb-6">Agrega algunos productos para comenzar</p>
                <Button asChild onClick={onClose}>
                  <Link href="/catalogo">Explorar Productos</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}`} className="flex gap-4 p-4 border rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                      <p className="text-lg font-semibold text-blue-600">{formatPrice(item.price)}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-red-600 hover:text-red-700"
                          onClick={() => removeItem(item.id, item.selectedColor)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button 
                onClick={handleWhatsAppCheckout}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Proceder al Checkout
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Customer Info Form Modal */}
      <CustomerInfoForm
        isOpen={showCustomerForm}
        onClose={() => setShowCustomerForm(false)}
        items={items}
        total={total}
      />
    </>
  )
}
