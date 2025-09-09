"use client"

import Image from "next/image"
import {
  Wrench,
  Palette,
  Truck,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Award,
} from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"

const services = [
  {
    id: "restauracion",
    title: "Restauración de Muebles",
    description: "Devolvemos la vida a tus muebles favoritos con técnicas profesionales de restauración",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&crop=center",
    features: [
      "Reparación de estructuras dañadas",
      "Restauración de acabados originales",
      "Reemplazo de herrajes y accesorios",
      "Tratamiento contra plagas y humedad",
      "Conservación de valor histórico",
    ],
    process: [
      "Evaluación y diagnóstico gratuito",
      "Presupuesto detallado sin compromiso",
      "Restauración con materiales premium",
      "Control de calidad riguroso",
      "Entrega con garantía de satisfacción",
    ],
    price: "Desde $150",
    duration: "2-4 semanas",
    warranty: "1 año",
  },
  {
    id: "tapiceria",
    title: "Retapizado y Tapicería",
    description: "Renovamos completamente tus sofás, sillas y muebles tapizados con materiales de primera calidad",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&crop=center",
    features: [
      "Más de 500 telas disponibles",
      "Reparación de estructuras internas",
      "Renovación de espumas y rellenos",
      "Acabados profesionales",
      "Diseños personalizados",
    ],
    process: [
      "Consulta de diseño personalizada",
      "Selección de materiales premium",
      "Desmontaje y reparación estructural",
      "Tapizado con técnicas artesanales",
      "Instalación y acabados finales",
    ],
    price: "Desde $200",
    duration: "1-3 semanas",
    warranty: "2 años",
  },
  {
    id: "reparacion",
    title: "Reparación Especializada",
    description: "Solucionamos todo tipo de daños en muebles de madera, metal y materiales mixtos",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop&crop=center",
    features: [
      "Reparación de grietas y roturas",
      "Soldadura y refuerzo de estructuras",
      "Reemplazo de piezas faltantes",
      "Nivelación y ajustes",
      "Tratamientos preventivos",
    ],
    process: [
      "Inspección técnica detallada",
      "Diagnóstico de problemas",
      "Reparación con técnicas especializadas",
      "Pruebas de resistencia y estabilidad",
      "Garantía de durabilidad",
    ],
    price: "Desde $80",
    duration: "3-10 días",
    warranty: "6 meses",
  },
  {
    id: "entrega",
    title: "Entrega e Instalación",
    description: "Servicio completo de entrega, montaje e instalación de muebles en tu hogar u oficina",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center",
    features: [
      "Entrega programada y puntual",
      "Montaje profesional in situ",
      "Instalación y configuración",
      "Retiro de embalajes",
      "Servicio de reubicación",
    ],
    process: [
      "Coordinación de fecha y hora",
      "Preparación y embalaje seguro",
      "Transporte especializado",
      "Montaje e instalación profesional",
      "Verificación final y limpieza",
    ],
    price: "Desde $50",
    duration: "Mismo día",
    warranty: "Satisfacción garantizada",
  },
]

const testimonials = [
  {
    name: "María Elena Rodríguez",
    service: "Restauración de Muebles",
    rating: 5,
    comment: "Increíble trabajo con mi mesa de comedor antigua. Quedó como nueva y conservó todo su encanto original.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "Carlos Mendoza",
    service: "Retapizado",
    rating: 5,
    comment: "El sofá de mi abuela ahora luce espectacular. La calidad del trabajo y los materiales es excepcional.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "Ana Patricia Silva",
    service: "Reparación Especializada",
    rating: 5,
    comment: "Repararon mi escritorio ejecutivo perfectamente. El servicio fue rápido y muy profesional.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Servicios Profesionales</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Restauración y Servicios{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Especializados
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Devolvemos la vida a tus muebles favoritos con más de 15 años de experiencia en restauración, tapicería y
              reparación especializada. Cada pieza recibe el cuidado artesanal que merece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                <Calendar className="mr-2 w-5 h-5" />
                Solicitar Cotización
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 bg-transparent">
                <Phone className="mr-2 w-5 h-5" />
                Llamar Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios Especializados</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una gama completa de servicios profesionales para el cuidado y mantenimiento de tus muebles
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">{service.price}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">¿Qué incluye?</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Nuestro Proceso</h4>
                    <div className="space-y-2">
                      {service.process.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <span className="text-sm text-gray-600">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{service.duration}</div>
                      <div className="text-xs text-gray-500">Tiempo estimado</div>
                    </div>
                    <div className="text-center">
                      <Shield className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{service.warranty}</div>
                      <div className="text-xs text-gray-500">Garantía</div>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Solicitar {service.title}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">¿Cómo Trabajamos?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un proceso simple y transparente para garantizar los mejores resultados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Evaluación Gratuita",
                description:
                  "Visitamos tu hogar para evaluar el estado de tus muebles y determinar el mejor tratamiento.",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Presupuesto Detallado",
                description:
                  "Te proporcionamos un presupuesto completo sin compromisos, explicando cada proceso necesario.",
                icon: "📋",
              },
              {
                step: "03",
                title: "Trabajo Especializado",
                description:
                  "Nuestros artesanos expertos trabajan con técnicas tradicionales y materiales de primera calidad.",
                icon: "🛠️",
              },
              {
                step: "04",
                title: "Entrega Garantizada",
                description: "Entregamos tu mueble restaurado con garantía de satisfacción y cuidado post-servicio.",
                icon: "✨",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mx-auto mb-4"
                    />
                    <div className="flex justify-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.service}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">¿Por Qué Elegir Nuestros Servicios?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "15+ Años de Experiencia",
                    description:
                      "Somos especialistas en restauración con más de una década perfeccionando nuestras técnicas.",
                    icon: Award,
                  },
                  {
                    title: "Materiales Premium",
                    description:
                      "Utilizamos únicamente materiales de la más alta calidad para garantizar durabilidad y belleza.",
                    icon: Star,
                  },
                  {
                    title: "Artesanos Expertos",
                    description:
                      "Nuestro equipo está formado por artesanos especializados en diferentes técnicas de restauración.",
                    icon: Wrench,
                  },
                  {
                    title: "Garantía Total",
                    description: "Todos nuestros trabajos incluyen garantía de satisfacción y calidad por escrito.",
                    icon: Shield,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop&crop=center"
                alt="Taller de restauración"
                width={500}
                height={600}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Muebles Restaurados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">¿Tienes un Mueble Que Necesita Atención?</h2>
            <p className="text-xl text-blue-100 mb-8">
              No importa el estado en que se encuentre, nuestros expertos pueden devolverle su belleza original.
              Solicita una evaluación gratuita hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
                <Calendar className="mr-2 w-5 h-5" />
                Agendar Evaluación Gratuita
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 bg-transparent"
              >
                <Phone className="mr-2 w-5 h-5" />
                Llamar: +1 (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Llámanos</h3>
              <p className="text-gray-300">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-400">Lun-Vie: 8AM-6PM</p>
            </div>
            <div>
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Escríbenos</h3>
              <p className="text-gray-300">servicios@salahogar.com</p>
              <p className="text-sm text-gray-400">Respuesta en 24hrs</p>
            </div>
            <div>
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Agenda Online</h3>
              <p className="text-gray-300">Evaluación gratuita</p>
              <p className="text-sm text-gray-400">Sin compromiso</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
