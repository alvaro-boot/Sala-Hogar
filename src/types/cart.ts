export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  selectedColor?: string
  selectedMaterial?: string
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}
