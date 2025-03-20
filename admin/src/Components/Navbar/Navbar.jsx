// import React from 'react'
// import './Navbar.css'
// import navlogo from '../../assets/logo.png'; 

// import navprofile from '../../assets/profile.png'

// const Navbar = () => {
//   return (
//     <div className='navbar'>
//         <img src={navlogo} alt="" className="logo" />
//         <img src={navprofile} className='nav-profile' alt="" />
//     </div>
//   )
// }

// export default Navbar

import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/logo.png';
import navprofile from '../../assets/profile.png'

const Navbar = () => {
    return (
      <div className='navbar'>
          <img src={navlogo} alt="Logo" className="logo" />
          
        <img src={navprofile} className='nav-profile' alt="Profile" />
          
      </div>
    );
  }

export default Navbar;
