const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');
const db = require('../db/db.js');

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

app.get('/leaders', (req, res) => {
  const leaderboard = {leaderboard: {user: req.query.user, offset: req.query.offset, entries: req.query.entries}};
  console.log(req.query);
  db.getLeaders(leaderboard, (error, data) => {
    if (error) {
      res.status(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/friends', (req, res) => {
  const leaderboard = {leaderboard: {user: req.query.user, offset: req.query.offset, entries: req.query.entries}};
  console.log(req.query);
  db.getFriends(leaderboard, (error, data) => {
    if (error) {
      res.status(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

app.put('/addfriend', (req, res) => {
  const users = {users: {watching_user: req.query.watching_user, watched_user: req.query.watched_user}};
  console.log(req.query);
  db.addFriend(users, (error, data) => {
    if (error) {
      res.status(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

app.put('/deletefriend', (req, res) => {
  const users = {users: {watching_user: req.query.watching_user, watched_user: req.query.watched_user}};
  console.log(req.query);
  db.deleteFriend(users, (error, data) => {
    if (error) {
      res.status(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(pathname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;