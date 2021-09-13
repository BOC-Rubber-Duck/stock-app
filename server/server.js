require('dotenv').config();
const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');
const db = require('./db/queries.js');

const app = express();

app.use(express.static(pathname));

app.get('/api/', (req, res) => {
  res.status(200);
  res.end('request recieved by server:');
});

app.get('/api/getPortfolio', (req, res) => {
  db.getPortfolio()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send(500);
    });
})

module.exports = app;