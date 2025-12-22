import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('cart', [])

  function addItem(meme) {
    setItems(prev => {
      const existing = prev.find(i => i.id === meme.id)
      if (existing) {
        return prev.map(i => i.id === meme.id ? { ...i, count: i.count + 1 } : i)
      }
      const price = meme.rating * 25
      return [...prev, { id: meme.id, name: meme.name, url: meme.url, rating: meme.rating, count: 1, price }]
    })
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function decreaseCount(id) {
    setItems(prev => prev.flatMap(i => {
      if (i.id !== id) return [i]
      if (i.count <= 1) return []
      return [{ ...i, count: i.count - 1 }]
    }))
  }

  function clearCart() { setItems([]) }

  function getTotalPrice() {
    return items.reduce((sum, i) => sum + i.price * i.count, 0)
  }

  const value = { items, addItem, removeItem, decreaseCount, clearCart, getTotalPrice }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used within CartProvider')
  return ctx
}
