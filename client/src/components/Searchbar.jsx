import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Predictions from './Predictions.jsx';
import {IconContext} from 'react-icons';
import {FaSearch} from 'react-icons/fa';

import StockDetailPage from './StockDetailPage.jsx';
import Stockbar from './Stockbar.jsx';

const Searchbar = (props) => {
  const [stockPredictions, setStockPredictions] = useState([]);
  const [displayStockDetails, setDisplayStockDetails] = useState(false);
  const [ownedStocks, setOwnedStocks] = useState([]);

  useEffect(() => {
    let stocks = [];
    props.userPortfolio.map((stock) => {
      const symbol = stock.ticker_symbol;
      axios.get('./fetchSelectedStock', {
        params: {
          symbol
        }
      })
        .then((res) => {
          const name = res.data.name;
          const type = 'stocksearch';
          //issue here
          stocks.push({symbol, name, type});
        })
        .catch((e) => console.log(e));
    });
    console.log(stocks)
    setOwnedStocks(stocks);
    console.log(ownedStocks)
  }, []);

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
      {ownedStocks &&

        ownedStocks.map(stock => {
          console.log('this stock', stock)
          return (
            <Stockbar
              name={stock.name}
              symbol={stock.symbol}
              type={stock.type}
            />
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