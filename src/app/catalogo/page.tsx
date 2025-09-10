"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "../../components/features/catalog/ProductCard"
import { FilterPanel } from "../../components/features/catalog/FilterPanel"
import { CategoryNav } from "../../components/features/catalog/CategoryNav"
import { useProductStore } from "../../store/product-store"
import { sampleProducts } from "../../data/sample-products"

export default function CatalogoPage() {
  const { products, loadProducts, filteredProducts, filters, setFilters, loading } = useProductStore()
  const searchParams = useSearchParams()

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Cargar productos desde el archivo JSON
    loadProducts()
    
    // Verificar si hay parámetros de búsqueda en la URL
    const query = searchParams.get('q')
    if (query) {
      setSearchTerm(query)
      setFilters({ search: query })
    } else {
      // Clear any existing filters when loading the main catalog
      setFilters({})
    }
  }, [loadProducts, setFilters, searchParams])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setFilters({ search: value })
  }

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-") as [string, "asc" | "desc"]
    setFilters({ sortBy: sortBy as any, sortOrder })
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Catálogo de Productos</h1>
          <p className="text-lg text-gray-600">Descubre nuestra amplia selección de muebles para el hogar</p>
        </div>

        {/* Category Navigation */}
        <CategoryNav />

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Nombre A-Z</SelectItem>
                  <SelectItem value="name-desc">Nombre Z-A</SelectItem>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating-desc">Mejor Valorados</SelectItem>
                  <SelectItem value="newest-desc">Más Recientes</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Filter Toggle */}
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-80 flex-shrink-0`}>
            <FilterPanel />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Mostrando {filteredProducts.length} productos</p>
              {Object.keys(filters).length > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFilters({})
                    setSearchTerm("")
                  }}
                  className="text-sm"
                >
                  Limpiar filtros
                </Button>
              )}
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500 mb-6">Intenta ajustar tus filtros o términos de búsqueda</p>
                <Button
                  onClick={() => {
                    setFilters({})
                    setSearchTerm("")
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
