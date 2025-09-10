"use client"

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  AlertCircle,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import { formatPrice } from '@/lib/currency'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'

// Datos de ejemplo para pedidos
const mockOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '3001234567'
    },
    items: [
      { name: 'Sofá Modular Comfort Plus', quantity: 1, price: 5199996 },
      { name: 'Mesa de Centro Moderna', quantity: 1, price: 899996 }
    ],
    total: 6099992,
    status: 'pending',
    paymentMethod: 'WhatsApp',
    shippingAddress: 'Calle 123 #45-67, Pereira, Risaralda',
    createdAt: '2024-01-15T10:30:00Z',
    notes: 'Cliente solicita entrega en la mañana'
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '3007654321'
    },
    items: [
      { name: 'Cama King Size Premium', quantity: 1, price: 3599996 },
      { name: 'Nochero Moderno', quantity: 2, price: 599996 }
    ],
    total: 4799992,
    status: 'processing',
    paymentMethod: 'WhatsApp',
    shippingAddress: 'Carrera 45 #78-90, Pereira, Risaralda',
    createdAt: '2024-01-14T15:45:00Z',
    notes: 'Pago confirmado, listo para envío'
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Ana Rodríguez',
      email: 'ana.rodriguez@email.com',
      phone: '3009876543'
    },
    items: [
      { name: 'Mesa de Comedor 6 Puestos', quantity: 1, price: 2199996 },
      { name: 'Sillas de Comedor', quantity: 6, price: 1799996 }
    ],
    total: 3999992,
    status: 'shipped',
    paymentMethod: 'WhatsApp',
    shippingAddress: 'Avenida 30 de Agosto #12-34, Pereira, Risaralda',
    createdAt: '2024-01-13T09:15:00Z',
    notes: 'Enviado el 14/01/2024'
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Luis Martínez',
      email: 'luis.martinez@email.com',
      phone: '3004567890'
    },
    items: [
      { name: 'Escritorio Ejecutivo', quantity: 1, price: 1299996 },
      { name: 'Silla de Oficina', quantity: 1, price: 799996 }
    ],
    total: 2099992,
    status: 'delivered',
    paymentMethod: 'WhatsApp',
    shippingAddress: 'Calle 25 #56-78, Pereira, Risaralda',
    createdAt: '2024-01-12T14:20:00Z',
    notes: 'Entregado el 13/01/2024'
  }
]

const statusConfig = {
  pending: { label: 'Pendiente', color: 'secondary', icon: Clock },
  processing: { label: 'Procesando', color: 'default', icon: Package },
  shipped: { label: 'Enviado', color: 'default', icon: Truck },
  delivered: { label: 'Entregado', color: 'default', icon: CheckCircle },
  cancelled: { label: 'Cancelado', color: 'destructive', icon: AlertCircle }
}

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    return (
      <Badge variant={config.color as any} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getTotalOrders = () => mockOrders.length
  const getTotalRevenue = () => mockOrders.reduce((sum, order) => sum + order.total, 0)
  const getPendingOrders = () => mockOrders.filter(order => order.status === 'pending').length
  const getDeliveredOrders = () => mockOrders.filter(order => order.status === 'delivered').length

  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
              <p className="text-gray-600">Administra todos los pedidos y ventas</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                    <p className="text-2xl font-bold text-gray-900">{getTotalOrders()}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                    <p className="text-2xl font-bold text-green-600">{formatPrice(getTotalRevenue())}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendientes</p>
                    <p className="text-2xl font-bold text-orange-600">{getPendingOrders()}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Entregados</p>
                    <p className="text-2xl font-bold text-purple-600">{getDeliveredOrders()}</p>
                  </div>
                  <Truck className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar pedidos..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">Todos los estados</option>
                  <option value="pending">Pendiente</option>
                  <option value="processing">Procesando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregado</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Pedidos ({filteredOrders.length})</CardTitle>
              <CardDescription>
                Lista de todos los pedidos recibidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{order.customer.name}</p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{item.quantity}x</span> {item.name}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(order.total)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString('es-CO')}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="w-4 h-4 mr-2" />
                              Llamar Cliente
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Enviar Email
                            </DropdownMenuSeparator>
                            <DropdownMenuItem>
                              <Package className="w-4 h-4 mr-2" />
                              Marcar como Enviado
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Marcar como Entregado
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Order Details Dialog */}
          <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Detalles del Pedido {selectedOrder?.id}</DialogTitle>
                <DialogDescription>
                  Información completa del pedido seleccionado
                </DialogDescription>
              </DialogHeader>
              {selectedOrder && (
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Información del Cliente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{selectedOrder.customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{selectedOrder.customer.phone}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{selectedOrder.shippingAddress}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Productos</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                          </div>
                          <p className="font-medium">{formatPrice(item.price)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-lg font-bold text-blue-600">{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>

                  {/* Order Status and Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Estado</h3>
                      {getStatusBadge(selectedOrder.status)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Método de Pago</h3>
                      <Badge variant="outline">{selectedOrder.paymentMethod}</Badge>
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Notas</h3>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
