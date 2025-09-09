import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, CartStore } from "../types/cart"

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, selectedColor, quantity = 1) => {
        const existingItemIndex = get().items.findIndex(
          (item) => item.id === product.id && item.selectedColor === selectedColor,
        )

        if (existingItemIndex >= 0) {
          set((state) => ({
            items: state.items.map((item, index) =>
              index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
            ),
          }))
        } else {
          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            selectedColor,
            quantity,
            category: product.category,
          }
          set((state) => ({ items: [...state.items, newItem] }))
        }
      },

      removeItem: (id, selectedColor) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.selectedColor === selectedColor)),
        }))
      },

      updateQuantity: (id, selectedColor, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, selectedColor)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.selectedColor === selectedColor ? { ...item, quantity } : item,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
