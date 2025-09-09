"use client"

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { ProductManager } from '@/components/admin/ProductManager'

export default function AdminProductsPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
            <p className="text-gray-600">Administra el catálogo de productos de la tienda</p>
          </div>
          <ProductManager />
        </div>
      </div>
    </ProtectedRoute>
  )
}
