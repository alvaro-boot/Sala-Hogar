import type { Product } from '@/types/product'

interface ProductsData {
  products: Product[]
}

// Productos iniciales por defecto (los mismos que están en el JSON)
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sofá Modular Comfort Plus",
    description: "Sofá modular de 3 plazas con tapizado en tela premium y estructura de madera maciza. Perfecto para espacios modernos.",
    price: 5199996,
    originalPrice: 6399996,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    category: "sala",
    subcategory: "sofas",
    colors: ["Beige", "Gris", "Azul Marino"],
    materials: ["Tela", "Madera", "Espuma HR"],
    dimensions: { width: 220, height: 85, depth: 95 },
    weight: 65,
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviewCount: 124,
    features: [
      "Tapizado removible y lavable",
      "Estructura de madera maciza",
      "Cojines de espuma de alta densidad",
      "Diseño modular configurable"
    ],
    specifications: {
      "Material del marco": "Madera de pino",
      "Tapizado": "Tela 100% poliéster",
      "Relleno": "Espuma HR 35kg/m³",
      "Garantía": "2 años"
    },
    tags: ["moderno", "confortable", "modular", "sala"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T15:30:00Z"
  },
  {
    id: "2",
    name: "Mesa de Comedor Extensible Oak",
    description: "Mesa de comedor extensible en madera de roble natural. Capacidad para 6-8 personas con sistema de extensión fácil.",
    price: 3599996,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    category: "comedor",
    subcategory: "mesas",
    colors: ["Roble Natural", "Roble Oscuro"],
    materials: ["Madera de Roble", "Metal"],
    dimensions: { width: 180, height: 75, depth: 90 },
    weight: 45,
    inStock: true,
    stockQuantity: 8,
    rating: 4.6,
    reviewCount: 89,
    features: [
      "Madera de roble 100% natural",
      "Sistema de extensión suave",
      "Acabado resistente al agua",
      "Patas reforzadas con metal"
    ],
    specifications: {
      "Material": "Roble macizo",
      "Acabado": "Barniz poliuretano",
      "Capacidad": "6-8 personas",
      "Extensión": "180cm a 230cm"
    },
    tags: ["comedor", "extensible", "madera", "roble"],
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-18T12:00:00Z"
  },
  {
    id: "3",
    name: "Cama King Size Luxury Dream",
    description: "Cama king size con cabecero tapizado y base con almacenamiento. Diseño elegante para dormitorios principales.",
    price: 6399996,
    originalPrice: 7599996,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    category: "dormitorio",
    subcategory: "camas",
    colors: ["Gris Antracita", "Beige", "Blanco"],
    materials: ["Tela", "Madera", "Metal"],
    dimensions: { width: 200, height: 120, depth: 220 },
    weight: 85,
    inStock: true,
    stockQuantity: 5,
    rating: 4.9,
    reviewCount: 156,
    features: [
      "Cabecero tapizado acolchado",
      "Base con 4 cajones de almacenamiento",
      "Estructura reforzada",
      "Fácil montaje"
    ],
    specifications: {
      "Tamaño": "King Size (200x200cm)",
      "Material cabecero": "Tela premium",
      "Base": "MDF con cajones",
      "Peso máximo": "200kg"
    },
    tags: ["dormitorio", "king", "almacenamiento", "luxury"],
    createdAt: "2024-01-12T14:00:00Z",
    updatedAt: "2024-01-22T09:15:00Z"
  },
  {
    id: "4",
    name: "Escritorio Ejecutivo Premium",
    description: "Escritorio ejecutivo con acabado en nogal y detalles en cuero. Incluye cajones con cerradura y organizador de cables.",
    price: 2999996,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    category: "oficina",
    subcategory: "escritorios",
    colors: ["Nogal", "Cerezo"],
    materials: ["Madera", "Cuero", "Metal"],
    dimensions: { width: 160, height: 75, depth: 80 },
    weight: 55,
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 73,
    features: [
      "Acabado en nogal natural",
      "Detalles en cuero genuino",
      "Cajones con cerradura",
      "Sistema de gestión de cables"
    ],
    specifications: {
      "Material": "MDF enchapado en nogal",
      "Detalles": "Cuero genuino",
      "Cajones": "3 cajones con cerradura",
      "Peso máximo": "80kg"
    },
    tags: ["oficina", "ejecutivo", "nogal", "premium"],
    createdAt: "2024-01-08T11:00:00Z",
    updatedAt: "2024-01-19T16:45:00Z"
  },
  {
    id: "5",
    name: "Estantería Modular Nordic",
    description: "Sistema de estantería modular de estilo nórdico. Perfecta para organizar libros, decoración y objetos personales.",
    price: 1599996,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    category: "almacenamiento",
    subcategory: "estanterias",
    colors: ["Blanco", "Roble Claro", "Gris"],
    materials: ["MDF", "Metal"],
    dimensions: { width: 120, height: 180, depth: 35 },
    weight: 28,
    inStock: true,
    stockQuantity: 20,
    rating: 4.5,
    reviewCount: 92,
    features: [
      "Diseño modular expandible",
      "Montaje sin herramientas",
      "Acabado resistente a rayones",
      "Múltiples configuraciones"
    ],
    specifications: {
      "Material": "MDF laminado",
      "Estructura": "Metal pintado",
      "Módulos": "6 estantes ajustables",
      "Capacidad": "15kg por estante"
    },
    tags: ["almacenamiento", "modular", "nordic", "estanteria"],
    createdAt: "2024-01-05T09:30:00Z",
    updatedAt: "2024-01-17T13:20:00Z"
  },
  {
    id: "6",
    name: "Silla Ergonómica Office Pro",
    description: "Silla de oficina ergonómica con soporte lumbar ajustable y reposabrazos 4D. Ideal para largas jornadas de trabajo.",
    price: 1799996,
    originalPrice: 2199996,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    category: "oficina",
    subcategory: "sillas",
    colors: ["Negro", "Gris", "Azul"],
    materials: ["Malla", "Plástico", "Metal"],
    dimensions: { width: 65, height: 120, depth: 65 },
    weight: 18,
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviewCount: 187,
    features: [
      "Soporte lumbar ajustable",
      "Reposabrazos 4D",
      "Malla transpirable",
      "Base de aluminio con ruedas"
    ],
    specifications: {
      "Respaldo": "Malla transpirable",
      "Asiento": "Espuma de memoria",
      "Base": "Aluminio pulido",
      "Peso máximo": "120kg"
    },
    tags: ["oficina", "ergonomica", "silla", "profesional"],
    createdAt: "2024-01-03T16:00:00Z",
    updatedAt: "2024-01-21T10:30:00Z"
  }
]

export class ProductStorage {
  private static instance: ProductStorage
  private products: Product[] = []
  private isInitialized = false

  static getInstance(): ProductStorage {
    if (!ProductStorage.instance) {
      ProductStorage.instance = new ProductStorage()
    }
    return ProductStorage.instance
  }

  private async readProductsFile(): Promise<Product[]> {
    try {
      if (typeof window !== 'undefined') {
        // En el cliente, usar localStorage como respaldo
        const stored = localStorage.getItem('salahogar_products')
        if (stored) {
          const data = JSON.parse(stored)
          return data.products || DEFAULT_PRODUCTS
        }
        return DEFAULT_PRODUCTS
      }

      // En el servidor, retornar productos por defecto
      return DEFAULT_PRODUCTS
    } catch (error) {
      console.error('Error reading products:', error)
      return DEFAULT_PRODUCTS
    }
  }

  private async writeProductsFile(products: Product[]): Promise<void> {
    try {
      if (typeof window !== 'undefined') {
        // En el cliente, usar localStorage
        const data: ProductsData = { products }
        localStorage.setItem('salahogar_products', JSON.stringify(data))
      }
      // En el servidor, no hacer nada (solo usar productos por defecto)
    } catch (error) {
      console.error('Error writing products:', error)
      throw error
    }
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return
    
    this.products = await this.readProductsFile()
    this.isInitialized = true
  }

  async getProducts(): Promise<Product[]> {
    if (!this.isInitialized) {
      await this.initialize()
    }
    return [...this.products]
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.products.push(newProduct)
    await this.writeProductsFile(this.products)
    return newProduct
  }

  async updateProduct(id: string, productData: Omit<Product, 'id'>): Promise<Product | null> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) return null

    const updatedProduct: Product = {
      ...this.products[index],
      ...productData,
      id,
      updatedAt: new Date().toISOString(),
    }

    this.products[index] = updatedProduct
    await this.writeProductsFile(this.products)
    return updatedProduct
  }

  async deleteProduct(id: string): Promise<boolean> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) return false

    this.products.splice(index, 1)
    await this.writeProductsFile(this.products)
    return true
  }

  async getProductById(id: string): Promise<Product | null> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    return this.products.find(p => p.id === id) || null
  }

  // Método para sincronizar con localStorage en el cliente
  syncWithLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const data: ProductsData = { products: this.products }
      localStorage.setItem('salahogar_products', JSON.stringify(data))
    }
  }

  // Método para cargar desde localStorage en el cliente
  loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('salahogar_products')
      if (stored) {
        try {
          const data: ProductsData = JSON.parse(stored)
          this.products = data.products || []
          this.isInitialized = true
        } catch (error) {
          console.error('Error loading from localStorage:', error)
        }
      }
    }
  }

  // Método para exportar productos al archivo JSON
  exportToJSON(): string {
    const data: ProductsData = { products: this.products }
    return JSON.stringify(data, null, 2)
  }

  // Método para importar productos desde JSON
  importFromJSON(jsonData: string): void {
    try {
      const data: ProductsData = JSON.parse(jsonData)
      this.products = data.products || []
      this.isInitialized = true
      this.syncWithLocalStorage()
    } catch (error) {
      console.error('Error importing from JSON:', error)
    }
  }
}

export const productStorage = ProductStorage.getInstance()
