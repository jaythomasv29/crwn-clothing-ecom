import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as BrandLogo } from "../../assets/crown.svg"
import { UserContext } from '../../contexts/user.context'
import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from '../../utils/firebase.utils'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import CartIcon from '../cart-icon/cart-icon.component'

// import "./navbar.styles.js"
import { LogoContainer, NavigationContainer, NavLink, NavLinksContainer, AppContainer } from './navbar.styles.js'
const Navbar = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartVisible, toggleCartVisible } = useContext(CartContext)
  console.log(isCartVisible);
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <BrandLogo className="logo" />
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          {
            currentUser ?

              <NavLink as="span" onClick={signOutUser} className="nav-link" to="/auth">SIGN OUT</NavLink>
              :
              <NavLink className="nav-link" to="/auth">SIGN IN</NavLink>
          }
          <div onClick={toggleCartVisible}>
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