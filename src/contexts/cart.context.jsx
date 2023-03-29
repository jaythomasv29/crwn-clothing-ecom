import { createContext, useEffect, useState } from 'react';

const addProductToCart = (cartItems, product) => {
  console.log({ product })
  const existingCartItem = cartItems.find(item => item.id == product.id)
  if (existingCartItem) {
    const cartWithIncreasedQuantity = cartItems.map(cartItem => cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    return cartWithIncreasedQuantity;
  }
  return [...cartItems, { ...product, quantity: 1 }];
}

export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  isCartVisible: false,
  toggleCartVisible: () => { },
  addProductToCart: () => { },
})


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    setCartCount(newCartCount)

    
  }, [cartItems])

  const [isCartVisible, setIsCartVisible] = useState(false);
  console.log(cartItems, cartCount)

  const toggleCartVisible = () => setIsCartVisible(!isCartVisible)

  const addCartItem = (product) => {
    setCartItems(addProductToCart(cartItems, product))

  }


  const value = { cartItems, isCartVisible, toggleCartVisible, addCartItem, cartCount }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}