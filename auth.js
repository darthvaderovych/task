/* eslint-disable prefer-promise-reject-errors */
const fs = require('fs');
const config = require('./config');

const userAuth = (bodyObj) => {
  return new Promise((resolve, reject) => {
    const username =
      typeof bodyObj.username == 'string' && bodyObj.username.trim().length > 0
        ? bodyObj.username.trim()
        : false;
    const password =
      typeof bodyObj.password == 'string' && bodyObj.password.trim().length > 0
        ? bodyObj.password.trim()
        : false;

    if (username && password) {
      fs.readFile(config.db, 'utf8', (err, data) => {
        if (!err) {
          const db = JSON.parse(data);
          const user = db.find((obj) => {
            return obj.username === username;
          });

          if (!user) {
            return reject(404);
          }
          if (user.password === password) {
            resolve(user);
          } else {
            reject(400);
          }
        } else {
          console.log(err);
          reject(500);
        }
      });
    } else {
      reject(400);
    }
  });
};

module.exports = userAuth;
