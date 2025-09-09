import Link from "next/link"
import { Instagram, Phone, Mail, MapPin } from "lucide-react"
import { Logo } from "../ui/Logo"

const siteConfig = {
  site: {
    name: "Sala Hogar",
    description: "Tu tienda de muebles de confianza",
    logo: "/images/logo_salahogar.png",
  },
  navigation: {
    main: [
      { name: "Inicio", href: "/" },
      { name: "Catálogo", href: "/catalogo" },
      { name: "Servicios", href: "/services" },
      { name: "Nosotros", href: "/nosotros" },
      { name: "Testimonios", href: "/testimonios" },
      { name: "Contacto", href: "/contact" },
    ],
  },
  contact: {
    phone: "305 4442883",
    email: "contacto@salahogar.com",
    address: "LAGO URIBE, Cra. 5 #28 - 02, Lago Uribe, Pereira, Risaralda",
    hours: "Lun-Vie: 8AM-6PM, Sáb: 8AM-6PM, Domingo: Cerrado",
  },
  social: {
    instagram: "https://www.instagram.com/salahogarpereira?igsh=MTBmc254dzM4bjF0ZQ==",
  },
}

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo size="md" href="/" />
            <p className="text-gray-300 text-sm">{siteConfig.site.description}</p>
            <div className="flex space-x-4">
              <Link href={siteConfig.social.instagram} className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo/sala" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sala
                </Link>
              </li>
              <li>
                <Link href="/catalogo/comedor" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Comedor
                </Link>
              </li>
              <li>
                <Link href="/catalogo/dormitorio" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Dormitorio
                </Link>
              </li>
              <li>
                <Link href="/catalogo/oficina" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Oficina
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                <span className="text-gray-300 text-sm">{siteConfig.contact.address}</span>
              </div>
              <div className="text-gray-300 text-sm">
                <strong>Horarios:</strong>
                <br />
                {siteConfig.contact.hours}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">© 2024 {siteConfig.site.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
