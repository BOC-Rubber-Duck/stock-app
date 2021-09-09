import React, {useState} from 'react';
import axios from 'axios';

import Predictions from './Predictions.jsx'
import {IconContext} from 'react-icons';
import {BiSearch} from 'react-icons/Bi';

const Searchbar = () => {
  const [stockPredictions, setStockPredictions] = useState([]);

  const handleUserInput = (e) => {
    e.preventDefault;
    const userStockSearch = e.target.value;
    axios.get('/userStockSearch', {
      params: {
        userStockSearch
      }
    })
      .then((res) => {
        const predictions = res.data;
        setStockPredictions(predictions);
      });
  };

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
          onChange={(e) => handleUserInput(e)}
          >
        </input>
      </div>
          {stockPredictions && <Predictions predictions={stockPredictions}/>}
    </div>
  );
};

export default Searchbar;