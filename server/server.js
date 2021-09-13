const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');

const {filterStockSearch} = require('./controllers/searchStocks.js');

const app = express();

app.use(express.static(pathname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/userStockSearch', (req, res) => {
  const stockSearch = req.query.userStockSearch;
  const results = filterStockSearch(stockSearch);

  res.send(results);
  res.status(200);
});

app.post('/trade', (req, res) => {
  console.log('trade query:', req.query);
  const stockSymbol = req.query.stockSymbol;
  const shares = req.query.shares;
  const action = req.query.action;
  console.log('reported params:', stockSymbol, shares, action);
  // process trade
  // make db queries
  // confirm success
  const tradeConfirmation = {
    username: 'testUser',
    stockSymbol: stockSymbol,
    shares: shares,
    marketPrice: 100,
    saleAmount: 100 * shares,
    action: action,
    status: 'success'
  };
  res.status(200);
  res.send(JSON.stringify(tradeConfirmation));
});

// app.get('/', (req, res) => {
//   res.status(200);
//   res.end('request recieved by server:');
// });

module.exports = app;