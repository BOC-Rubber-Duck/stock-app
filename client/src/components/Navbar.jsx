import React from 'react';
import { IconContext } from 'react-icons'
import {BiHomeAlt, BiSearch, BiClipboard} from 'react-icons/Bi'

const Navbar = (props) => {
  return (
    <div className='navbar-container'>
      <div className='navbar-button'>
        <IconContext.Provider value={{className: 'navbar-icon'}}>
          <div>
            <BiHomeAlt/>
          </div>
        </IconContext.Provider>
        <span>Portfolio</span>
      </div>
      <div className='navbar-button'>
        <IconContext.Provider value={{className: 'navbar-icon'}}>
          <div>
            <BiSearch/>
          </div>
        </IconContext.Provider>
        <span>Find Stocks</span>
      </div>
      <div className='navbar-button'>
        <IconContext.Provider value={{className: 'navbar-icon'}}>
          <div>
            <BiClipboard/>
          </div>
        </IconContext.Provider>
        <span>Leaderboard</span>
      </div>
    </div>
  );
};

export default Navbar;