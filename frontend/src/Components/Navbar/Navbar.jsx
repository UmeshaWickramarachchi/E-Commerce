import React, { useState, useContext } from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"; // Import this!

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart.png'
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
    const [menu,setMenu] = useState("Shop");
    const {getTotalCartItems}= useContext(ShopContext);
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
            <p>OYUKA</p>

        </div>
        <ul className="nav-menu">
  <li onClick={() => setMenu("shop")} className={menu === "shop" ? "active" : ""}>
    <Link to="/">Shop</Link>
  </li>
  <li onClick={() => setMenu("women")} className={menu === "women" ? "active" : ""}>
    <Link to="/women">Women</Link>
  </li>
  <li onClick={() => setMenu("gents")} className={menu === "gents" ? "active" : ""}>
    <Link to="/gents">Gents</Link>
  </li>
  <li onClick={() => setMenu("denim")} className={menu === "denim" ? "active" : ""}>
    <Link to="/denim">Denim Collection</Link>
  </li>
</ul>

            {/* <hr className={`menu-hr ${menu}`} /> */}
        <div className="nav-login-cart">
            <Link to={'/login'}><button>Login</button></Link>
            <Link to={'/cart'}><img className="cart" src={cart_icon} alt="" /></Link>
            <div className="cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
    
  )
}
