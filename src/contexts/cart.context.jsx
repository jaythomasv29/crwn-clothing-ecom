import { createContext, useEffect, useState } from 'react';

const addProductToCart = (cartItems, product) => {
  const existingCartItem = cartItems.find(item => item.id == product.id)
  if (existingCartItem) {
    const cartWithIncreasedQuantity = cartItems.map(cartItem => cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    return cartWithIncreasedQuantity;
  }
  return [...cartItems, { ...product, quantity: 1 }];
}
  const decrementProductCount = (cartItems, product) => {
    const existingCartItem = cartItems.find(item => item.id == product.id)
    if(existingCartItem.quantity > 1) {
      // decrease the quantity by 1
      const cartWithDecreasedQuantity = cartItems.map(cartItem => cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
    return cartWithDecreasedQuantity;
    }
    // remove the item completely
    return cartItems.filter(cartItem => cartItem.id !== product.id)
  }

  const clearProductCompletely = (cartItems, product) =>  cartItems.filter(cartItem => cartItem.id !== product.id)
export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartVisible: false,
  toggleCartVisible: () => { },
  addProductToCart: () => { },
  
})


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    setCartCount(newCartCount)

    const newCartTotal = cartItems.reduce((acc, cartItem) => acc + (cartItem.quantity * cartItem.price), 0);
    setCartTotal(newCartTotal)

  }, [cartItems])

  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisible = () => setIsCartVisible(!isCartVisible)
  

  const addToCart = (product) => {
    setCartItems(addProductToCart(cartItems, product))
  }

  const decreaseItemInCart = (product) => {
    setCartItems(decrementProductCount(cartItems, product))
  }

  const clearItemsFromCart = (product) => {
    setCartItems(clearProductCompletely(cartItems, product))
  }


  const value = { cartItems, isCartVisible, toggleCartVisible, addToCart, cartCount, decreaseItemInCart, clearItemsFromCart, cartTotal }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}