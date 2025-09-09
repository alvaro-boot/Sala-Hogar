"use client"

import Image from "next/image"
import { Star, Quote, Heart, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"

const testimonials = [
  {
    id: 1,
    name: "María Elena Rodríguez",
    location: "Ciudad de México",
    rating: 5,
    date: "Hace 2 semanas",
    product: "Sofá Modular Comfort Plus",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    comment:
      "Increíble calidad y comodidad. El sofá llegó en perfectas condiciones y el servicio de entrega fue excepcional. Mi familia está encantada con la compra. Definitivamente recomiendo Salahogar.",
    verified: true,
    helpful: 24,
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    location: "Guadalajara",
    rating: 5,
    date: "Hace 1 mes",
    product: "Mesa de Comedor Extensible Oak",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    comment:
      "La mesa es exactamente lo que esperaba. La madera es de excelente calidad y el mecanismo de extensión funciona perfectamente. El proceso de compra fue muy fácil y la atención al cliente impecable.",
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    name: "Ana Patricia Silva",
    location: "Monterrey",
    rating: 5,
    date: "Hace 3 semanas",
    product: "Cama King Size Luxury Dream",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    comment:
      "Estoy fascinada con mi nueva cama. El diseño es elegante y los cajones de almacenamiento son muy prácticos. La calidad de los materiales es evidente. Valió cada peso invertido.",
    verified: true,
    helpful: 31,
  },
  {
    id: 4,
    name: "Roberto García",
    location: "Puebla",
    rating: 5,
    date: "Hace 1 semana",
    product: "Escritorio Ejecutivo Premium",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    comment:
      "Perfecto para mi oficina en casa. El acabado en nogal es hermoso y la funcionalidad es excelente. Los cajones con cerradura dan mucha seguridad. Muy satisfecho con la compra.",
    verified: true,
    helpful: 15,
  },
  {
    id: 5,
    name: "Lucía Fernández",
    location: "Tijuana",
    rating: 5,
    date: "Hace 2 meses",
    product: "Estantería Modular Nordic",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    comment:
      "La estantería es perfecta para mi sala. El montaje fue súper fácil y el diseño nórdico combina perfecto con mi decoración. La relación calidad-precio es excelente.",
    verified: true,
    helpful: 22,
  },
  {
    id: 6,
    name: "Diego Morales",
    location: "Mérida",
    rating: 5,
    date: "Hace 3 días",
    product: "Silla Ergonómica Office Pro",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    comment:
      "Como trabajo desde casa, necesitaba una silla cómoda. Esta silla ha sido un cambio total. Mi espalda ya no me duele después de largas jornadas. Excelente inversión.",
    verified: true,
    helpful: 9,
  },
]

const stats = [
  { number: "4.9", label: "Calificación Promedio", icon: Star },
  { number: "2,847", label: "Reseñas Totales", icon: Quote },
  { number: "98%", label: "Clientes Satisfechos", icon: Heart },
  { number: "95%", label: "Recomendarían", icon: ThumbsUp },
]

export default function TestimoniosPage() {
  const handleWhatsAppContact = () => {
    const phoneNumber = "573054442883" // Número de WhatsApp de Sala Hogar
    const message = encodeURIComponent(
      "¡Hola! 👋 Me interesa conocer más sobre los productos de Sala Hogar. Vi los testimonios en su página web y me gustaría recibir asesoría personalizada para encontrar los muebles perfectos para mi hogar. ¿Podrían ayudarme?"
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Testimonios Reales</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">clientes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Miles de familias han transformado sus hogares con Salahogar. Descubre por qué confían en nosotros para
            crear espacios únicos y funcionales.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Experiencias Reales</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada testimonio representa una historia de satisfacción y confianza en nuestros productos y servicios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                          {testimonial.verified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Verificado
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-blue-200" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{testimonial.date}</span>
                  </div>

                  {/* Product */}
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">
                      {testimonial.product}
                    </Badge>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-600 mb-4 leading-relaxed">"{testimonial.comment}"</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{testimonial.helpful} personas encontraron esto útil</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              ¿Listo para ser nuestro próximo cliente satisfecho?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Únete a miles de familias que ya han transformado sus hogares con Salahogar. Tu testimonio podría ser el
              próximo en aparecer aquí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors">
                Explorar Catálogo
              </button>
              <button 
                onClick={handleWhatsAppContact}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Contactar Asesor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
