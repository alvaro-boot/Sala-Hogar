"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useProductStore } from "../../../store/product-store"
import { categories } from "../../../data/sample-products"

export function FilterPanel() {
  const { filters, setFilters } = useProductStore()
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    colors: true,
    materials: true,
    rating: true,
    availability: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const availableColors = ["Blanco", "Negro", "Gris", "Beige", "Azul Marino", "Roble Natural", "Nogal", "Cerezo"]
  const availableMaterials = ["Madera", "Tela", "Cuero", "Metal", "MDF", "Malla", "Plástico"]

  const handleColorChange = (color: string, checked: boolean) => {
    const currentColors = filters.colors || []
    const newColors = checked ? [...currentColors, color] : currentColors.filter((c) => c !== color)
    setFilters({ colors: newColors.length > 0 ? newColors : undefined })
  }

  const handleMaterialChange = (material: string, checked: boolean) => {
    const currentMaterials = filters.materials || []
    const newMaterials = checked ? [...currentMaterials, material] : currentMaterials.filter((m) => m !== material)
    setFilters({ materials: newMaterials.length > 0 ? newMaterials : undefined })
  }

  const handlePriceChange = (value: number[]) => {
    setFilters({ priceRange: [value[0], value[1]] })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold">Filtros</h3>
        {Object.keys(filters).length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setFilters({})}>
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {Object.keys(filters).length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Filtros activos:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <Badge variant="secondary" className="text-xs">
                Categoría: {filters.category}
                <button onClick={() => setFilters({ category: undefined })} className="ml-1 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.priceRange && (
              <Badge variant="secondary" className="text-xs">
                Precio: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <button onClick={() => setFilters({ priceRange: undefined })} className="ml-1 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.colors?.map((color) => (
              <Badge key={color} variant="secondary" className="text-xs">
                {color}
                <button onClick={() => handleColorChange(color, false)} className="ml-1 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="font-medium text-gray-900">Categoría</h4>
          {expandedSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="space-y-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={filters.category === category.id}
                    onCheckedChange={(checked) => setFilters({ category: checked ? category.id : undefined })}
                  />
                  <span className="text-sm capitalize">{category.name}</span>
                </label>
                {category.subcategories && filters.category === category.id && (
                  <div className="ml-6 space-y-1">
                    {category.subcategories.map((sub) => (
                      <label key={sub.id} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={filters.subcategory === sub.id}
                          onCheckedChange={(checked) => setFilters({ subcategory: checked ? sub.id : undefined })}
                        />
                        <span className="text-xs text-gray-600">{sub.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <button onClick={() => toggleSection("price")} className="flex items-center justify-between w-full text-left">
          <h4 className="font-medium text-gray-900">Precio</h4>
          {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              value={filters.priceRange || [0, 2000]}
              onValueChange={handlePriceChange}
              max={2000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${filters.priceRange?.[0] || 0}</span>
              <span>${filters.priceRange?.[1] || 2000}</span>
            </div>
          </div>
        )}
      </div>

      {/* Colors Filter */}
      <div className="space-y-3">
        <button onClick={() => toggleSection("colors")} className="flex items-center justify-between w-full text-left">
          <h4 className="font-medium text-gray-900">Colores</h4>
          {expandedSections.colors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.colors && (
          <div className="space-y-2">
            {availableColors.map((color) => (
              <label key={color} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.colors?.includes(color) || false}
                  onCheckedChange={(checked) => handleColorChange(color, !!checked)}
                />
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.toLowerCase().replace(" ", "") }}
                  />
                  <span className="text-sm">{color}</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Materials Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("materials")}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="font-medium text-gray-900">Materiales</h4>
          {expandedSections.materials ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.materials && (
          <div className="space-y-2">
            {availableMaterials.map((material) => (
              <label key={material} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.materials?.includes(material) || false}
                  onCheckedChange={(checked) => handleMaterialChange(material, !!checked)}
                />
                <span className="text-sm">{material}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <button onClick={() => toggleSection("rating")} className="flex items-center justify-between w-full text-left">
          <h4 className="font-medium text-gray-900">Valoración</h4>
          {expandedSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.rating === rating}
                  onCheckedChange={(checked) => setFilters({ rating: checked ? rating : undefined })}
                />
                <div className="flex items-center space-x-1">
                  <span className="text-sm">{rating}+ estrellas</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("availability")}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="font-medium text-gray-900">Disponibilidad</h4>
          {expandedSections.availability ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.availability && (
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={filters.inStock === true}
                onCheckedChange={(checked) => setFilters({ inStock: checked ? true : undefined })}
              />
              <span className="text-sm">Solo productos en stock</span>
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
