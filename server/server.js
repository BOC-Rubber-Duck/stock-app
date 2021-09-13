require('dotenv').config();
const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');
const db = require('./db/queries.js');

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

app.get('/api/', (req, res) => {
  res.status(200);
  res.end('request recieved by server:');
});

app.get('/api/getPortfolio', (req, res) => {
  db.getPortfolio()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send(500);
    });
})

module.exports = app;