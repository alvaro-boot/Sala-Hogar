import { create } from "zustand"
import type { Product, ProductFilters } from "@/types/product"

interface ProductStore {
  products: Product[]
  filteredProducts: Product[]
  filters: ProductFilters
  loading: boolean
  error: string | null
  setProducts: (products: Product[]) => void
  loadProducts: () => Promise<void>
  setFilters: (filters: Partial<ProductFilters>) => void
  clearFilters: () => void
  applyFilters: () => void
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: string, product: Omit<Product, 'id'>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  filters: {},
  loading: false,
  error: null,

  setProducts: (products) => {
    set({ products, filteredProducts: products })
  },

  loadProducts: async () => {
    try {
      set({ loading: true, error: null })
      
      console.log('Cargando productos desde la API...')
      
      // Cargar desde la API
      const response = await fetch('/api/products')
      console.log('Respuesta de carga:', response.status, response.statusText)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Productos cargados desde API:', data.products?.length || 0)
        set({ products: data.products || [], filteredProducts: data.products || [], loading: false })
      } else {
        console.log('API falló, usando localStorage como fallback')
        // Fallback a localStorage si la API falla
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('salahogar_products')
          if (stored) {
            const data = JSON.parse(stored)
            console.log('Productos cargados desde localStorage:', data.products?.length || 0)
            set({ products: data.products || [], filteredProducts: data.products || [], loading: false })
          } else {
            console.log('No hay productos en localStorage, usando array vacío')
            set({ products: [], filteredProducts: [], loading: false })
          }
        } else {
          set({ products: [], filteredProducts: [], loading: false })
        }
      }
    } catch (error) {
      console.error('Error loading products:', error)
      set({ error: 'Error al cargar los productos', loading: false })
    }
  },

  setFilters: (newFilters) => {
    const filters = { ...get().filters, ...newFilters }
    set({ filters })
    get().applyFilters()
  },

  clearFilters: () => {
    set({ filters: {} })
    get().applyFilters()
  },

  applyFilters: () => {
    const { products, filters } = get()
    let filtered = [...products]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Subcategory filter
    if (filters.subcategory) {
      filtered = filtered.filter((product) => product.subcategory === filters.subcategory)
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      filtered = filtered.filter((product) => product.price >= min && product.price <= max)
    }

    // Colors filter
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter((product) => product.colors.some((color) => filters.colors!.includes(color)))
    }

    // Materials filter
    if (filters.materials && filters.materials.length > 0) {
      filtered = filtered.filter((product) =>
        product.materials.some((material) => filters.materials!.includes(material)),
      )
    }

    // Stock filter
    if (filters.inStock !== undefined) {
      filtered = filtered.filter((product) => product.inStock === filters.inStock)
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter((product) => product.rating >= filters.rating!)
    }

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0

        switch (filters.sortBy) {
          case "name":
            comparison = a.name.localeCompare(b.name)
            break
          case "price":
            comparison = a.price - b.price
            break
          case "rating":
            comparison = a.rating - b.rating
            break
          case "newest":
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            break
        }

        return filters.sortOrder === "desc" ? -comparison : comparison
      })
    }

    set({ filteredProducts: filtered })
  },

  addProduct: async (productData) => {
    try {
      console.log('Enviando producto a la API:', productData)
      
      // Enviar a la API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      console.log('Respuesta de la API:', response.status, response.statusText)

      if (response.ok) {
        const newProduct = await response.json()
        console.log('Producto creado exitosamente:', newProduct)
        
        const { products } = get()
        const updatedProducts = [...products, newProduct]
        set({ products: updatedProducts })
        get().applyFilters()
        
        // También guardar en localStorage como respaldo
        if (typeof window !== 'undefined') {
          localStorage.setItem('salahogar_products', JSON.stringify({ products: updatedProducts }))
        }
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }))
        console.error('Error del servidor:', errorData)
        throw new Error(`Error al guardar el producto: ${errorData.error || response.statusText}`)
      }
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  },

  updateProduct: async (id, productData) => {
    try {
      // Enviar a la API
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...productData }),
      })

      if (response.ok) {
        const updatedProduct = await response.json()
        const { products } = get()
        const updatedProducts = products.map(product =>
          product.id === id ? updatedProduct : product
        )
        set({ products: updatedProducts })
        get().applyFilters()
        
        // También guardar en localStorage como respaldo
        if (typeof window !== 'undefined') {
          localStorage.setItem('salahogar_products', JSON.stringify({ products: updatedProducts }))
        }
      } else {
        throw new Error('Error al actualizar el producto en el servidor')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },

  deleteProduct: async (id) => {
    try {
      // Enviar a la API
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const { products } = get()
        const updatedProducts = products.filter(product => product.id !== id)
        set({ products: updatedProducts })
        get().applyFilters()
        
        // También guardar en localStorage como respaldo
        if (typeof window !== 'undefined') {
          localStorage.setItem('salahogar_products', JSON.stringify({ products: updatedProducts }))
        }
      } else {
        throw new Error('Error al eliminar el producto en el servidor')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  },
}))
