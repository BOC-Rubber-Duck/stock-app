const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const starting_cash = 1000000;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

class Db {
  query(query_text, callback) {
    pool.query(query_text, (err, res) => {callback(err, res)});
  }

  getPortfolio(username, cb) {
    let query = `
      SELECT p.* FROM users AS u
      JOIN positions AS p
      ON p.user_id = u.id
      WHERE u.username = '${username}';
    `;
    console.log(this);
    this.query(query, (err, res) => {
      if (err) {
        cb(err, null);
      } else if (!res.rows) {
        cb(err, 'Didnt find a portfolio for this user.', null);
      } else {
        cb(err, res.rows)
      }
    })
  }

  getFriends(username, cb) {
    let query = `
      SELECT f.* FROM users AS u
      JOIN friendships AS f
      ON f.watching_user = u.id
      WHERE u.username = '${username}';
    `;
    this.query(query, (err, res) => {
      if (err) {
        cb(err, null);
      } else if (!res.rows) {
        cb(err, 'Didnt find friends for this user.');
      } else {
        cb(err, res.rows)
      }
    })
  }

  getWatchlist(username, cb) {
    let query = `
      SELECT w.* FROM users AS u
      JOIN watchlist AS w
      ON w.user_id = u.id
      WHERE u.username = '${username}';
    `;
    this.query(query, (err, res) => {
      if (err) {
        cb(err, null);
      } else if (!res.rows) {
        cb(err, 'Didnt find any watched items for this user.');
      } else {
        cb(err, res.rows)
      }
    })
  }

  postUser(user_info) {
    let { first_name, last_name, email, username, password } = user_info;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      let query = `
        INSERT INTO users
        (id, password, first_name, last_name, email, username, cash_position)
        VALUES
        ('${uuidv4()}', '${hash}', '${first_name}', '${last_name}', '${email}', ${username}, ${starting_cash})
      `;
      this.query(query, (err, res) => {
        if (err) console.log('Error while inserting a new user: ', err);
      })
    })
  }

  postFriend(watching_user_id, watched_username, cb) {
    let query = `
      INSERT INTO friendships (watching_user, watched_user)
      SELECT
      '${watching_user_id}', id
      FROM users
      WHERE username='${watched_username}';
    `;
    this.query(query, (err, res) => {
      if (err) {
        cb(err, null);
      } else {
        cb(err, 200)
      }
    })
  }

  postWatchSecurity(user_id, exchange, ticker_symbol, cb) {
    let query = `
      INSERT INTO watchlist
      (id, user_id, ticker_symbol, exchange)
      VALUES
      ('${uuidv4()}', '${user_id}', '${ticker_symbol}', '${exchange}');
    `;
    this.query(query, (err, res) => {
      if (err) {
        cb(err, null);
      } else {
        cb(err, 200)
      }
    })
  }

  // postTrade(user_id, buy_sell, exchange, ticker_symbol, amount, strike_price)
  // This one's going to be a transaction: Posting to both transactions and positions.
  // BEGIN;
  // INSERT INTO transactions
  // UPDATE or INSERT INTO or DELETE positions
  // COMMIT;
}

let db = new Db();

module.exports.getPortfolio = db.getPortfolio.bind(db);
module.exports.getFriends = db.getFriends.bind(db);
module.exports.getWatchlist = db.getWatchlist.bind(db);
module.exports.postUser = db.postUser.bind(db);
module.exports.postFriend = db.postFriend.bind(db);
module.exports.postWatchSecurity = db.postWatchSecurity.bind(db);