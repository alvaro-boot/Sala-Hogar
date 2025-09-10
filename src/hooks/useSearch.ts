import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useProductStore } from '@/store/product-store'

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { products } = useProductStore()

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) return

    // Redirigir a la página de catálogo con el parámetro de búsqueda
    const searchParams = new URLSearchParams()
    searchParams.set('q', query.trim())
    router.push(`/catalogo?${searchParams.toString()}`)
  }, [router])

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }, [searchQuery, handleSearch])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  // Función para obtener sugerencias de búsqueda
  const getSearchSuggestions = useCallback((query: string) => {
    if (!query.trim() || query.length < 2) return []

    const lowerQuery = query.toLowerCase()
    return products
      .filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.subcategory.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5) // Máximo 5 sugerencias
      .map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        subcategory: product.subcategory
      }))
  }, [products])

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleSearchSubmit,
    handleSearchChange,
    getSearchSuggestions
  }
}
