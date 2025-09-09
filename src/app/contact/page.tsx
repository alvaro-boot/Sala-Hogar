"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar, Star } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { toast } from "sonner"

const contactMethods = [
  {
    icon: Phone,
    title: "Teléfono",
    description: "Habla directamente con nuestros asesores",
    contact: "305 4442883",
    hours: "Lun-Vie: 8AM-6PM, Sáb: 8AM-6PM",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Envíanos tu consulta por correo",
    contact: "contacto@salahogar.com",
    hours: "Respuesta en menos de 24 horas",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chatea con nosotros en tiempo real",
    contact: "305 4442883",
    hours: "Disponible 24/7",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Calendar,
    title: "Cita Presencial",
    description: "Visita nuestro showroom",
    contact: "Agendar cita",
    hours: "Lun-Sáb: 10AM-7PM",
    color: "bg-orange-100 text-orange-600",
  },
]

const faqs = [
  {
    question: "¿Cuál es el tiempo de entrega?",
    answer:
      "El tiempo de entrega varía según el producto y tu ubicación. Generalmente es de 3-7 días hábiles para productos en stock y 2-4 semanas para productos personalizados.",
  },
  {
    question: "¿Ofrecen servicio de instalación?",
    answer:
      "Sí, ofrecemos servicio de entrega e instalación profesional. Nuestro equipo se encarga del montaje y configuración de tus muebles.",
  },
  {
    question: "¿Qué garantía tienen los productos?",
    answer:
      "Todos nuestros productos incluyen garantía de 2 años contra defectos de fabricación. Además, ofrecemos garantía de satisfacción de 30 días.",
  },
  {
    question: "¿Puedo personalizar los muebles?",
    answer:
      "Absolutamente. Ofrecemos opciones de personalización en colores, materiales y dimensiones para muchos de nuestros productos.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    toast.success("¡Mensaje enviado correctamente! Te contactaremos pronto.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Estamos Aquí Para Ayudarte</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Contáctanos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                hoy mismo
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ¿Tienes preguntas sobre nuestros productos o servicios? Nuestro equipo de expertos está listo para
              ayudarte a encontrar la solución perfecta para tu hogar.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>4.9/5 en atención al cliente</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Respuesta en menos de 2 horas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Múltiples Formas de Contactarnos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elige el método que más te convenga. Estamos disponibles cuando nos necesites
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <method.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  <p className="font-medium text-gray-900 mb-2">{method.contact}</p>
                  <p className="text-xs text-gray-500">{method.hours}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
                <p className="text-gray-600">Completa el formulario y te contactaremos pronto</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Tu número de teléfono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos más detalles sobre tu consulta..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              {/* Office Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                      <p className="text-gray-600">LAGO URIBE, Cra. 5 #28 - 02, Lago Uribe, Pereira, Risaralda</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                      <p className="text-gray-600">305 4442883</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">contacto@salahogar.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Horarios</h3>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>Lun-Vie: 8AM-6PM</p>
                        <p>Sábado: 8AM-6PM</p>
                        <p>Domingo: Cerrado</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.123456789!2d-74.123456789!3d4.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDcnMjQuNCJOIDc0wrAwNycwNC40Ilc!5e0!3m2!1ses!2sco!4v1234567890123!5m2!1ses!2sco"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Sala Hogar"
                    />
                  </div>
                  <div className="p-4 bg-blue-50 border-t">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Visítanos</p>
                        <p className="text-sm text-gray-600">LAGO URIBE, Cra. 5 #28 - 02, Lago Uribe, Pereira, Risaralda</p>
                        <a 
                          href="https://maps.app.goo.gl/QnWH34oJXczhxnEW6" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Ver en Google Maps →
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-lg text-gray-600">Encuentra respuestas rápidas a las consultas más comunes</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
