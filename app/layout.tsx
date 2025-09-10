import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ConditionalLayout } from "../src/components/layout/ConditionalLayout"
import { Toaster } from "sonner"
import { AuthProvider } from "../src/contexts/AuthContext"
import { StructuredData } from "../src/components/seo/StructuredData"

export const metadata: Metadata = {
  title: {
    default: 'Sala Hogar - Muebles de Calidad en Pereira, Risaralda',
    template: '%s | Sala Hogar - Muebles de Calidad en Pereira'
  },
  description: 'Sala Hogar: La mejor tienda de muebles en Pereira, Risaralda. Sofás, camas, mesas, sillas y más. Calidad garantizada, envío gratis y asesoría personalizada. ¡Transforma tu hogar con nosotros!',
  keywords: [
    'muebles Pereira',
    'muebles Risaralda', 
    'sofás Pereira',
    'camas Pereira',
    'mesas Pereira',
    'sillas Pereira',
    'muebles hogar',
    'decoración hogar',
    'muebles calidad',
    'tienda muebles Pereira',
    'muebles Lago Uribe',
    'Sala Hogar',
    'furniture Pereira',
    'home decor Pereira'
  ],
  authors: [{ name: 'Sala Hogar Team' }],
  creator: 'Sala Hogar',
  publisher: 'Sala Hogar',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://salahogar.com',
    siteName: 'Sala Hogar',
    title: 'Sala Hogar - Muebles de Calidad en Pereira, Risaralda',
    description: 'La mejor tienda de muebles en Pereira, Risaralda. Sofás, camas, mesas, sillas y más. Calidad garantizada y asesoría personalizada.',
    images: [
      {
        url: '/images/logo_salahogar.png',
        width: 1200,
        height: 630,
        alt: 'Sala Hogar - Muebles de Calidad en Pereira',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sala Hogar - Muebles de Calidad en Pereira, Risaralda',
    description: 'La mejor tienda de muebles en Pereira, Risaralda. Calidad garantizada y asesoría personalizada.',
    images: ['/images/logo_salahogar.png'],
  },
  alternates: {
    canonical: 'https://salahogar.com',
  },
  verification: {
    google: 'your-google-verification-code', // Se debe agregar cuando se tenga
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
      </head>
      <body className="font-sans">
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Toaster position="top-right" />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
