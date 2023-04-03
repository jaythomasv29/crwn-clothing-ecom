// import React, { useContext } from 'react'
// import { CartContext } from '../../contexts/cart.context'
import { MdOutlineClear } from "react-icons/md"
import { AiOutlineMinusCircle } from "react-icons/ai"
import { BsPlusCircle } from "react-icons/bs"
import "./checkout-item.styles.scss"
import { addToCart, decreaseItemInCart, clearItemsFromCart } from '../../store/cart/cart.action'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { name, imageUrl, price, quantity } = cartItem

  const addItemHandler = () => dispatch(addToCart(cartItems, cartItem))
  const removeItemHandler = () => dispatch(decreaseItemInCart(cartItems, cartItem))
  const clearItemHandler = () => dispatch(clearItemsFromCart(cartItems, cartItem))
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