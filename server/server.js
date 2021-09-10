const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');

const app = express();

app.use(express.static(pathname));

app.get('/leaderboard', (req, res) => {
  const leaderboard = {user: req.query.user, offset: req.query.offset, entries: req.query.entries};
  db.getLeaders(leaderboard, (error, data) => {
    if (error) {
      res.sendStatus(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = app;