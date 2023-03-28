import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import "./cart-icon.styles.scss"

const CartIcon = () => {
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="cart-icon"/>
      <span className="item-total">0</span>
    </div>
  )
}

export default CartIcon