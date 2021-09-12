// getPortfolio(username)
// SELECT p.* FROM users AS u
// JOIN positions AS p
// ON p.user_id = u.id
// WHERE u.username = 'bezos_the_first';

// getFriends(username)
// SELECT f.* FROM users AS u
// JOIN friendships AS f
// ON f.watching_user = u.id
// WHERE u.username = 'bezos_the_first';

// getWatchlist(username)
// SELECT w.* FROM users AS u
// JOIN watchlist AS w
// ON w.user_id = u.id
// WHERE u.username = 'bezos_the_first';

// postUser()
// INSERT INTO users
// (id, password, first_name, last_name, email, cash_position)
// VALUES
// ('${uuidv4()}', '${hash}', '${first_name}', '${last_name}', '${email}', 1000000);

// postFriend(watching_user_id, watched_username)
// INSERT INTO friendships (watching_user, watched_user)
// SELECT
// '$(watching_user_id)', id
// FROM users
// WHERE username='${watched_username}';

// postWatchSecurity(user_id, exchange, ticker_symbol)
// INSERT INTO watchlist
// (id, user_id, ticker_symbol, exchange)
// VALUES
// ('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A45', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A15', 'msft', 'nasdaq');

// postTrade(user_id, buy_sell, exchange, ticker_symbol, amount, strike_price)
// This one's going to be a transaction: Posting to both transactions and positions.