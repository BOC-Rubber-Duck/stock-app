const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');

const app = express();

app.use(express.static(pathname));

app.get('/*', function(req, res) {
  res.sendFile(path.join(pathname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// app.get('/', (req, res) => {
//   res.status(200);
//   res.end('request recieved by server:');
// });

module.exports = app;