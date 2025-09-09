export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Sala Hogar",
    "description": "Tienda de muebles de calidad en Pereira, Risaralda. Especialistas en sofás, camas, mesas, sillas y decoración para el hogar.",
    "url": "https://salahogar.com",
    "logo": "https://salahogar.com/images/logo_salahogar.png",
    "image": "https://salahogar.com/images/logo_salahogar.png",
    "telephone": "+57-305-4442883",
    "email": "contacto@salahogar.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cra. 5 #28 - 02, Lago Uribe",
      "addressLocality": "Pereira",
      "addressRegion": "Risaralda",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "4.8133",
      "longitude": "-75.6961"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "00:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "currenciesAccepted": "COP",
    "areaServed": {
      "@type": "City",
      "name": "Pereira"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catálogo de Muebles",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Sofás",
            "description": "Sofás de alta calidad para sala de estar"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Camas",
            "description": "Camas cómodas y elegantes para dormitorio"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Mesas",
            "description": "Mesas de comedor y centro de alta calidad"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Sillas",
            "description": "Sillas ergonómicas y elegantes"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/salahogarpereira"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
