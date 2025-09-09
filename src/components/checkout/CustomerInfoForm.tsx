"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { sendToWhatsAppWithCustomerInfo } from '@/lib/whatsapp'
import { WhatsAppPreview } from './WhatsAppPreview'
import type { CartItem } from '@/types/cart'

interface CustomerInfoFormProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  total: number
}

export function CustomerInfoForm({ isOpen, onClose, items, total }: CustomerInfoFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor complete todos los campos obligatorios')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Enviar a WhatsApp con la información del cliente
      sendToWhatsAppWithCustomerInfo(items, total, formData)
      
      // Cerrar el modal
      onClose()
      
      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
      })
    } catch (error) {
      console.error('Error al enviar a WhatsApp:', error)
      alert('Error al enviar el pedido. Por favor, intente nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Información de Contacto</DialogTitle>
          <DialogDescription>
            Complete sus datos para procesar su pedido por WhatsApp
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Formulario */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Ej: juan@email.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Ej: 3001234567"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="address">Dirección de entrega</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Dirección completa para la entrega"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Notas adicionales</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Instrucciones especiales o comentarios"
              rows={2}
            />
          </div>
          
              <div className="flex space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar a WhatsApp'}
                </Button>
              </div>
            </form>
          </div>

          {/* Vista previa del mensaje */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Vista previa del mensaje</h3>
            <WhatsAppPreview 
              items={items}
              total={total}
              customerInfo={formData}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
