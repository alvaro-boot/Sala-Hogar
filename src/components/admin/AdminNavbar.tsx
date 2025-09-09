"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, LogOut, Home, Settings, Package, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "../ui/Logo"
import { useAuth } from "@/contexts/AuthContext"
import { SyncStatus } from "./SyncStatus"

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Productos", href: "/admin/products", icon: Package },
  { name: "Usuarios", href: "/admin/users", icon: Users },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
]

export function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-3">
              <Logo size="md" showText={false} href="" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-500">Sala Hogar</p>
              </div>
            </Link>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {adminNavigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Usuario y acciones */}
          <div className="flex items-center space-x-4">
            {/* Estado de sincronización */}
            <SyncStatus />
            
            {/* Volver al sitio */}
            <Link href="/">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Home className="w-4 h-4 mr-2" />
                Ver Sitio
              </Button>
            </Link>

            {/* Información del usuario */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <span>Bienvenido, {user?.name}</span>
            </div>

            {/* Botón de logout */}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>

            {/* Botón de menú móvil */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {adminNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="border-t pt-2 mt-2">
                <Link href="/">
                  <div className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                    <Home className="w-4 h-4" />
                    <span>Ver Sitio</span>
                  </div>
                </Link>
                <div className="flex items-center space-x-2 px-3 py-2 text-gray-600">
                  <span>Usuario: {user?.name}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
