import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      
        <li><Link to="/addproduct" style={{textDecoration:"none", color: "white"}}>🛍️ Add Products</Link></li>
        <li><Link to="/productlist" style={{textDecoration:"none" , color: "white"}}>📦 List Product</Link></li>
       
      
    </div>
  ); 
};

export default Sidebar;
