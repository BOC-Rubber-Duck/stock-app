import React, {useState} from 'react';
import axios from 'axios';

import Predictions from './Predictions.jsx';
import {IconContext} from 'react-icons';
import {FaSearch} from 'react-icons/fa';

import StockDetailPage from './StockDetailPage.jsx';
import Stockbar from './Stockbar.jsx';

const OwnedStock = () => {
  return (

    <div>hey</div>

  )

}

const Searchbar = (props) => {
  const [stockPredictions, setStockPredictions] = useState([]);
  const [displayStockDetails, setDisplayStockDetails] = useState(false);

  const handleUserInput = (e) => {
    e.preventDefault;
    const userStockSearch = e.target.value;

    if (!userStockSearch) {
      setStockPredictions([]);
    } else {
      axios.get('/userStockSearch', {
        params: {
          userStockSearch
        }
      })
        .then((res) => {
          const predictions = res.data;
          setStockPredictions(predictions);
        })
        .catch((e) => {
          console.log('error getting stock predictions', e)
        });
    }
  };

  const handlePredictionClick = (symbol) => {
    props.handlePredictionClick(symbol);
    setStockPredictions([]);
    setDisplayStockDetails(true)
  };

  const ownedStocks = () => {
    props.userPortfolio.map(stock => {
      return (

        <Stockbar symbol={stock.ticker_symbol} />
      )
    })
  }

  return (
    <div className='searcbar-main'>
      <div className='searchbar-container'>
        <div className='searchbar-display'>
          <IconContext.Provider value={{className: 'searchbar-icon'}}>
            <div className='search-icon-container'>
              <FaSearch />
            </div>
          </IconContext.Provider>
          <input
            type='text'
            className='searchbar-input'
            placeholder='Search...'
            onChange={(e) => handleUserInput(e)}>
          </input>
        </div>
      </div>
      <div className='searchbar-predictions-container'>
        {stockPredictions && <Predictions predictions={stockPredictions} predictionClick={handlePredictionClick}/>}
      </div>
      {true &&

        props.userPortfolio.map(stock => {
          return (

            <Stockbar symbol={stock.ticker_symbol} />
          )
        })
      }
      {displayStockDetails &&
        <StockDetailPage
          stockSelected={props.stockSelected}
          user={props.user}
        />
      }
    </div>
  );
};

export default Searchbar;