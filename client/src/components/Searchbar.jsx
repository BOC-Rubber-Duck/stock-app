import React, {useState} from 'react';
import {IconContext} from 'react-icons';
import {BiSearch} from 'react-icons/Bi';

const Searchbar = () => {

  const [searchInput, setSearchInput] = useState('');

  return (
    <div className='searchbar-container'>
      <div className='searchbar-display'>
        <IconContext.Provider value={{className: 'searchbar-icon'}}>
          <div className='search-icon-container'>
            <BiSearch />
          </div>
        </IconContext.Provider>
        <input
          type='text'
          className='searchbar-input'
          placeholder='Search...'
          onChange={(e) => setSearchInput(e.target.value)}
          >
        </input>
        <button onClick={() => console.log(searchInput)}>clickme</button>
      </div>
    </div>
  );
};

export default Searchbar;