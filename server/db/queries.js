const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const starting_cash = 1000000;
const starting_portfolio_value = 1000000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

class Db {
  query(query_text) {
    return pool.query(query_text);
  }

  getUser(username) {
    let query = `
      SELECT * FROM users
      WHERE username = '${username}';
    `;
    return this.query(query);
  }

  getUsers(usernameFragment) {
    let query = `
      SELECT * FROM users
      WHERE username LIKE '%${usernameFragment}%';
    `;
    return this.query(query);
  }

  getPortfolio(username) {
    let query = `
      SELECT p.* FROM users AS u
      JOIN positions AS p
      ON p.user_id = u.id
      WHERE u.username = '${username}';
    `;
    return this.query(query);
  }

  getFriends(username) {
    let query = `
      SELECT f.* FROM users AS u
      JOIN friendships AS f
      ON f.watching_user = u.id
      WHERE u.username = '${username}';
    `;
    return this.query(query);
  }

  getWatchlist(username) {
    let query = `
      SELECT w.* FROM users AS u
      JOIN watchlist AS w
      ON w.user_id = u.id
      WHERE u.username = '${username}';
    `;
    return this.query(query);
  }

  postUser(first_name, last_name, email, username, password) {
    const hash = bcrypt.hashSync(password, saltRounds);

    let query = `
      INSERT INTO users
      (id, password, first_name, last_name, email, username, cash_position, portfolio_value)
      VALUES
      ('${uuidv4()}', '${hash}', '${first_name}', '${last_name}', '${email}', '${username}', ${starting_cash}, ${starting_portfolio_value})
    `;
    return this.query(query);
  }

  postFriend(watching_user_id, watched_username) {
    let query = `
      INSERT INTO friendships (watching_user, watched_user)
      SELECT
      '${watching_user_id}', id
      FROM users
      WHERE username='${watched_username}';
    `;
    return this.query(query);
  }

  postWatchSecurity(user_id, exchange, ticker_symbol) {
    let query = `
      INSERT INTO watchlist
      (id, user_id, ticker_symbol, exchange)
      VALUES
      ('${uuidv4()}', '${user_id}', '${ticker_symbol}', '${exchange}');
    `;
    return this.query(query);
  }

  putPortfolioValue(user_id, portfolio_value) {
    let query = `
      UPDATE users
      SET portfolio_value = ${portfolio_value}
      WHERE id = '${user_id}'
    `;
    return this.query(query);
  }

  getLeaderboard(username, offset, entries) {
    let query = `
      SELECT * FROM users AS u
      LEFT OUTER JOIN friendships AS f
      ON u.id = f.watched_user
      AND f.watching_user = ${username}
      ORDER BY u.cash_position
      OFFSET ${offset}
      LIMIT ${entries};
    `;
    return this.query(query);
  };

  getFriendboard(username, offset, entries) {
    let query = `
      SELECT * FROM users AS u
      INNER JOIN friendships AS f
      ON u.id = f.watched_user
      AND f.watching_user = ${username}
      ORDER BY u.cash_position
      OFFSET ${offset}
      LIMIT ${entries};
    `;
    return this.query(query);
  };

  deleteFriend(watching_user_id, watched_username) {
    let query = `
      DELETE FROM friendships AS f
      WHERE f.watching_user = ${watching_user_id}
      AND (SELECT u.username FROM users AS u
      WHERE f.watched_user = u.id) = ${watched_username};
    `;
    return this.query(query);
  };

  // postTrade(user_id, buy_sell, exchange, ticker_symbol, amount, strike_price)
  // This one's going to be a transaction: Posting to both transactions and positions.
  // BEGIN;
  // INSERT INTO transactions
  // UPDATE or INSERT INTO or DELETE positions
  // COMMIT;
}

let db = new Db();

module.exports.getUser = db.getUser.bind(db);
module.exports.getUsers = db.getUsers.bind(db);
module.exports.getPortfolio = db.getPortfolio.bind(db);
module.exports.getFriends = db.getFriends.bind(db);
module.exports.getWatchlist = db.getWatchlist.bind(db);
module.exports.postUser = db.postUser.bind(db);
module.exports.postFriend = db.postFriend.bind(db);
module.exports.postWatchSecurity = db.postWatchSecurity.bind(db);
module.exports.putPortfolioValue = db.putPortfolioValue.bind(db);
module.exports.getLeaderboard = db.getLeaderboard.bind(db);
module.exports.getFriendboard = db.getFriendboard.bind(db);
module.exports.deleteFriend = db.deleteFriend.bind(db);