import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as BrandLogo } from "../../assets/crown.svg"
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase.utils'

import "./navbar.styles.scss"
const Navbar = () => {
  const { currentUser} = useContext(UserContext)

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <BrandLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">SHOP</Link>
          {
            currentUser ? 

            <Link onClick={signOutUser} className="nav-link" to="/auth">SIGN OUT</Link>
            :
            <Link className="nav-link" to="/auth">SIGN IN</Link>
          } 
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar