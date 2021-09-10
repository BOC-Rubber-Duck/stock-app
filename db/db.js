const pgp = require('pg-promise')(/* options */);
const db = pgp(process.env.POSTGRES);

const getLeaders = (leaderboard, callback) => {
  db.manyOrNone('SELECT * FROM users LEFT OUTER JOIN friendships ON users.id = friendships.watched_user AND friendships.watching_user = $(leaderboard.user) ORDER BY cash_position OFFSET $(leaderboard.offset) LIMIT $(leaderboard.entries)', leaderboard)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(error) {
      callback(error, null);
      console.log(error);
    });
};

module.exports = {
  getLeaders: getLeaders
};