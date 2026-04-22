import { useState, useEffect } from 'react'
import { CartContext } from './cart-context'

const CART_STORAGE_KEY = 'duoback_cart'

function normalizeCartItem(item) {
  return {
    ...item,
    price:
      typeof item.price === 'number'
        ? item.price
        : parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0,
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (!saved) return []

      const parsed = JSON.parse(saved)
      return Array.isArray(parsed) ? parsed.map(normalizeCartItem) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  function addToCart(product) {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedColor === product.selectedColor
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + product.quantity,
        }
        return updated
      }
      return [
        ...prev,
        { ...normalizeCartItem(product), addedAt: new Date().toISOString() },
      ]
    })
  }

  function removeFromCart(productId, selectedColor) {
    setCartItems(prev =>
      prev.filter(item => !(item.id === productId && item.selectedColor === selectedColor))
    )
  }

  function updateQuantity(productId, selectedColor, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    )
  }

  function clearCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
