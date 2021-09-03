const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');

const app = express();

app.use(express.static(pathname));

// app.get('/', (req, res) => {
//   res.status(200);
//   res.end('request recieved by server:');
// });

module.exports = app;