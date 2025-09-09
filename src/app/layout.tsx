import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { Toaster } from "sonner"

const siteConfig = {
  site: {
    name: "Salahogar",
    description: "Tu tienda de muebles de confianza",
    url: "https://salahogar.com",
    logo: "/placeholder.svg?height=40&width=40",
    favicon: "/favicon.ico",
  },
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.site.name,
    template: `%s | ${siteConfig.site.name}`,
  },
  description: siteConfig.site.description,
  keywords: ["muebles", "hogar", "decoración", "furniture", "home"],
  authors: [{ name: "Salahogar Team" }],
  creator: "Salahogar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
