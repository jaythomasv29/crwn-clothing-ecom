import { createContext, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  isCartVisible: false,
  toggleCartVisible: () => null,
})


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisible = () => setIsCartVisible(!isCartVisible)
  const value = { isCartVisible, toggleCartVisible }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}