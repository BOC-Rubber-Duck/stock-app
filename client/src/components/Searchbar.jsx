import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Predictions from './Predictions.jsx';
import {IconContext} from 'react-icons';
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';

import StockDetailPage from './StockDetailPage.jsx';
import Stockbar from './Portfolio/Stockbar.jsx';

const OwnedStockDisplay = (props) => {
  return (
    props.stocks.map((stock, i) => {
      return (
        <Link to={'/stock-detail'} key={stock.symbol}>
          <Stockbar
            key={stock.symbol}
            stock={stock}
            showValue={false}
          />
        </Link>
      );
    })
  );
};

const Searchbar = (props) => {
  const [stockPredictions, setStockPredictions] = useState([]);
  const [displayStockDetails, setDisplayStockDetails] = useState(props.showDetails);
  const [ownedStocks, setOwnedStocks] = useState([]);
  const [showOwnedStocks, setShowOwnedStocks] = useState(!props.showDetails);


  useEffect(() => {
    const stocksToSearch = [];
    props.userPortfolio.map((stock) => {
      const symbol = stock.ticker_symbol || stock.symbol;
      stocksToSearch.push(
        axios.get('/fetchSelectedStock', {
          params: {
            symbol
          }
        })
      );
    });
    Promise.all(stocksToSearch)
      .then((res) =>{
        const stocks = res.map((stock) => stock.data);
        setOwnedStocks(stocks);
      })
      .catch((e) => e);
  }, []);

  const handleUserInput = (e) => {
    e.preventDefault;
    const userStockSearch = e.target.value;

    if (!userStockSearch) {
      setStockPredictions([]);
      setShowOwnedStocks(true);
      setDisplayStockDetails(false);
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
          console.log('error getting stock predictions', e);
        });
    }
  };

  const handlePredictionClick = (symbol) => {
    props.handlePredictionClick(symbol);
    setStockPredictions([]);
    setDisplayStockDetails(true);
    setShowOwnedStocks(false);
    document.getElementsByTagName('input')[0].value = '';
  };


  return (
    <div className='searcbar-main'>
      <div className='searchbar-container'>
        <input
          type='text'
          className='searchbar-input'
          placeholder='Search...'
          onChange={(e) => handleUserInput(e)}>
        </input>
      </div>
      <div className='searchbar-predictions-container'>
        {stockPredictions && <Predictions predictions={stockPredictions} predictionClick={handlePredictionClick}/>}
      </div>
      {showOwnedStocks &&
        <OwnedStockDisplay stocks={ownedStocks} />
      }
      {displayStockDetails &&
        <StockDetailPage
          stockSelected={props.stockSelected}
          user={props.user}
          updateTradeAction={props.updateTradeAction}
        />
      }
    </div>
  );
};

export default Searchbar;