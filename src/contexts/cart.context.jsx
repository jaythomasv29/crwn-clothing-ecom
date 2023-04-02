import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const addProductToCart = (cartItems, product) => {
  const existingCartItem = cartItems.find(item => item.id === product.id)
  if (existingCartItem) {
    const cartWithIncreasedQuantity = cartItems.map(cartItem => cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    return cartWithIncreasedQuantity;
  }
  return [...cartItems, { ...product, quantity: 1 }];
}
const decrementProductCount = (cartItems, product) => {
  const existingCartItem = cartItems.find(item => item.id === product.id)
  if (existingCartItem.quantity > 1) {
    // decrease the quantity by 1
    const cartWithDecreasedQuantity = cartItems.map(cartItem => cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
    return cartWithDecreasedQuantity;
  }
  // remove the item completely
  return cartItems.filter(cartItem => cartItem.id !== product.id)
}

const clearProductCompletely = (cartItems, product) => cartItems.filter(cartItem => cartItem.id !== product.id)

export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartVisible: false,
  toggleCartVisible: () => { },
  addProductToCart: () => { },

})

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartVisible: false,
}

const CART_ACTION_TYPES = {
  "SET_CART_ITEMS": "SET_CART_ITEMS",
  "TOGGLE_CART_DISPLAY": "TOGGLE_CART_DISPLAY",

}
const cartReducer = (state, action) => {
  const { payload, type } = action
  switch (action.type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      console.log("before state update", state)
      console.log("action dispatch", payload)
      return { ...state, ...payload }
    case CART_ACTION_TYPES.TOGGLE_CART_DISPLAY:
      return { ...state, ...payload }
    default:
      throw new Error(`Unhandled action type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)



  const toggleCartVisible = (isCartVisible) => dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_DISPLAY, { isCartVisible: !isCartVisible }));

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((acc, cartItem) => acc + (cartItem.quantity * cartItem.price), 0);

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }))
  }

  const addToCart = (product) => {
    const newCartItems = addProductToCart(state.cartItems, product)
    updateCartItemsReducer(newCartItems);
  }

  const decreaseItemInCart = (product) => {
    const newCartItems = decrementProductCount(state.cartItems, product)
    updateCartItemsReducer(newCartItems);
  }

  const clearItemsFromCart = (product) => {
    const newCartItems = clearProductCompletely(state.cartItems, product)
    updateCartItemsReducer(newCartItems);
  }

  const { cartItems, cartTotal, cartCount, isCartVisible } = state
  const value = { cartItems, cartTotal, cartCount, isCartVisible, toggleCartVisible, addToCart, decreaseItemInCart, clearItemsFromCart, state }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}