import { useState, useEffect } from 'react'
import { CartContext } from './cart-context'
import { normalizeCartItem, normalizeQuantity } from '../utils/normalizeCartItem'

const CART_STORAGE_KEY = 'duoback_cart'

function readInitialCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (!saved) return { items: [], storageUnavailable: false }

    const parsed = JSON.parse(saved)
    return {
      items: Array.isArray(parsed) ? parsed.map(normalizeCartItem).filter(Boolean) : [],
      storageUnavailable: false,
    }
  } catch {
    return { items: [], storageUnavailable: true }
  }
}

export function CartProvider({ children }) {
  const initial = readInitialCart()
  const [cartItems, setCartItems] = useState(initial.items)
  const [storageUnavailable, setStorageUnavailable] = useState(initial.storageUnavailable)

  function persistCart(updater) {
    setCartItems(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next))
        setStorageUnavailable(false)
      } catch {
        setStorageUnavailable(true)
      }
      return next
    })
  }

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      /* Storage unavailability is tracked on read/update actions. */
    }
  }, [cartItems])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  function addToCart(payload) {
    const product = normalizeCartItem(payload)
    if (!product) return
    persistCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedColor === product.selectedColor
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: normalizeQuantity(updated[existingIndex].quantity + product.quantity),
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
    persistCart(prev =>
      prev.filter(item => !(item.id === productId && item.selectedColor === selectedColor))
    )
  }

  function updateQuantity(productId, selectedColor, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor)
      return
    }
    persistCart(prev =>
      prev.map(item =>
        item.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity: normalizeQuantity(quantity) }
          : item
      )
    )
  }

  function clearCart() {
    persistCart([])
  }

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart, storageUnavailable }}>
      {children}
    </CartContext.Provider>
  )
}
