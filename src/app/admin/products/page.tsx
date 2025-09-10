"use client"

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { ProductManager } from '@/components/admin/ProductManager'
import { AdminLayout } from '@/components/admin/AdminLayout'

export default function AdminProductsPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="text-gray-600">Administra el catálogo de productos de la tienda</p>
        </div>
        <ProductManager />
      </AdminLayout>
    </ProtectedRoute>
  )
}