import { useContext } from "react"
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import { CartContext } from "../../contexts/cart.context"
// import "./cart-icon.styles.scss"

import { CartIconContainer, ShoppingIcon, ItemTotalCount } from "./cart-icon.js"
const CartIcon = () => {
  const { cartCount } = useContext(CartContext)
  return (
    <CartIconContainer>
      <ShoppingIcon />
      <ItemTotalCount>{cartCount}</ItemTotalCount>
    </CartIconContainer>
  )
}

export default CartIcon