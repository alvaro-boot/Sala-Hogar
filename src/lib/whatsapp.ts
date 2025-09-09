import type { CartItem } from '@/types/cart'
import { formatPrice } from './currency'

// Configuración de WhatsApp Business API
const WHATSAPP_BUSINESS_API_URL = 'https://graph.facebook.com/v18.0'
const PHONE_NUMBER_ID = 'YOUR_PHONE_NUMBER_ID' // Necesitarás obtener esto de WhatsApp Business
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN' // Token de acceso de WhatsApp Business

export function generateWhatsAppMessage(items: CartItem[], total: number): string {
  const message = `🏠 *SALA HOGAR - NUEVA ORDEN* 🏠

═══════════════════════════════════

🛒 *PRODUCTOS SOLICITADOS:*

${items.map((item, index) => `
${index + 1}. *${item.name}*
   🎨 Color: ${item.selectedColor}
   📦 Cantidad: ${item.quantity}
   💵 Precio: ${formatPrice(item.price)}
   💰 Subtotal: ${formatPrice(item.price * item.quantity)}
`).join('')}

═══════════════════════════════════

💵 *TOTAL A PAGAR: ${formatPrice(total)}*

═══════════════════════════════════

👤 *DATOS DEL CLIENTE:*
Por favor, confirme su pedido y proporcione sus datos de contacto para coordinar la entrega.

📞 *Contacto Sala Hogar:*
WhatsApp: 3002048198

¡Gracias por elegir Sala Hogar! 🏠✨`

  return message
}

export function sendToWhatsApp(items: CartItem[], total: number): void {
  const phoneNumber = '3002048198'
  const message = generateWhatsAppMessage(items, total)
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message)
  
  // Crear URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
  // Abrir WhatsApp en nueva ventana
  window.open(whatsappUrl, '_blank')
}

// Función para crear mensaje estructurado tipo tarjeta
export function createStructuredMessage(
  items: CartItem[], 
  total: number, 
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: string
    notes?: string
  }
) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const firstProduct = items[0]
  
  return {
    messaging_product: "whatsapp",
    to: "573002048198", // Número en formato internacional
    type: "interactive",
    interactive: {
      type: "product_list",
      header: {
        type: "text",
        text: "🏠 Sala Hogar - Nueva Orden"
      },
      body: {
        text: `Hola! Tienes una nueva orden de ${customerInfo.name}.\n\n📧 ${customerInfo.email}\n📱 ${customerInfo.phone}${customerInfo.address ? `\n🏠 ${customerInfo.address}` : ''}`
      },
      footer: {
        text: `Total: ${formatPrice(total)} • ${itemCount} artículos`
      },
      action: {
        catalog_id: "YOUR_CATALOG_ID", // ID del catálogo de WhatsApp Business
        sections: [
          {
            title: "Productos Solicitados",
            product_items: items.map((item, index) => ({
              product_retailer_id: item.id,
              product_name: item.name,
              product_price: item.price,
              product_currency: "COP",
              quantity: item.quantity,
              item_price: item.price * item.quantity
            }))
          }
        ]
      }
    }
  }
}

// Función alternativa usando template de mensaje
export function createTemplateMessage(
  items: CartItem[], 
  total: number, 
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: string
    notes?: string
  }
) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  return {
    messaging_product: "whatsapp",
    to: "573002048198",
    type: "template",
    template: {
      name: "order_confirmation", // Nombre del template en WhatsApp Business
      language: {
        code: "es"
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "text",
              text: "Sala Hogar"
            }
          ]
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: customerInfo.name
            },
            {
              type: "text",
              text: itemCount.toString()
            },
            {
              type: "text",
              text: formatPrice(total)
            }
          ]
        }
      ]
    }
  }
}

// Función para enviar mensaje estructurado (requiere API de WhatsApp Business)
export async function sendStructuredMessage(
  items: CartItem[], 
  total: number, 
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: string
    notes?: string
  }
) {
  try {
    const messageData = createStructuredMessage(items, total, customerInfo)
    
    const response = await fetch(`${WHATSAPP_BUSINESS_API_URL}/${PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData)
    })

    if (response.ok) {
      console.log('Mensaje estructurado enviado exitosamente')
      return true
    } else {
      console.error('Error enviando mensaje estructurado:', await response.text())
      return false
    }
  } catch (error) {
    console.error('Error en sendStructuredMessage:', error)
    return false
  }
}

// Función mejorada que intenta usar mensaje estructurado, si falla usa el método tradicional
export function sendToWhatsAppWithCustomerInfo(
  items: CartItem[], 
  total: number, 
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: string
    notes?: string
  }
): void {
  const phoneNumber = '3002048198'
  
  // Crear mensaje mejorado con formato de tarjeta visual
  const message = `🏠 *SALA HOGAR - NUEVA ORDEN* 🏠

┌─────────────────────────────────┐
│  🛒 *${items.reduce((sum, item) => sum + item.quantity, 0)} artículos*  │
│  💰 *${formatPrice(total)}*  │
└─────────────────────────────────┘

👤 *Cliente:* ${customerInfo.name}
📧 *Email:* ${customerInfo.email}
📱 *Teléfono:* ${customerInfo.phone}
${customerInfo.address ? `🏠 *Dirección:* ${customerInfo.address}` : ''}
${customerInfo.notes ? `📝 *Notas:* ${customerInfo.notes}` : ''}

🛒 *PRODUCTOS:*
${items.map((item, index) => `
${index + 1}. *${item.name}*
   🎨 ${item.selectedColor || 'No especificado'} • 📦 ${item.quantity} • ${formatPrice(item.price * item.quantity)}
`).join('')}

💵 *TOTAL: ${formatPrice(total)}*

📞 *Contacto:* 3002048198
¡Gracias por elegir Sala Hogar! 🏠✨`
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message)
  
  // Crear URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
  // Abrir WhatsApp en nueva ventana
  window.open(whatsappUrl, '_blank')
}
