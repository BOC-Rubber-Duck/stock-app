require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');
const controllers = require('./controllers');
const db = require('./db/queries.js');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser());
app.use(session({ secret: "dispositions lossy rependo rakastaa", resave: false, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(pathname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  controllers.user.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
      console.log('Attempting localstrategy.');
      db.getUser(username, function(err, user) {
        if (err) {
          console.log('findUser returned an error: ', err);
          return done(err);
        }
        if (!user) {
          console.log("findUser didn't find that user.");
          return done(null, false, { message: 'Incorrect username. '});
        }
        if (!bcrypt.compareSync(password, this.password)) {
          console.log('Invalid password.', err);
          return done(null, false, { message: 'Incorrect password.'});
        }
        console.log('Looks like login succeeded.')
        return done(null, user); // Successful login? Return the userID to the done callback, so it can stored in the session key.
      });
  }
));

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
});

app.get('/api/getUser', (req, res) => {
  db.getUser(req.query.username)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log('Error during getUser: ', err);
      res.send(500);
    });
});

app.get('/api/getUsers', (req, res) => {
  db.getUsers(req.query.username)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log('Error during getUser: ', err);
      res.send(500);
    });
});

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
});

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
  const stockSymbol = req.query.stockSymbol;
  const shares = req.query.shares;
  const action = req.query.action;
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

app.get('/api/getLeaderboard', (req, res) => {
  db.getLeaderboard(req.query.username, req.query.offset, req.query.entries)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log('Error during getLeaderboard: ', err);
      res.send(500);
    });
});

app.get('/api/getFriendboard', (req, res) => {
  db.getFriendboard(req.query.username, req.query.offset, req.query.entries)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log('Error during getFriendboard: ', err);
      res.send(500);
    });
});

app.delete('/api/deleteFriend', (req, res) => {
  db.deleteFriend(req.body.watching_user_id, req.body.watched_username)
    .then((data) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('Error during deleteFriend: ', err);
      res.send(500);
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

app.get('/testUser', (req, res) => {
  controllers.user.findOne('jsmith', (err, value) => {
    if (err) { console.log('error: ', err); }
    else { console.log('Value returned from user: ', value); }
  });
  res.send('Testing User FOo Bar Baz');
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(pathname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;