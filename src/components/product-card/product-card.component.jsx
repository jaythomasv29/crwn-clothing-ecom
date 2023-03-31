import "./product-card.styles.scss"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"
import { CartContext } from "../../contexts/cart.context"
import { useContext } from "react";
const ProductCard = ({ product }) => {

  const addProductToCart = () => addToCart(product)
  const { name, price, imageUrl } = product;
  const { addToCart } = useContext(CartContext);
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