"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Users, DollarSign, TrendingUp } from 'lucide-react'

export function StatsOverview() {
  // Datos simulados - en producción vendrían de una API
  const stats = [
    {
      title: 'Total Productos',
      value: '156',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Package,
      description: 'Productos activos en el catálogo'
    },
    {
      title: 'Usuarios Registrados',
      value: '2,847',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Usuarios activos este mes'
    },
    {
      title: 'Ventas del Mes',
      value: '$45,230',
      change: '+23%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'Ingresos generados'
    },
    {
      title: 'Tasa de Conversión',
      value: '3.2%',
      change: '-0.5%',
      changeType: 'negative' as const,
      icon: TrendingUp,
      description: 'Visitantes que compran'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Resumen General</h2>
        <p className="text-gray-600">Vista general del rendimiento de la tienda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span
                  className={`font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-500">vs mes anterior</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Nuevo producto agregado', item: 'Sofá Modular Comfort', time: 'Hace 2 horas' },
                { action: 'Producto actualizado', item: 'Mesa de Comedor Oak', time: 'Hace 4 horas' },
                { action: 'Usuario registrado', item: 'maria.garcia@email.com', time: 'Hace 6 horas' },
                { action: 'Pedido completado', item: '#ORD-2024-001', time: 'Hace 8 horas' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.item}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
            <CardDescription>Top 5 productos del mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Sofá Modular Comfort Plus', sales: 23, revenue: '$29,999' },
                { name: 'Mesa de Comedor Extensible Oak', sales: 18, revenue: '$16,199' },
                { name: 'Cama King Size Luxury Dream', sales: 15, revenue: '$23,999' },
                { name: 'Escritorio Ejecutivo Premium', sales: 12, revenue: '$8,999' },
                { name: 'Estantería Modular Nordic', sales: 10, revenue: '$3,999' }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} ventas</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{product.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
