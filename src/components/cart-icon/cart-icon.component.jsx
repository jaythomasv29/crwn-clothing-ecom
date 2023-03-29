import { useContext } from "react"
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import { CartContext } from "../../contexts/cart.context"
import "./cart-icon.styles.scss"

const CartIcon = () => {
  const { cartCount } = useContext(CartContext)
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="cart-icon"/>
      <span className="item-total">{cartCount}</span>
    </div>
  )
}

export default CartIcon