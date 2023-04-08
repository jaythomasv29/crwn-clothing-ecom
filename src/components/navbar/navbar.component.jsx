import { Outlet } from 'react-router-dom'
import { ReactComponent as BrandLogo } from "../../assets/crown.svg"
// import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from '../../utils/firebase.utils'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import CartIcon from '../cart-icon/cart-icon.component'
import { useDispatch, useSelector } from 'react-redux'

// import "./navbar.styles.js"
import { LogoContainer, NavigationContainer, NavLink, NavLinksContainer, AppContainer, BrandName } from './navbar.styles.js'
import { selectCurrentUser } from '../../store/user/user.selector'
import { selectCartVisible } from '../../store/cart/cart.selector'
import { toggleCartVisible } from '../../store/cart/cart.action'

const Navbar = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser);
  const isCartVisible = useSelector(selectCartVisible)
  
   const onToggleCartVisible = () => {
    dispatch(toggleCartVisible())
   }

  //  const isAdmin = (user) => user.accountType.includes("ADMIN")
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