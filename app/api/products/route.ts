import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import type { Product } from '@/types/product'

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'data', 'products.json')

interface ProductsData {
  products: Product[]
}

// GET - Leer productos
export async function GET() {
  try {
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const fileContent = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8')
      const data: ProductsData = JSON.parse(fileContent)
      return NextResponse.json(data)
    }
    
    return NextResponse.json({ products: [] })
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json({ error: 'Error al leer los productos' }, { status: 500 })
  }
}

// POST - Agregar producto
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()
    
    // Leer productos existentes
    let products: Product[] = []
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const fileContent = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8')
      const data: ProductsData = JSON.parse(fileContent)
      products = data.products || []
    }

    // Crear nuevo producto
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Agregar producto
    products.push(newProduct)

    // Escribir al archivo
    const data: ProductsData = { products }
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json(newProduct)
  } catch (error) {
    console.error('Error adding product:', error)
    return NextResponse.json({ error: 'Error al agregar el producto' }, { status: 500 })
  }
}

// PUT - Actualizar producto
export async function PUT(request: NextRequest) {
  try {
    const { id, ...productData } = await request.json()
    
    // Leer productos existentes
    let products: Product[] = []
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const fileContent = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8')
      const data: ProductsData = JSON.parse(fileContent)
      products = data.products || []
    }

    // Buscar y actualizar producto
    const index = products.findIndex(p => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    const updatedProduct: Product = {
      ...products[index],
      ...productData,
      id,
      updatedAt: new Date().toISOString(),
    }

    products[index] = updatedProduct

    // Escribir al archivo
    const data: ProductsData = { products }
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Error al actualizar el producto' }, { status: 500 })
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 })
    }

    // Leer productos existentes
    let products: Product[] = []
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const fileContent = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8')
      const data: ProductsData = JSON.parse(fileContent)
      products = data.products || []
    }

    // Filtrar producto
    const filteredProducts = products.filter(p => p.id !== id)
    
    if (filteredProducts.length === products.length) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    // Escribir al archivo
    const data: ProductsData = { products: filteredProducts }
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 })
  }
}
