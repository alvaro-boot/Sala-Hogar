"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Truck, Shield, Headphones, Award } from "lucide-react"
import { Button } from "../../components/ui/button"
import { ProductCard } from "../components/features/catalog/ProductCard"
import { useProductStore } from "../store/product-store"
import { sampleProducts, categories } from "../data/sample-products"

export default function HomePage() {
  const { products, loadProducts, filteredProducts } = useProductStore()

  useEffect(() => {
    // Cargar productos desde el archivo JSON
    loadProducts()
  }, [loadProducts])

  const featuredProducts = filteredProducts.slice(0, 6)

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Los Mejores{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
                    Muebles
                  </span>{" "}
                  | Sala Hogar
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Descubre la mejor tienda de muebles. Sofás, camas, mesas y sillas de alta calidad.
                  Envío local, asesoría personalizada y garantía de satisfacción. ¡Transforma tu hogar con nosotros!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4">
                  <Link href="/catalogo">
                    Ver Catálogo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="text-lg px-8 py-4 bg-transparent">
                  <Link href="/nosotros">Conoce Más</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Productos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10k+</div>
                  <div className="text-sm text-gray-600">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Años</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&crop=center"
                alt="Sala moderna con muebles elegantes"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">4.9/5</div>
                    <div className="text-gray-500">+2,500 reseñas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Salahogar?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nos comprometemos a ofrecerte la mejor experiencia en muebles para el hogar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Envío Gratis</h3>
              <p className="text-gray-600">Envío gratuito en Pereira y Dos Quebradas por compras superiores a $500.000</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Garantía</h3>
              <p className="text-gray-600">Garantía en todos nuestros productos, somos fabricantes</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Headphones className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Atención Personalizada</h3>
              <p className="text-gray-600">Atención al cliente de lunes a sábado según horario de atención</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Calidad Premium</h3>
              <p className="text-gray-600">Materiales de la más alta calidad y durabilidad</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Explora nuestras categorías</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que necesitas para cada espacio de tu hogar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={`/catalogo/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Image
                  src={category.image || `/placeholder.svg?height=400&width=600&query=${category.name}+furniture+category`}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Productos destacados</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros productos más populares y mejor valorados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4">
              <Link href="/catalogo">
                Ver Todos los Productos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                ¿Por qué elegir Sala Hogar para tus muebles en Pereira?
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Muebles de Calidad en Pereira:</strong> Somos la tienda de muebles más confiable en Pereira, Risaralda. 
                  Ofrecemos una amplia gama de sofás, camas, mesas, sillas y accesorios para el hogar con garantía de calidad.
                </p>
                <p>
                  <strong>Envío Gratis en Pereira:</strong> Realizamos envío gratuito a toda la ciudad de Pereira y municipios cercanos. 
                  Nuestro equipo de entrega profesional se encarga de que tus muebles lleguen en perfectas condiciones.
                </p>
                <p>
                  <strong>Asesoría Personalizada:</strong> Nuestros expertos en decoración te ayudan a elegir los muebles perfectos 
                  para tu hogar. Visita nuestro showroom en Lago Uribe o consulta desde casa.
                </p>
                <p>
                  <strong>Garantía de Satisfacción:</strong> Todos nuestros muebles cuentan con garantía de calidad. 
                  Si no estás completamente satisfecho, trabajamos contigo para encontrar la solución perfecta.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nuestros Productos Destacados</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span><strong>Sofás en Pereira:</strong> Sofás de 2, 3 y 4 plazas en diferentes estilos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span><strong>Camas en Pereira:</strong> Camas individuales, dobles y king size</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span><strong>Mesas en Pereira:</strong> Mesas de comedor, centro y escritorio</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span><strong>Sillas en Pereira:</strong> Sillas de comedor, oficina y decorativas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span><strong>Muebles de Sala:</strong> Juegos de sala completos y modulares</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span><strong>Decoración Hogar:</strong> Accesorios y decoración para completar tu hogar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">¿Listo para transformar tu hogar?</h2>
            <p className="text-lg text-blue-100">
              Únete a miles de clientes satisfechos y descubre por qué somos la mejor opción en muebles para el hogar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                <Link href="/catalogo">
                  Explorar Catálogo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 bg-transparent"
              >
                <Link href="/contact">Contactar Asesor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
