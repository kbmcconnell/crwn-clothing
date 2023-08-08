import { createContext, useState } from 'react'

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }
  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
