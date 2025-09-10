"use client"

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { AdminLayout } from '@/components/admin/AdminLayout'

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </ProtectedRoute>
  )
}
