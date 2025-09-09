"use client"

import { useState, useRef } from 'react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { X, Upload, Plus } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadSimpleProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

export function ImageUploadSimple({ images, onImagesChange, maxImages = 5, className = '' }: ImageUploadSimpleProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  console.log('ImageUploadSimple renderizado con:', {
    imagesCount: images.length,
    maxImages,
    isUploading,
    fileInputRef: fileInputRef.current
  })

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) {
      console.log('No se seleccionaron archivos')
      return
    }

    console.log(`Seleccionados ${files.length} archivos`)
    setIsUploading(true)

    try {
      const newImages: string[] = []
      
      for (let i = 0; i < Math.min(files.length, maxImages - images.length); i++) {
        const file = files[i]
        console.log(`Procesando archivo ${i + 1}:`, file.name, file.type, file.size)
        
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
          alert(`El archivo ${file.name} no es una imagen válida`)
          continue
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`La imagen ${file.name} es demasiado grande. Máximo 5MB`)
          continue
        }

        // Convertir a base64 para almacenamiento local
        const base64 = await fileToBase64(file)
        newImages.push(base64)
        console.log(`Imagen ${i + 1} convertida a base64`)
      }

      const updatedImages = [...images, ...newImages]
      console.log('Nuevas imágenes:', updatedImages.length)
      onImagesChange(updatedImages)
    } catch (error) {
      console.error('Error al procesar imágenes:', error)
      alert('Error al cargar las imágenes')
    } finally {
      setIsUploading(false)
      // Limpiar el input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const openFileDialog = () => {
    console.log('openFileDialog llamado')
    console.log('fileInputRef.current:', fileInputRef.current)
    if (fileInputRef.current) {
      console.log('Haciendo click en el input de archivos')
      fileInputRef.current.click()
    } else {
      console.error('fileInputRef.current es null')
    }
  }

  const validImages = images.filter(image => image && image.trim() !== '')
  const canAddMore = validImages.length < maxImages

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imágenes del Producto (Versión Simple)
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Máximo {maxImages} imágenes. Formatos: JPG, PNG, WebP. Tamaño máximo: 5MB por imagen.
        </p>
        <p className="text-xs text-blue-600 mb-3">
          Debug: {validImages.length} de {maxImages} imágenes cargadas. Puede agregar más: {canAddMore ? 'Sí' : 'No'}
        </p>
      </div>

      {/* Grid de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Imágenes existentes */}
        {validImages.map((image, index) => (
          <Card key={index} className="relative group">
            <CardContent className="p-2">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Botón para agregar más imágenes */}
        {canAddMore && (
          <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
            <CardContent className="p-2">
              <button
                onClick={() => {
                  console.log('Botón de agregar imagen clickeado')
                  openFileDialog()
                }}
                disabled={isUploading}
                className="w-full h-full aspect-square flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                {isUploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
                ) : (
                  <>
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-xs text-center">Agregar imagen</span>
                  </>
                )}
              </button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Input oculto para archivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Botón de carga alternativo */}
      {validImages.length === 0 && (
        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              console.log('Botón alternativo de seleccionar imágenes clickeado')
              openFileDialog()
            }}
            disabled={isUploading}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Cargando...' : 'Seleccionar Imágenes'}
          </Button>
        </div>
      )}

      {/* Información de imágenes cargadas */}
      {validImages.length > 0 && (
        <div className="text-sm text-gray-600">
          {validImages.length} de {maxImages} imágenes cargadas
        </div>
      )}
    </div>
  )
}
