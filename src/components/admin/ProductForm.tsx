"use client"

import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Checkbox } from '../../../components/ui/checkbox'
import { Badge } from '../../../components/ui/badge'
import { ImageUpload } from '../ui/image-upload'
import { ImageUploadSimple } from '../ui/image-upload-simple'
import { X, Plus, Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/currency'
import type { Product } from '@/types/product'

interface ProductFormProps {
  product?: Product | null
  onSubmit: (productData: Omit<Product, 'id'>) => void
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    images: [] as string[],
    category: '',
    subcategory: '',
    colors: [''],
    materials: [''],
    dimensions: { width: 0, height: 0, depth: 0 },
    weight: 0,
    inStock: true,
    stockQuantity: 0,
    rating: 0,
    reviewCount: 0,
    features: [''],
    specifications: {} as Record<string, string>,
    tags: [''],
  })

  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        images: product.images && product.images.length > 0 ? product.images : [],
        category: product.category || '',
        subcategory: product.subcategory || '',
        colors: product.colors && product.colors.length > 0 ? product.colors : [''],
        materials: product.materials && product.materials.length > 0 ? product.materials : [''],
        dimensions: product.dimensions || { width: 0, height: 0, depth: 0 },
        weight: product.weight || 0,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        rating: product.rating,
        reviewCount: product.reviewCount,
        features: product.features && product.features.length > 0 ? product.features : [''],
        specifications: product.specifications,
        tags: product.tags && product.tags.length > 0 ? product.tags : [''],
      })
    } else {
      // Resetear el formulario cuando no hay producto
      setFormData({
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        images: [] as string[],
        category: '',
        subcategory: '',
        colors: [''],
        materials: [''],
        dimensions: { width: 0, height: 0, depth: 0 },
        weight: 0,
        inStock: true,
        stockQuantity: 0,
        rating: 0,
        reviewCount: 0,
        features: [''],
        specifications: {},
        tags: [''],
      })
    }
  }, [product])

  const categories = [
    { value: 'sala', label: 'Sala', subcategories: ['sofas', 'sillones', 'mesas-centro'] },
    { value: 'comedor', label: 'Comedor', subcategories: ['mesas', 'sillas-comedor', 'aparadores'] },
    { value: 'dormitorio', label: 'Dormitorio', subcategories: ['camas', 'armarios', 'mesitas'] },
    { value: 'oficina', label: 'Oficina', subcategories: ['escritorios', 'sillas', 'archivadores'] },
    { value: 'almacenamiento', label: 'Almacenamiento', subcategories: ['estanterias', 'vitrinas', 'cajoneras'] },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Limpiar arrays vacíos
    const cleanedData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ''),
      colors: formData.colors.filter(color => color.trim() !== ''),
      materials: formData.materials.filter(material => material.trim() !== ''),
      features: formData.features.filter(feature => feature.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
      createdAt: product?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSubmit(cleanedData)
  }

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as string[], '']
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }))
  }

  const updateArrayItem = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => 
        i === index ? value : item
      )
    }))
  }

  const addSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: specValue
        }
      }))
      setSpecKey('')
      setSpecValue('')
    }
  }

  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return { ...prev, specifications: newSpecs }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </CardTitle>
              <CardDescription>
                {product ? `Modifica la información de "${product.name}"` : 'Completa la información del nuevo producto'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, subcategory: '' }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                required
              />
            </div>

            {/* Precios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Precio (COP) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="1"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  required
                  placeholder="Ej: 1000000"
                />
                {formData.price > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {formatPrice(formData.price)}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="originalPrice">Precio Original (COP) (opcional)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="1"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                  placeholder="Ej: 1200000"
                />
                {formData.originalPrice > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {formatPrice(formData.originalPrice)}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="stockQuantity">Cantidad en Stock *</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: parseInt(e.target.value) || 0 }))}
                  required
                />
              </div>
            </div>

            {/* Subcategoría */}
            {formData.category && (
              <div>
                <Label htmlFor="subcategory">Subcategoría *</Label>
                <Select value={formData.subcategory} onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.find(cat => cat.value === formData.category)?.subcategories.map(sub => (
                      <SelectItem key={sub} value={sub}>
                        {sub.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Imágenes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imágenes del Producto
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Debug: {formData.images.length} imágenes cargadas
              </p>
              <ImageUploadSimple
                images={formData.images}
                onImagesChange={(newImages) => {
                  console.log('Cambio de imágenes:', newImages.length)
                  setFormData(prev => ({ ...prev, images: newImages }))
                }}
                maxImages={5}
              />
            </div>

            {/* Colores */}
            <div>
              <Label>Colores Disponibles</Label>
              <div className="space-y-2">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={color}
                      onChange={(e) => updateArrayItem('colors', index, e.target.value)}
                      placeholder="Color disponible"
                    />
                    {formData.colors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('colors', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('colors')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Color
                </Button>
              </div>
            </div>

            {/* Características */}
            <div>
              <Label>Características del Producto</Label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateArrayItem('features', index, e.target.value)}
                      placeholder="Característica del producto"
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('features', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('features')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Característica
                </Button>
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: !!checked }))}
              />
              <Label htmlFor="inStock">Producto en stock</Label>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {product ? 'Guardar Cambios' : 'Crear Producto'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
