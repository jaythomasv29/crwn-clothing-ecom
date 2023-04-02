import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ReactComponent as BrandLogo } from "../../assets/crown.svg"
import { UserContext } from '../../contexts/user.context'
import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from '../../utils/firebase.utils'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import CartIcon from '../cart-icon/cart-icon.component'

// import "./navbar.styles.js"
import { LogoContainer, NavigationContainer, NavLink, NavLinksContainer, AppContainer, BrandName } from './navbar.styles.js'
const Navbar = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartVisible, toggleCartVisible } = useContext(CartContext)
   const onToggleCartVisible = () => {
    toggleCartVisible(isCartVisible)
   }
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <BrandLogo />
          <BrandName>CRWN</BrandName>
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          {
            currentUser ?

              <NavLink as="span" onClick={signOutUser} to="/auth">SIGN OUT</NavLink>
              :
              <NavLink to="/auth">SIGN IN</NavLink>
          }
          <div onClick={onToggleCartVisible}>
            <CartIcon />
          </div>

          {
            isCartVisible &&
            <CartDropdown />
          }

        </NavLinksContainer>

      </NavigationContainer>
      <AppContainer>
        <Outlet />
      </AppContainer>
    </>
  )
}

export default Navbar