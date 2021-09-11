import React from 'react';
import {IconContext} from 'react-icons';
import {BiHomeAlt, BiSearch, BiClipboard} from 'react-icons/bi';

import {Link} from 'react-router-dom';


const Navbar = (props) => {
  return (
    <div className='navbar-container'>
      <Link to="/login" className='navbar-button-link'>
        <div className='navbar-button'>
          <IconContext.Provider value={{className: 'navbar-button'}} >
            <div>
              <BiHomeAlt/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Portfolio</p>
        </div>
      </Link>
      <Link to="/trade" className='navbar-button-link'>
        <div className='navbar-button'>
          <IconContext.Provider value={{className: 'navbar-button'}}>
            <div>
              <BiSearch/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Find Stocks</p>
        </div>
      </Link>
      <Link to="/leaderboard" className='navbar-button-link'>
        <div className='navbar-button'>
          <IconContext.Provider value={{className: 'navbar-button'}}>
            <div>
              <BiClipboard/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Leaderboard</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;