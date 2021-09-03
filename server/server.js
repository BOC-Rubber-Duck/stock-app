const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200);
  res.end('request recieved by server:');
});

module.exports = app;