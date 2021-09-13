const express = require('express');
const path = require('path');
const pathname = path.join(__dirname, '..', 'client', 'dist');
const db = require('../db/db.js');

const app = express();

app.use(express.static(pathname));

app.get('/leaders', (req, res) => {
  const leaderboard = {leaderboard: {user: req.query.user, offset: req.query.offset, entries: req.query.entries}};
  console.log(req.query);
  db.getLeaders(leaderboard, (error, data) => {
    if (error) {
      res.status(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/friends', (req, res) => {
  const leaderboard = {leaderboard: {user: req.query.user, offset: req.query.offset, entries: req.query.entries}};
  console.log(req.query);
  db.getFriends(leaderboard, (error, data) => {
    if (error) {
      res.status(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

app.put('/addfriend', (req, res) => {
  const users = {users: {watching_user: req.query.watching_user, watched_user: req.query.watched_user}};
  console.log(req.query);
  db.addFriend(users, (error, data) => {
    if (error) {
      res.status(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

app.put('/deletefriend', (req, res) => {
  const users = {users: {watching_user: req.query.watching_user, watched_user: req.query.watched_user}};
  console.log(req.query);
  db.deleteFriend(users, (error, data) => {
    if (error) {
      res.status(502).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = app;