// import React, { useContext } from 'react'
// import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItemsContainer, CartTotal, EmptyMessage } from './cart-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { toggleCartVisible } from '../../store/cart/cart.action';

// import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  const handleButtonClick = () => {
    navigate("/checkout")
    dispatch(toggleCartVisible())

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