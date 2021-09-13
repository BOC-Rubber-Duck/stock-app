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
  query(query_text) {
    return pool.query(query_text);
  }

  getPortfolio(username, cb) {
    let query = `
      SELECT p.* FROM users AS u
      JOIN positions AS p
      ON p.user_id = u.id
      WHERE u.username = '${username}';
    `;
    return this.query(query);
  }

  getFriends(username, cb) {
    let query = `
      SELECT f.* FROM users AS u
      JOIN friendships AS f
      ON f.watching_user = u.id
      WHERE u.username = '${username}';
    `;
    return this.query(query);
  }

  getWatchlist(username, cb) {
    let query = `
      SELECT w.* FROM users AS u
      JOIN watchlist AS w
      ON w.user_id = u.id
      WHERE u.username = '${username}';
    `;
    return this.query(query);
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
      return this.query(query);
    });
  }

  postFriend(watching_user_id, watched_username, cb) {
    let query = `
      INSERT INTO friendships (watching_user, watched_user)
      SELECT
      '${watching_user_id}', id
      FROM users
      WHERE username='${watched_username}';
    `;
    return this.query(query);
  }

  postWatchSecurity(user_id, exchange, ticker_symbol, cb) {
    let query = `
      INSERT INTO watchlist
      (id, user_id, ticker_symbol, exchange)
      VALUES
      ('${uuidv4()}', '${user_id}', '${ticker_symbol}', '${exchange}');
    `;
    return this.query(query);
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