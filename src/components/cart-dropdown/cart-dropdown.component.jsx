import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItemsContainer, CartTotal, EmptyMessage } from './cart-dropdown';

// import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems, toggleCartVisible, cartTotal, isCartVisible } = useContext(CartContext);

  const handleButtonClick = () => {
    navigate("/checkout")
    toggleCartVisible(isCartVisible)

  }
  return (
    <CartDropdownContainer className="cart-dropdown-container">
      {
        cartItems.length ? 
        <CartItemsContainer>
        {
          cartItems.map((product, idx) => (
            <CartItem key={idx} product={product} />
          ))
        }
      </CartItemsContainer>
      :
      <EmptyMessage>Your cart is empty!</EmptyMessage>  
    }
      <Button onClick={handleButtonClick}>CHECKOUT <CartTotal className='cart-total'>${cartTotal}</CartTotal></Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown