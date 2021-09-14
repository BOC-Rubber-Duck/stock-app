require('dotenv').config();
const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');

const controllers = require('./controllers');
const db = require('./db/queries.js');
const bodyParser = require('body-parser');

const dbOld = require('../db/db.js');

const {filterStockSearch} = require('./controllers/searchStocks.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(pathname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/userStockSearch', (req, res) => {
  const stockSearch = req.query.userStockSearch;
  const results = controllers.searchStocks.filterStockSearch(stockSearch);

  res.send(results);
  res.status(200);
});

app.get('/fetchSelectedStock', (req, res) => {
  const symbolSearch = req.query.symbol;

  controllers.marketStack.fetchSelectedStock(symbolSearch, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const name = controllers.searchStocks.filterStockSearch(symbolSearch)[0].name;
      const symbol = symbolSearch;
      const price = results.data[0].close;
      const data = results.data;

      const stockSelected = {
        name,
        symbol,
        price,
        data
      };
      res.send(stockSelected);
      res.status(200);
    }
  });
})

// app.get('/', (req, res) => {
//   res.status(200);
//   res.end('request recieved by server:');
// });
app.get('/api/getPortfolio', (req, res) => {
  db.getPortfolio(req.query.username)
    .then((data) => {
      res.send(data.rows)
    })
    .catch((err) => {
      console.log('Error during getPortfolio: ', err)
      res.send(500);
    });
})

app.get('/api/getFriends', (req, res) => {
  db.getFriends(req.query.username)
    .then((data) => {
      res.send(data.rows)
    })
    .catch((err) => {
      console.log('Error during getFriends: ', err)
      res.send(500);
    });
})

app.get('/api/getWatchlist', (req, res) => {
  db.getWatchlist(req.query.username)
    .then((data) => {
      res.send(data.rows)
    })
    .catch((err) => {
      console.log('Error during getWatchlist: ', err)
      res.send(500);
    });
})

app.post('/api/postFriend', (req, res) => {
  db.postFriend(req.body.watching_user_id, req.body.watched_username)
    .then((data) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('Error during postFriend: ', err)
      res.send(500);
    });
})

app.post('/api/postWatchSecurity', (req, res) => {
  db.postWatchSecurity(req.body.user_id, req.body.exchange, req.body.ticker_symbol)
    .then((data) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('Error during postWatchSecurity: ', err)
      res.send(500);
    });
})

app.post('/api/postUser', (req, res) => {
  let { first_name, last_name, email, username, password } = req.body;
  db.postUser(first_name, last_name, email, username, password)
    .then((data) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('Error during postUser: ', err)
      res.send(500);
    });
})
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
  dbOld.getLeaders(leaderboard, (error, data) => {
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
  dbOld.getFriends(leaderboard, (error, data) => {
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
  dbOld.addFriend(users, (error, data) => {
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
  dbOld.deleteFriend(users, (error, data) => {
    if (error) {
      res.status(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

app.put('/api/portfolioValue', (req, res) => {
  let { user_id, portfolio_value } = req.body;
  console.log('user_id: ', user_id, 'portfolio_value: ', portfolio_value);
  db.putPortfolioValue(user_id, portfolio_value)
    .then((data) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('Error during putPortfolioValue: ', err)
      res.send(500);
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