import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems, toggleCartVisible, cartTotal } = useContext(CartContext);

  const handleButtonClick = () => {
    navigate("/checkout")
    toggleCartVisible()

  }
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {
          cartItems.map((product, idx) => (
            <CartItem key={idx} product={product} />
          ))
        }
      </div>
      <Button onClick={handleButtonClick}>CHECKOUT <span className='cart-total'>${cartTotal}</span></Button>
    </div>
  )
}

export default CartDropdown