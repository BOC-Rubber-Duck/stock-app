const pgp = require('pg-promise')(/* options */);
const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

const getLeaders = (leaderboard, callback) => {
  console.log(leaderboard);
  db.manyOrNone('SELECT * FROM users LEFT OUTER JOIN friendships ON users.id = friendships.watched_user AND friendships.watching_user = $(leaderboard.user) ORDER BY cash_position OFFSET $(leaderboard.offset) LIMIT $(leaderboard.entries)', leaderboard)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(error) {
      callback(error, null);
      console.log(error);
    });
};

const getFriends = (leaderboard, callback) => {
  console.log(leaderboard);
  db.manyOrNone('SELECT * FROM users INNER JOIN friendships ON users.id = friendships.watched_user AND friendships.watching_user = $(leaderboard.user) ORDER BY cash_position OFFSET $(leaderboard.offset) LIMIT $(leaderboard.entries)', leaderboard)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(error) {
      callback(error, null);
      console.log(error);
    });
};

const addFriend = (users, callback) => {
  console.log(users);
  db.none('INSERT INTO friendships (watching_user, watched_user) VALUES ($(users.watching_user), $(users.watched_user))', users)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(error) {
      callback(error, null);
      console.log(error);
    });
};

const deleteFriend = (users, callback) => {
  console.log(users);
  db.none('DELETE FROM friendships WHERE watching_user = $(users.watching_user) AND watched_user = $(users.watched_user)', users)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(error) {
      callback(error, null);
      console.log(error);
    });
};

module.exports = {
  getLeaders: getLeaders,
  getFriends: getFriends,
  addFriend: addFriend,
  deleteFriend: deleteFriend
};