import { createContext, useContext, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        const maxQty = action.product.stock
        const nextQty = Math.min(existing.quantity + (action.quantity ?? 1), maxQty)
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: nextQty } : i
          ),
        }
      }
      const qty = Math.min(action.quantity ?? 1, action.product.stock)
      return {
        items: [...state.items, { product: action.product, quantity: qty }],
      }
    }
    case 'SET_QTY': {
      const q = Math.max(1, Math.min(action.quantity, action.product.stock))
      return {
        items: state.items.map((i) =>
          i.product.id === action.product.id ? { ...i, quantity: q } : i
        ),
      }
    }
    case 'INCREMENT': {
      return {
        items: state.items.map((i) => {
          if (i.product.id !== action.productId) return i
          const next = Math.min(i.quantity + 1, i.product.stock)
          return { ...i, quantity: next }
        }),
      }
    }
    case 'DECREMENT': {
      return {
        items: state.items
          .map((i) => {
            if (i.product.id !== action.productId) return i
            return { ...i, quantity: i.quantity - 1 }
          })
          .filter((i) => i.quantity > 0),
      }
    }
    case 'REMOVE':
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const addToCart = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD', product, quantity })
  }, [])

  const setQuantity = useCallback((product, quantity) => {
    dispatch({ type: 'SET_QTY', product, quantity })
  }, [])

  const increment = useCallback((productId) => {
    dispatch({ type: 'INCREMENT', productId })
  }, [])

  const decrement = useCallback((productId) => {
    dispatch({ type: 'DECREMENT', productId })
  }, [])

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'REMOVE', productId })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  )

  const value = {
    items: state.items,
    addToCart,
    setQuantity,
    increment,
    decrement,
    removeFromCart,
    clearCart,
    itemCount,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
