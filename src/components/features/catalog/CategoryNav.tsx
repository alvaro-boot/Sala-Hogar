"use client"
import { usePathname } from "next/navigation"
import { useProductStore } from "../../../store/product-store"
import { categories } from "../../../data/sample-products"

export function CategoryNav() {
  const pathname = usePathname()
  const { filters, setFilters } = useProductStore()

  const handleCategoryClick = (categoryId?: string) => {
    if (categoryId) {
      setFilters({ category: categoryId, subcategory: undefined })
    } else {
      setFilters({ category: undefined, subcategory: undefined })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryClick()}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !filters.category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
              filters.category === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
