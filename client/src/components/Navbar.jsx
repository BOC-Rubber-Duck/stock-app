import React from 'react';
import {IconContext} from 'react-icons';
import {BiHomeAlt, BiSearch, BiClipboard} from 'react-icons/bi';

import {Link} from 'react-router-dom';


const Navbar = (props) => {
  return (
    <div className='navbar-container'>
      <div className='navbar-button'>
        <IconContext.Provider value={{className: 'navbar-button'}} >
          <div>
            <BiHomeAlt/>
          </div>
        </IconContext.Provider>
        <Link to="/login" className='navbar-button-text'>Portfolio</Link>
      </div>
      <div className='navbar-button'>
        <IconContext.Provider value={{className: 'navbar-button'}}>
          <div>
            <BiSearch/>
          </div>
        </IconContext.Provider>
        <Link to="/trade" className='navbar-button-text'>Find Stocks</Link>
      </div>
      <div className='navbar-button'>
        <IconContext.Provider value={{className: 'navbar-button'}}>
          <div>
            <BiClipboard/>
          </div>
        </IconContext.Provider>
        <Link to="/leaderboard" className='navbar-button-text'>Leaderboard</Link>
      </div>

    </div>
  );
};

export default Navbar;