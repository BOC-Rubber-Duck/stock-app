const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');

const app = express();

app.use(express.static(pathname));

app.get('/leaderboard', (req, res) => {
  let page = req.query.page;
  let count = req.query.limit;
  res.send('Hello World!');
});

module.exports = app;