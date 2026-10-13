import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('northstar-cart') || '[]'))
  useEffect(() => localStorage.setItem('northstar-cart', JSON.stringify(cart)), [cart])
  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item._id === product._id)
      if (existing) return current.map((item) => item._id === product._id ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) } : item)
      return [...current, { ...product, quantity }]
    })
    toast.success(`${product.name} added to bag`)
  }
  const updateQuantity = (id, quantity) => setCart((current) => quantity < 1 ? current.filter((item) => item._id !== id) : current.map((item) => item._id === id ? { ...item, quantity } : item))
  const removeFromCart = (id) => setCart((current) => current.filter((item) => item._id !== id))
  const clearCart = () => setCart([])
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart])
  return <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, itemCount: cart.reduce((sum, item) => sum + item.quantity, 0) }}>{children}</CartContext.Provider>
}
