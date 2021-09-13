const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');

const controllers = require('./controllers')

//const {filterStockSearch} = require('./controllers/searchStocks.js');

const app = express();

app.use(express.static(pathname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/userStockSearch', (req, res) => {
  const stockSearch = req.query.userStockSearch;
  //const results = controllers.searchStocks.filterStockSearch(stockSearch);

  res.send(results);
  res.status(200);
});

app.get('/fetchSelectedStock', (req, res) => {
  const symbol = req.query.symbol;


  console.log('got req from client', req.query)
})

// app.get('/', (req, res) => {
//   res.status(200);
//   res.end('request recieved by server:');
// });

module.exports = app;