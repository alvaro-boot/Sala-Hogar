"use client"

import Image from "next/image"
import { Users, Award, Heart, Target, Shield } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"


const values = [
  {
    icon: Heart,
    title: "Pasión por la Calidad",
    description: "Cada mueble es seleccionado cuidadosamente para garantizar durabilidad y belleza.",
  },
  {
    icon: Users,
    title: "Enfoque en el Cliente",
    description: "Nuestros clientes son el centro de todo lo que hacemos. Su satisfacción es nuestra prioridad.",
  },
  {
    icon: Shield,
    title: "Confianza y Transparencia",
    description: "Construimos relaciones duraderas basadas en la honestidad y el servicio excepcional.",
  },
  {
    icon: Target,
    title: "Innovación Constante",
    description: "Siempre buscamos nuevas formas de mejorar la experiencia de compra de muebles.",
  },
]

export default function NosotrosPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Sobre Nosotros</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Transformando hogares desde{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">1990</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Somos una empresa familiar dedicada a crear espacios únicos y funcionales. Con más de 15 años de
                experiencia, hemos ayudado a miles de familias a encontrar los muebles perfectos para sus hogares.
              </p>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Años de Experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10k+</div>
                  <div className="text-sm text-gray-600">Clientes Satisfechos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Productos Únicos</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&crop=center"
                alt="Showroom Salahogar"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
                <p className="text-gray-600 leading-relaxed">
                  Democratizar el acceso a muebles de alta calidad, ofreciendo diseños únicos y funcionales que se
                  adapten a todos los estilos de vida y presupuestos. Creemos que cada hogar merece ser un espacio
                  especial y acogedor.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ser la marca de muebles más confiable y querida de Colombia, reconocida por nuestra innovación,
                  calidad excepcional y compromiso genuino con la satisfacción del cliente. Queremos estar en cada hogar
                  que busque estilo y funcionalidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión y nos mantienen comprometidos con la excelencia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
