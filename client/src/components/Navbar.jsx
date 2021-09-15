import React from 'react';
import {IconContext} from 'react-icons';
import {BiHomeAlt, BiSearch, BiClipboard} from 'react-icons/bi';
import {FaClipboardList, FaSearch, FaHome, FaUserFriends} from 'react-icons/fa'

import {Link} from 'react-router-dom';


const Navbar = (props) => {
  return (
    <div className='navbar-container'>
      <Link to="/portfolio" className='navbar-button-link'>
        <div className='navbar-button'>
          <IconContext.Provider value={{className: 'navbar-button'}} >
            <div>
              <FaHome/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Portfolio</p>
        </div>
      </Link>
      <Link to="/stock-search" className='navbar-button-link'>
        <div className='navbar-button'>
          <IconContext.Provider value={{className: 'navbar-button'}}>
            <div>
              <FaSearch/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Find Stocks</p>
        </div>
      </Link>
      <Link to="/friend" className='navbar-button-link'>
        <div className='navbar-button'>
          <IconContext.Provider value={{className: 'navbar-button'}}>
            <div>
              <FaUserFriends/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Friends</p>
        </div>
      </Link>
      <Link to="/leaderboard" className='navbar-button-link'>
        <div className='navbar-button'>
          <IconContext.Provider value={{className: 'navbar-button'}}>
            <div>
              <FaClipboardList/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Leaderboard</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;