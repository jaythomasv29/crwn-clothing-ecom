// import React, { useContext } from 'react'
// import { CartContext } from '../../contexts/cart.context'
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { motion } from "framer-motion"

import "./checkout.styles.scss"
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="checkout-container">
        <div className="checkout-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>Description</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price ($)</span>
          </div>
          <div className="header-block">
            <span>Total Price</span>
          </div>
          <div className="header-block">
            <span>Remove</span>
          </div>
        </div>
        {
          cartItems.map((cartItem, idx) => (
            <CheckoutItem key={cartItem.id + idx} cartItem={cartItem}/>
          ))
        }
        <span className="total">Total: ${cartTotal}</span>
      <PaymentForm />
      </div>
    </motion.div>
  )
}

export default Checkout