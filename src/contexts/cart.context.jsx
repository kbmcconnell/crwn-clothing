import { createContext, useState, useEffect, useReducer } from 'react'

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

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch(type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
  }
}

export const CartProvider = ({ children }) => {
  const [ { cartItems, isCartOpen, cartCount, cartTotal }, dispatch ] =
    useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    )

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
    )

    dispatch({ type: 'SET_CART_ITEMS',
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount
      }
    })
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems)
  }

  const value = {
    isCartOpen,
    setIsCartOpen: () => {},
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
