import React from 'react';
import {IconContext} from 'react-icons';
import {BiHomeAlt, BiSearch, BiClipboard} from 'react-icons/bi';


const Navbar = (props) => {
  return (
    <div className='navbar-container'>
      <div className='navbar-button'>
        <IconContext.Provider value={{className: 'navbar-button'}} >
          <div>
            <BiHomeAlt/>
          </div>
        </IconContext.Provider>
        <span className='navbar-button-text'>Portfolio</span>
      </div>
      <div className='navbar-button'>
        <IconContext.Provider value={{className: 'navbar-button'}}>
          <div>
            <BiSearch/>
          </div>
        </IconContext.Provider>
        <span className='navbar-button-text'>Find Stocks</span>
      </div>
      <div className='navbar-button'>
        <IconContext.Provider value={{className: 'navbar-button'}}>
          <div>
            <BiClipboard/>
          </div>
        </IconContext.Provider>
        <span className='navbar-button-text'>Leaderboard</span>
      </div>
    </div>
  );
};

export default Navbar;