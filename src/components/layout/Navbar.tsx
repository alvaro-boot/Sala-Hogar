"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "../ui/Logo"
import { CartIcon } from "../features/cart/CartIcon"
import { CartDrawer } from "./CartDrawer"
import { SearchBox } from "../ui/SearchBox"

const siteConfig = {
  site: {
    name: "Sala Hogar",
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
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Logo size="lg" href="/" />

            <div className="hidden lg:flex items-center space-x-8">
              {siteConfig.navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <SearchBox className="w-64" />
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>

            <div className="lg:hidden flex items-center space-x-2">
              <CartIcon onClick={() => setIsCartOpen(true)} />
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {isOpen && (
            <div className="lg:hidden bg-white border-t">
              <div className="px-4 py-4 space-y-4">
                <SearchBox />
                <div className="space-y-2">
                  {siteConfig.navigation.main.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
