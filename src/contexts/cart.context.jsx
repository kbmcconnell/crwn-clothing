import { createContext, useState, useEffect } from 'react'

// checks if the item is already in the cart - if so, it adds + 1 to quantity
// otherwise creates a new cart item and returns new array with updated quantity
const addCartItem = (cartItems, producToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === producToAdd.id)
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === producToAdd.id ?
      {...cartItem, quantity: cartItem.quantity + 1 }
    : cartItem
    )
  }
  // we hit this if the product doesn't already exist - we create a new array with the existing cart items, then add
  // a quantity of 1 for the new cart item
  return [...cartItems, { ...producToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
      {...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
    )
  }
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    cartItems,
    cartCount }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
