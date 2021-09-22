const db = require('../db/queries.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 12;

class User {
  constructor(record) {
    if (record) {
      this.id = record.id;
      this.password = record.password;
      this.first_name = record.first_name;
      this.last_name = record.last_name;
      this.email = record.email;
      this.cash_position = record.cash_position;
    }
  };

  findOne(username, cb) {
    console.log('In User.findOne, username passed in: ', username);
    db.getUser(username)
    .then((user) => {
      let returnedUser = new User(res.rows[0]);
      cb(err, returnedUser);
    })
    .catch((error) => { cb(err, null); });
    /*
    , (err, res) => {
      console.log('query returned result rows: ', res.rows)
      if (err) { cb(err, null); }
      if (res.rows) {
        let user = new User(res.rows[0]);
        cb(err, user);
      } else {
        cb(err, null);
      }
    })
    */
  };

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  findById(id, cb) {
    let query = `
        SELECT * FROM users
        WHERE id='${id}'
      `;
      db.query(query, (err, res) => {
        if (!res.rows) cb('Didnt find this user id.', null);
        let user = res.rows[0];
        cb(err, user)
      })
  }
}

let user = new User();

module.exports.findOne = user.findOne;
module.exports.validPassword = user.validPassword;
module.exports.findById = user.findById;
