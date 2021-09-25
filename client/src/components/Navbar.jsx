import React, {useState, useEffect} from 'react';
import {IconContext} from 'react-icons';
import {BiHomeAlt, BiSearch, BiClipboard} from 'react-icons/bi';
import {FaClipboardList, FaSearch, FaHome, FaUserFriends} from 'react-icons/fa'

import {Link} from 'react-router-dom';


const Navbar = (props) => {
  const [currentPage, setCurrentPage] = useState('nav-portfolio');

  useEffect(() => {
    document.getElementById(currentPage).classList.toggle('diamond-blue');
  }, []);

  const handleButtonClick = (button) => {
    document.getElementById(currentPage).classList.toggle('diamond-blue');
    document.getElementById(button).classList.toggle('diamond-blue');
    setCurrentPage(button);
  };

  return (
    <div className='navbar-container'>
      <Link to="/portfolio" className='navbar-button-link'>
        <div className='navbar-button' id='nav-portfolio' onClick={(e) => handleButtonClick('nav-portfolio')}>
          <IconContext.Provider value={{className: 'navbar-button-icon'}} >
            <div>
              <FaHome/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Portfolio</p>
        </div>
      </Link>
      <Link to="/stock-search" className='navbar-button-link'>
        <div className='navbar-button' id='nav-stocks' onClick={(e) => handleButtonClick('nav-stocks')}>
          <IconContext.Provider value={{className: 'navbar-button-icon'}}>
            <div>
              <FaSearch/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Find Stocks</p>
        </div>
      </Link>
      <Link to="/friend" className='navbar-button-link'>
        <div className='navbar-button' id='nav-friends' onClick={(e) => handleButtonClick('nav-friends')}>
          <IconContext.Provider value={{className: 'navbar-button-icon'}}>
            <div>
              <FaUserFriends/>
            </div>
          </IconContext.Provider>
          <p className='navbar-button-text'>Friends</p>
        </div>
      </Link>
      <Link to="/leaderboard" className='navbar-button-link'>
        <div className='navbar-button' id='nav-leaderboard' onClick={(e) => handleButtonClick('nav-leaderboard')}>
          <IconContext.Provider value={{className: 'navbar-button-icon'}}>
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