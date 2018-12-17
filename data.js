/* eslint-disable prefer-promise-reject-errors */
const fs = require('fs');
const config = require('./config');

const lib = {};

lib.insert = (userData) => {
  return new Promise((resolve, reject) => {
    fs.readFile(config.db, 'utf8', (err, data) => {
      if (!err) {
        const obj = JSON.parse(data);
        obj.push(userData);
        const json = JSON.stringify(obj);

        fs.writeFile(config.db, json, 'utf8', (err) => {
          if (!err) {
            resolve(userData);
          } else {
            console.log(err);
            reject(500);
          }
        });
      } else {
        console.log(err);
        reject(500);
      }
    });
  });
};

lib.get = (userId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(config.db, 'utf8', (err, data) => {
      if (!err) {
        const db = JSON.parse(data);
        const user = db.find((obj) => {
          return obj.id == userId;
        });

        if (!user) {
          reject(404);
        } else {
          resolve(user);
        }
      } else {
        console.log(err);
        reject(500);
      }
    });
  });
};

lib.delete = (userId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(config.db, 'utf8', (err, data) => {
      if (!err) {
        const db = JSON.parse(data);
        const index = db.findIndex((obj) => {
          return obj.id == userId;
        });

        if (index === -1) {
          reject(404);
        } else {
          db.splice(index, 1);

          const json = JSON.stringify(db);

          fs.writeFile(config.db, json, 'utf8', (err) => {
            if (!err) {
              resolve();
            } else {
              console.log(err);
              reject(500);
            }
          });
        }
      } else {
        console.log(err);
        reject(500);
      }
    });
  });
};

module.exports = lib;
