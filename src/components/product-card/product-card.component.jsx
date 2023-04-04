// import { CartContext } from "../../contexts/cart.context"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"
import { addToCart } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./product-card.styles.scss"
const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const addProductToCart = () => dispatch(addToCart(cartItems, product))
  const { name, price, imageUrl } = product;


  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add To cart</Button>
    </div>
  )
}

export default ProductCard