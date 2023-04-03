// import { useContext } from "react"
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
// import { CartContext } from "../../contexts/cart.context"
// import "./cart-icon.styles.scss"

import { CartIconContainer, ShoppingIcon, ItemTotalCount } from "./cart-icon.js"
import { useSelector } from "react-redux"
import { selectCartCount } from "../../store/cart/cart.selector"
const CartIcon = () => {
  const cartCount = useSelector(selectCartCount)
  return (
    <CartIconContainer>
      <ShoppingIcon />
      <ItemTotalCount>{cartCount}</ItemTotalCount>
    </CartIconContainer>
  )
}

export default CartIcon