"use client"

import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/currency'
import type { CartItem } from '@/types/cart'

interface WhatsAppPreviewProps {
  items: CartItem[]
  total: number
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: string
    notes?: string
  }
}

export function WhatsAppPreview({ items, total, customerInfo }: WhatsAppPreviewProps) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const firstProduct = items[0]

  return (
    <div className="max-w-sm mx-auto">
      {/* Simulación de la interfaz de WhatsApp */}
      <div className="bg-green-50 p-4 rounded-t-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">SH</span>
          </div>
          <span className="font-medium">Sala Hogar</span>
          <span className="text-xs">• en línea</span>
        </div>
      </div>

      {/* Burbuja del mensaje estructurado */}
      <div className="bg-white p-0 rounded-b-lg shadow-lg">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            {/* Header con imagen del producto */}
            <div className="flex items-start gap-3 p-4 border-b">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs">📦</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">🛒</span>
                  <span className="font-semibold text-sm">{itemCount} artículos</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(total)}
                </div>
                <div className="text-xs text-gray-500">(total estimado)</div>
              </div>
            </div>

            {/* Separador */}
            <div className="border-t border-gray-100"></div>

            {/* Botón de acción */}
            <div className="p-4">
              <button className="w-full text-center text-green-600 font-medium text-sm py-2 hover:bg-green-50 rounded">
                Ver detalles
              </button>
            </div>

            {/* Información del cliente (oculta por defecto, se muestra al hacer clic en "Ver detalles") */}
            <div className="px-4 pb-4 text-xs text-gray-500">
              <div className="space-y-1">
                <div>👤 {customerInfo.name}</div>
                <div>📧 {customerInfo.email}</div>
                <div>📱 {customerInfo.phone}</div>
                {customerInfo.address && <div>🏠 {customerInfo.address}</div>}
                {customerInfo.notes && <div>📝 {customerInfo.notes}</div>}
              </div>
            </div>

            {/* Lista de productos (oculta por defecto) */}
            <div className="px-4 pb-4 text-xs">
              <div className="font-medium mb-2">🛒 Productos:</div>
              <div className="space-y-1">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name} ({item.selectedColor})</span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metadatos del mensaje */}
        <div className="flex justify-end items-center gap-1 px-4 pb-2">
          <span className="text-xs text-gray-400">10:55 a.m.</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
        </div>
      </div>

      {/* Nota explicativa */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Así se verá tu mensaje:</strong> Una tarjeta interactiva con resumen del pedido, 
          información del cliente y botón para ver detalles completos.
        </p>
      </div>
    </div>
  )
}
