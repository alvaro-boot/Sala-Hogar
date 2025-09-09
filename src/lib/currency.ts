/**
 * Utilidades para formateo de moneda colombiana
 */

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPrice(price: number): string {
  return formatCurrency(price)
}

export function formatPriceShort(price: number): string {
  if (price >= 1000000) {
    const millions = price / 1000000
    return `$${millions.toFixed(millions % 1 === 0 ? 0 : 1)}M`
  }
  if (price >= 1000) {
    const thousands = price / 1000
    return `$${thousands.toFixed(thousands % 1 === 0 ? 0 : 1)}K`
  }
  return formatCurrency(price)
}
