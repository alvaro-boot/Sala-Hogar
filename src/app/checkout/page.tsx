"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, MessageCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "../../store/cart-store"
import { useHydration } from "../../hooks/useHydration"
import { formatPrice } from "../../lib/currency"
import { CustomerInfoForm } from "../../components/checkout/CustomerInfoForm"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore()
  const isHydrated = useHydration()
  const [showCustomerForm, setShowCustomerForm] = useState(false)

  const total = isHydrated ? getTotal() : 0

  const handleWhatsAppCheckout = () => {
    setShowCustomerForm(true)
  }

  if (items.length === 0) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">Agrega algunos productos para continuar con el checkout</p>
          <Button asChild>
            <Link href="/catalogo">Explorar Productos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/catalogo">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Catálogo
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  Finalizar Compra por WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    ¡Compra fácil y segura por WhatsApp!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Completa tus datos y te enviaremos toda la información de tu pedido directamente a WhatsApp para que puedas confirmar y coordinar la entrega.
                  </p>
                  
                  <Button 
                    onClick={handleWhatsAppCheckout}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Proceder con WhatsApp
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">¿Cómo funciona?</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Completa tus datos de contacto</li>
                    <li>• Te enviamos el resumen por WhatsApp</li>
                    <li>• Coordinamos la entrega y pago</li>
                    <li>• ¡Recibes tus productos!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}`} className="flex gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                        <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">Compra segura por WhatsApp</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Customer Info Form Modal */}
      <CustomerInfoForm
        isOpen={showCustomerForm}
        onClose={() => setShowCustomerForm(false)}
        items={items}
        total={total}
      />
    </div>
  )
}
