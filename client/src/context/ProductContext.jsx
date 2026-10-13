import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const ProductContext = createContext(null)
export const useProducts = () => useContext(ProductContext)
const fallbackProducts = [
  { _id: 'linen-throw', name: 'Linen throw blanket', category: 'Home', price: 84, description: 'A soft, weighty layer for slow mornings and open windows.', stock: 12, rating: 4.9, reviewCount: 128, featured: true, images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80'] },
  { _id: 'ceramic-set', name: 'Hand-thrown ceramic set', category: 'Home', price: 62, description: 'Four quietly irregular pieces made for daily rituals.', stock: 8, rating: 4.8, reviewCount: 94, featured: true, images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80'] },
  { _id: 'canvas-tote', name: 'Everyday canvas tote', category: 'Carry', price: 48, description: 'The easy carryall with room for the beautiful extras.', stock: 20, rating: 4.7, reviewCount: 76, images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'] },
  { _id: 'amber-candle', name: 'Amber studio candle', category: 'Wellness', price: 36, description: 'Warm cedar, bergamot and a trace of rain on concrete.', stock: 30, rating: 4.9, reviewCount: 211, featured: true, images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80'] },
  { _id: 'stone-vase', name: 'River stone vase', category: 'Home', price: 74, description: 'A sculptural vessel with a calm, tactile finish.', stock: 5, rating: 4.8, reviewCount: 42, images: ['https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=80'] },
  { _id: 'wool-cap', name: 'Merino watch cap', category: 'Wear', price: 39, description: 'Fine-gauge merino for crisp walks and cool train platforms.', stock: 18, rating: 4.6, reviewCount: 31, images: ['https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1000&q=80'] }
]
export function ProductProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.get('/products').then(({ data }) => data.length && setProducts(data)).catch(() => {}).finally(() => setLoading(false)) }, [])
  return <ProductContext.Provider value={{ products, loading }}>{children}</ProductContext.Provider>
}
