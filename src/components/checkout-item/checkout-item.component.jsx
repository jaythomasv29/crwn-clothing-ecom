import React, { useContext } from 'react'
import { MdOutlineClear } from "react-icons/md"
import { CartContext } from '../../contexts/cart.context'
import { AiOutlineMinusCircle } from "react-icons/ai"
import { BsPlusCircle } from "react-icons/bs"
import "./checkout-item.styles.scss"

const CheckoutItem = ({ cartItem }) => {
  const { addToCart, decreaseItemInCart, clearItemsFromCart } = useContext(CartContext)
  const { id, name, imageUrl, price, quantity } = cartItem
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <AiOutlineMinusCircle onClick={() => decreaseItemInCart(cartItem)} />
        <span>{quantity}</span>
        <BsPlusCircle onClick={() => addToCart(cartItem)} />
      </div>
      <span className="price">${price}</span>
      <span className="product-total">${price * quantity}</span>
      <div className="remove-button"><MdOutlineClear onClick={() => clearItemsFromCart(cartItem)} /></div>
    </div>
  )
}

export default CheckoutItem