"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ApiTest() {
  const [testResult, setTestResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    setTestResult('')
    
    try {
      console.log('Probando API...')
      
      // Test 1: GET
      const getResponse = await fetch('/api/products')
      console.log('GET Response:', getResponse.status, getResponse.statusText)
      
      if (getResponse.ok) {
        const data = await getResponse.json()
        console.log('GET Data:', data)
        setTestResult(`✅ GET exitoso: ${data.products?.length || 0} productos encontrados`)
      } else {
        setTestResult(`❌ GET falló: ${getResponse.status} ${getResponse.statusText}`)
        return
      }
      
      // Test 2: POST
      const testProduct = {
        name: 'Producto de Prueba',
        description: 'Este es un producto de prueba',
        price: 100000,
        category: 'sala',
        subcategory: 'sofas',
        colors: ['Rojo'],
        materials: ['Tela'],
        dimensions: { width: 100, height: 50, depth: 80 },
        weight: 20,
        inStock: true,
        stockQuantity: 1,
        rating: 5,
        reviewCount: 1,
        features: ['Prueba'],
        specifications: { Material: 'Prueba' },
        tags: ['prueba'],
        images: ['/placeholder.svg?height=400&width=600']
      }
      
      console.log('Enviando producto de prueba:', testProduct)
      
      const postResponse = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testProduct),
      })
      
      console.log('POST Response:', postResponse.status, postResponse.statusText)
      
      if (postResponse.ok) {
        const newProduct = await postResponse.json()
        console.log('POST Data:', newProduct)
        setTestResult(prev => prev + `\n✅ POST exitoso: Producto creado con ID ${newProduct.id}`)
        
        // Test 3: DELETE (limpiar el producto de prueba)
        const deleteResponse = await fetch(`/api/products?id=${newProduct.id}`, {
          method: 'DELETE',
        })
        
        console.log('DELETE Response:', deleteResponse.status, deleteResponse.statusText)
        
        if (deleteResponse.ok) {
          setTestResult(prev => prev + `\n✅ DELETE exitoso: Producto de prueba eliminado`)
        } else {
          setTestResult(prev => prev + `\n❌ DELETE falló: ${deleteResponse.status}`)
        }
      } else {
        const errorData = await postResponse.json().catch(() => ({ error: 'Error desconocido' }))
        console.error('POST Error:', errorData)
        setTestResult(prev => prev + `\n❌ POST falló: ${errorData.error || postResponse.statusText}`)
      }
      
    } catch (error) {
      console.error('Error en test:', error)
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prueba de API</CardTitle>
        <CardDescription>
          Prueba la conectividad y funcionalidad de la API de productos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testApi} disabled={loading}>
          {loading ? 'Probando...' : 'Probar API'}
        </Button>
        
        {testResult && (
          <div className="p-4 bg-gray-100 rounded-md">
            <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
