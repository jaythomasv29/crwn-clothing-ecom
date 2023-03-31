import React, { useContext } from 'react'
import { MdOutlineClear } from "react-icons/md"
import { CartContext } from '../../contexts/cart.context'
import { AiOutlineMinusCircle } from "react-icons/ai"
import { BsPlusCircle } from "react-icons/bs"
import "./checkout-item.styles.scss"

const CheckoutItem = ({ cartItem }) => {
  const { addToCart, decreaseItemInCart, clearItemsFromCart } = useContext(CartContext)
  const { name, imageUrl, price, quantity } = cartItem

  const addItemHandler = () => addToCart(cartItem)
  const removeItemHandler = () => decreaseItemInCart(cartItem)
  const clearItemHandler = () => clearItemsFromCart(cartItem)
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <AiOutlineMinusCircle onClick={removeItemHandler} />
        <span>{quantity}</span>
        <BsPlusCircle onClick={addItemHandler} />
      </div>
      <span className="price">${price}</span>
      <span className="product-total">${price * quantity}</span>
      <div className="remove-button"><MdOutlineClear onClick={clearItemHandler} /></div>
    </div>
  )
}

export default CheckoutItem