import React from 'react';
import {IconContext} from 'react-icons';
import {BiSearch} from 'react-icons/Bi';

const Searchbar = () => {
  return (
    <div className='searchbar-container'>
      <div className='searchbar-display'>
        <IconContext.Provider value={{className: 'searchbar-icon'}}>
          <div>
            <BiSearch />
          </div>
        </IconContext.Provider>
        <input type='text' className='searchbar-input' placeholder='Search...'></input>
      </div>
    </div>
  );
};

export default Searchbar;