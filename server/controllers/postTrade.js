const db = require('../db/queries.js');
const controllers = require('../controllers');

const postTrade = (user, symbol, shares, action) => {
  let positionConfirmation = {
    user_id: null,
    username: user,
    cashBalance: null,
    stockSymbol: symbol,
    exchange: null,
    sharesOwned: null,
    strikePrice: null,
  };
  let tradeConfirmation = {
    username: '',
    stockSymbol: symbol,
    shares: shares,
    strikePrice: 0,
    saleAmount: 0,
    action: action,
    status: 'failed'
  };
  // validate user cash available
  return db.getUser(user)
    .then((data) => {
      console.log('user info from db:', data.rows[0]);
      let confirmedUserId = data.rows[0].id;
      let confirmedUsername = data.rows[0].username;
      let confirmedCash = data.rows[0].cash_position;

      console.log('db user return: ', confirmedUsername, confirmedCash);
      // populate position confirmation
      positionConfirmation.user_id = confirmedUserId;
      positionConfirmation.username = confirmedUsername;
      positionConfirmation.cashBalance = confirmedCash;
      return confirmedUsername;
    })
    .then((user) => {
      db.getPortfolio(user)
        .then((portfolio) => {
          console.log('portfolio data: ', portfolio.rows);
          // search portfolio
          let stock = portfolio.rows.filter(entry => entry.ticker_symbol.toLowerCase() === symbol.toLowerCase());
          console.log('filtered portfolio stock:', stock);
          let stockSymbolConfirmed = stock[0].ticker_symbol;
          let stockExchangeConfirmed = stock[0].exchange;
          let sharesOwned = stock[0].amount;
          // console.log('selected stock: ', stockSymbolConfirmed, sharesOwned);
          positionConfirmation.stockSymbol = stockSymbolConfirmed;
          positionConfirmation.exchange = stockExchangeConfirmed;
          positionConfirmation.sharesOwned = sharesOwned;
          return stockSymbolConfirmed;
        })
        .then((stockSymbolConfirmed) => { // get current price
          controllers.marketStack.fetchSelectedStock(stockSymbolConfirmed, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              const name = controllers.searchStocks.filterStockSearch(stockSymbolConfirmed)[0].name;
              const symbol = stockSymbolConfirmed;
              console.log('here is the API stock data:', results.data[0]);
              const price = results.data[0].close;
              positionConfirmation.strikePrice = price;

              const stockSelected = {
                name,
                symbol,
                price,
              };
              console.log('stockSelected, current price: ', stockSelected);
              return stockSelected;
              // res.send(stockSelected);
              // res.status(200);
            }
          });
        })
          .then((stockSelected) => {
            // put transaction
            let user_id = positionConfirmation.user_id;
            let exchange = positionConfirmation.exchange;
            let ticker_symbol = positionConfirmation.stockSymbol;
            let amount = positionConfirmation.amount;
            let strike_price = positionConfirmation.strikePrice;

            if (action === 'buy') {
              if (positionConfirmation.cashBalance >= positionConfirmation.strikePrice * shares) {
                db.postTransaction(user_id, 0, exchange, ticker_symbol, amount, strike_price)
                  .then((response) => {
                    console.log('transaction response: ', response);
                  })
                  .catch(error => error);
              } else {
                return 'insufficient funds to perform trade';
              }
            } else if (action === 'sell') {
              if (positionConfirmation.sharesOwned >= shares) {
                db.postTrade(user_id, 1, exchange, ticker_symbol, amount, strike_price)
                  .then((response) => {
                    console.log('transaction response: ', response);
                  })
                  .catch(error => error);
              } else {
                return 'insufficient shares to perform trade';
              }
            } else {
              return 'error performing trade';
            }
          });
      })
        .catch((error) => error);
};

module.exports = {
  postTrade
};