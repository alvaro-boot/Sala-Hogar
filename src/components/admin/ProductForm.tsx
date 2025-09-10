"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react'
import { formatPrice } from '@/lib/currency'
import type { Product } from '@/types/product'

interface ProductFormProps {
  product?: Product | null
  onSave: () => void
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
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
    specifications: [] as Array<{ name: string; value: string }>,
    tags: [''],
  })

  const [loading, setLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])

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
        specifications: product.specifications || [],
        tags: product.tags && product.tags.length > 0 ? product.tags : [''],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Convertir imágenes a base64 si hay archivos
      let processedImages = [...formData.images]
      
      if (imageFiles.length > 0) {
        const base64Images = await Promise.all(
          imageFiles.map(file => 
            new Promise<string>((resolve) => {
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result as string)
              reader.readAsDataURL(file)
            })
          )
        )
        processedImages = [...processedImages, ...base64Images]
      }

      // Limpiar arrays vacíos
      const cleanedData = {
        ...formData,
        images: processedImages.filter(img => img.trim() !== ''),
        colors: formData.colors.filter(color => color.trim() !== ''),
        materials: formData.materials.filter(material => material.trim() !== ''),
        features: formData.features.filter(feature => feature.trim() !== ''),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        specifications: formData.specifications.filter(spec => spec.name.trim() !== '' && spec.value.trim() !== ''),
        createdAt: product?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Aquí deberías llamar a la función de guardar del store
      console.log('Product data to save:', cleanedData)
      
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onSave()
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImageFiles(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const removeImageFile = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
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
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }))
  }

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }))
  }

  const updateSpecification = (index: number, field: 'name' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }))
  }

  const selectedCategory = categories.find(cat => cat.value === formData.category)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información Básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Datos principales del producto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Sofá Modular Comfort Plus"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe las características del producto"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="originalPrice">Precio Original</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, subcategory: '' }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategoría</Label>
                <Select value={formData.subcategory} onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory?.subcategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Imágenes */}
        <Card>
          <CardHeader>
            <CardTitle>Imágenes del Producto</CardTitle>
            <CardDescription>Sube las imágenes del producto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="images">Subir Imágenes</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-2"
              />
              <p className="text-sm text-gray-500">Puedes seleccionar múltiples imágenes</p>
            </div>

            {/* Imágenes existentes */}
            {formData.images.length > 0 && (
              <div>
                <Label>Imágenes Actuales</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nuevas imágenes */}
            {imageFiles.length > 0 && (
              <div>
                <Label>Nuevas Imágenes</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Nueva imagen ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeImageFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detalles del Producto */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Producto</CardTitle>
          <CardDescription>Especificaciones técnicas y características</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Colores Disponibles</Label>
              <div className="space-y-2">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={color}
                      onChange={(e) => updateArrayItem('colors', index, e.target.value)}
                      placeholder="Ej: Azul, Rojo, Verde"
                    />
                    {formData.colors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('colors', index)}
                      >
                        <Trash2 className="h-4 w-4" />
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
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Color
                </Button>
              </div>
            </div>

            <div>
              <Label>Materiales</Label>
              <div className="space-y-2">
                {formData.materials.map((material, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={material}
                      onChange={(e) => updateArrayItem('materials', index, e.target.value)}
                      placeholder="Ej: Madera, Metal, Tela"
                    />
                    {formData.materials.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('materials', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('materials')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Material
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="width">Ancho (cm)</Label>
              <Input
                id="width"
                type="number"
                value={formData.dimensions.width}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, width: Number(e.target.value) }
                }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="height">Alto (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.dimensions.height}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, height: Number(e.target.value) }
                }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="depth">Profundidad (cm)</Label>
              <Input
                id="depth"
                type="number"
                value={formData.dimensions.depth}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, depth: Number(e.target.value) }
                }))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="stockQuantity">Cantidad en Stock</Label>
              <Input
                id="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={formData.inStock}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: !!checked }))}
            />
            <Label htmlFor="inStock">Producto en Stock</Label>
          </div>
        </CardContent>
      </Card>

      {/* Especificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Especificaciones Técnicas</CardTitle>
          <CardDescription>Detalles técnicos del producto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <Input
                  value={spec.name}
                  onChange={(e) => updateSpecification(index, 'name', e.target.value)}
                  placeholder="Nombre de la especificación"
                />
                <div className="flex gap-2">
                  <Input
                    value={spec.value}
                    onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                    placeholder="Valor"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSpecification(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSpecification}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Especificación
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : (product ? 'Actualizar Producto' : 'Crear Producto')}
        </Button>
      </div>
    </form>
  )
}