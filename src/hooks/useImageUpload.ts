import { useState, useCallback } from 'react'

interface UseImageUploadOptions {
  maxImages?: number
  maxSize?: number // en MB
  allowedTypes?: string[]
}

export function useImageUpload({
  maxImages = 5,
  maxSize = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
}: UseImageUploadOptions = {}) {
  const [images, setImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    // Validar tipo de archivo
    if (!allowedTypes.includes(file.type)) {
      return `Tipo de archivo no permitido. Formatos permitidos: ${allowedTypes.join(', ')}`
    }

    // Validar tamaño
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      return `El archivo es demasiado grande. Máximo ${maxSize}MB`
    }

    return null
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const uploadImages = useCallback(async (files: FileList) => {
    setIsUploading(true)
    setError(null)

    try {
      const newImages: string[] = []
      const errors: string[] = []

      for (let i = 0; i < Math.min(files.length, maxImages - images.length); i++) {
        const file = files[i]
        
        const validationError = validateFile(file)
        if (validationError) {
          errors.push(`${file.name}: ${validationError}`)
          continue
        }

        try {
          const base64 = await fileToBase64(file)
          newImages.push(base64)
        } catch (error) {
          errors.push(`${file.name}: Error al procesar la imagen`)
        }
      }

      if (errors.length > 0) {
        setError(errors.join('\n'))
      }

      if (newImages.length > 0) {
        setImages(prev => [...prev, ...newImages])
      }
    } catch (error) {
      setError('Error inesperado al cargar las imágenes')
    } finally {
      setIsUploading(false)
    }
  }, [images.length, maxImages, maxSize, allowedTypes])

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearImages = useCallback(() => {
    setImages([])
    setError(null)
  }, [])

  const setImagesFromUrls = useCallback((urls: string[]) => {
    setImages(urls)
  }, [])

  return {
    images,
    isUploading,
    error,
    uploadImages,
    removeImage,
    clearImages,
    setImagesFromUrls,
    canAddMore: images.length < maxImages
  }
}
