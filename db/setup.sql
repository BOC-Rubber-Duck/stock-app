CREATE TABLE IF NOT EXISTS users (
  id uuid not null primary key,
  password varchar(64) not null, -- bcrypt stores hashed password together with its salt.
  first_name varchar(64) not null,
  last_name varchar(64) not null,
  email varchar(64) not null unique,
  cash_position bigint default 1000000
);

CREATE INDEX ON users (first_name);
CREATE INDEX ON users (last_name);
CREATE INDEX ON users (email);
CREATE INDEX ON users (cash_position);

CREATE TABLE IF NOT EXISTS transactions (
  id uuid NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL references users(id),
  ticker_symbol varchar(8) NOT NULL,
  exchange varchar(8) NOT NULL,
  transaction_type smallint NOT NULL,
  amount int NOT NULL,
  strike_price int NOT NULL,
  time_entered timestamp NOT NULL
);

comment on column transactions.transaction_type is 'Enum: buy: 0, sell: 1';
comment on column transactions.strike_price is 'The price in US cents that the whole trade was agreed at.';
comment on column transactions.amount is 'The number of shares traded.';

CREATE INDEX ON transactions (user_id);
CREATE INDEX ON transactions (strike_price);
CREATE INDEX ON transactions (ticker_symbol, exchange);

CREATE TABLE IF NOT EXISTS positions (
  id uuid NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL references users(id),
  ticker_symbol varchar(8) NOT NULL,
  exchange varchar(8) NOT NULL,
  amount int NOT NULL
);

CREATE INDEX ON positions (user_id);
CREATE INDEX ON positions (ticker_symbol, exchange);

CREATE TABLE IF NOT EXISTS friendships (
  watching_user uuid PRIMARY KEY references users(id),
  watched_user uuid references users(id)
);


CREATE TABLE IF NOT EXISTS watchlist (
  id uuid NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL references users(id),
  ticker_symbol varchar(8) NOT NULL,
  exchange varchar(8) NOT NULL
);

CREATE INDEX ON watchlist (user_id);
CREATE INDEX ON watchlist (ticker_symbol, exchange);

-- Sample values.

INSERT INTO users
(id, password, first_name, last_name, email, cash_position)
VALUES
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11', 'my_secret_password', 'john', 'smith', 'john_smith@example.com', 1000000),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A12', 'my_secret_password', 'jeffrey', 'bezos', 'jeffrey_bezos@example.com', 1000000),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A13', 'my_secret_password', 'mark', 'zuckerberg', 'mark_zuckerberg@example.com', 1000000),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A14', 'my_secret_password', 'william', 'gates', 'william_gates@example.com', 1000000),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A15', 'my_secret_password', 'warren', 'buffett', 'warren_buffett@example.com', 1000000);

INSERT INTO positions
(id, user_id, ticker_symbol, exchange, amount)
VALUES
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A21', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11', 'aapl', 'nasdaq', 1000000),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A22', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A12', 'amzn', 'nasdaq', 1000000),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A23', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A13', 'fb', 'nasdaq', 1000000),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A24', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A14', 'msft', 'nasdaq', 1000000),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A25', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A15', 'brk.a', 'nyse', 1000000);

INSERT INTO transactions
(id, user_id, ticker_symbol, exchange, transaction_type, amount, strike_price, time_entered)
VALUES
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A31', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11', 'aapl', 'nasdaq', 0, 100, 1000000, '2021-09-08 12:28:25-07'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A32', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A12', 'amzn', 'nasdaq',  0, 100, 1000000, '2021-09-08 12:28:25-07'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A33', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A13', 'fb', 'nasdaq',  0, 100, 1000000, '2021-09-08 12:28:25-07'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A34', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A14', 'msft', 'nasdaq',  0, 100, 1000000, '2021-09-08 12:28:25-07'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A35', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A15', 'brk.a', 'nyse',  0, 100, 1000000, '2021-09-08 12:28:25-07'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A36', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11', 'msft', 'nasdaq',  0, 66, 660000, '2021-09-08 12:28:25-07'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A37', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11', 'msft', 'nasdaq',  1, 66, 550000, '2021-09-08 12:28:25-07');

INSERT INTO watchlist
(id, user_id, ticker_symbol, exchange)
VALUES
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A45', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A15', 'msft', 'nasdaq'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A41', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11', 'brk.a', 'nyse'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A42', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A12', 'aapl', 'nasdaq'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A43', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A13', 'amzn', 'nasdaq'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A44', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A14', 'fb', 'nasdaq');

INSERT INTO friendships
(watching_user, watched_user)
VALUES
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A12'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A12', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A13'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A13', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A14'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A14', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A15'),
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A15', 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11');