"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Eye,
  Heart,
  Star,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from "lucide-react"
import { StatsOverview } from "./StatsOverview"
import { useAuth } from "@/contexts/AuthContext"
import { useProductStore } from "@/store/product-store"
import { useCartStore } from "@/store/cart-store"
import Link from "next/link"
import { formatPrice } from "@/lib/currency"

interface DashboardStats {
  totalProducts: number
  totalUsers: number
  totalSales: number
  totalRevenue: number
  lowStockProducts: number
  recentOrders: number
  conversionRate: number
  averageOrderValue: number
}

export function AdminDashboard() {
  const { user } = useAuth()
  const { products } = useProductStore()
  const { items } = useCartStore()
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalUsers: 0,
    totalSales: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    recentOrders: 0,
    conversionRate: 0,
    averageOrderValue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de estadísticas
    const loadStats = async () => {
      setLoading(true)
      
      // Calcular estadísticas basadas en datos reales
      const totalProducts = products.length
      const lowStockProducts = products.filter(p => p.stockQuantity < 10).length
      const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0)
      const totalSales = Math.floor(totalRevenue * 0.3) // Simular 30% de ventas
      const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0
      const conversionRate = Math.random() * 5 + 2 // 2-7% simulado
      
      setStats({
        totalProducts,
        totalUsers: 1247, // Simulado
        totalSales,
        totalRevenue,
        lowStockProducts,
        recentOrders: Math.floor(Math.random() * 20) + 5, // 5-25 órdenes
        conversionRate: Number(conversionRate.toFixed(1)),
        averageOrderValue: Number(averageOrderValue.toFixed(0))
      })
      
      setLoading(false)
    }

    loadStats()
  }, [products])

  const quickActions = [
    {
      title: "Productos",
      description: "Gestionar catálogo",
      icon: Package,
      href: "/admin/products",
      color: "blue",
      count: stats.totalProducts
    },
    {
      title: "Usuarios",
      description: "Gestionar usuarios",
      icon: Users,
      href: "/admin/users",
      color: "green",
      count: stats.totalUsers
    },
    {
      title: "Pedidos",
      description: "Ver pedidos recientes",
      icon: ShoppingCart,
      href: "/admin/orders",
      color: "purple",
      count: stats.recentOrders
    },
    {
      title: "Configuración",
      description: "Ajustes del sistema",
      icon: Settings,
      href: "/admin/settings",
      color: "orange"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: "product",
      title: "Nuevo producto agregado",
      description: "Sofá Modular Comfort Plus",
      time: "Hace 2 horas",
      icon: Package,
      color: "blue"
    },
    {
      id: 2,
      type: "sale",
      title: "Nueva venta realizada",
      description: "Pedido #1234 - $2,500,000",
      time: "Hace 4 horas",
      icon: ShoppingCart,
      color: "green"
    },
    {
      id: 3,
      type: "user",
      title: "Usuario registrado",
      description: "maria.garcia@email.com",
      time: "Hace 6 horas",
      icon: Users,
      color: "purple"
    },
    {
      id: 4,
      type: "stock",
      title: "Stock bajo detectado",
      description: "Mesa de Centro Moderna - 3 unidades",
      time: "Hace 8 horas",
      icon: TrendingDown,
      color: "red"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      red: "bg-red-100 text-red-600"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Cargando dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Bienvenido de vuelta, {user?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                Sistema Activo
              </Badge>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ventas Hoy</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recentOrders}</p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 ml-1">+12%</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ingresos</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 ml-1">+8%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tasa de Conversión</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
                  <div className="flex items-center mt-1">
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600 ml-1">-2%</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.lowStockProducts}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-orange-600">Requiere atención</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon
              return (
                <Link key={action.title} href={action.href}>
                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-2 hover:border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getColorClasses(action.color)}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                          {action.count !== undefined && (
                            <p className="text-xs text-gray-500 mt-1">{action.count} elementos</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>
                Últimas acciones en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Productos Destacados
              </CardTitle>
              <CardDescription>
                Productos con mejor rendimiento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-600">{formatPrice(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}