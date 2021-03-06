const http = require('http');

// eslint-disable-next-line no-bitwise
const PORT = process.env.PORT | 9000;

const data = require('./data');
const helpers = require('./helpers');
const auth = require('./auth');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const contType = 'application/json';

    if (req.url === '/api/users/') {
      if (req.headers['content-type'] === contType) {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          const bodyObj = JSON.parse(body);

          const newUser = helpers.verifyUserData(bodyObj);

          if (newUser) {
            data
              .insert(newUser)
              .then((user) => {
                res.writeHead(201);
                res.end(JSON.stringify(user));
              })
              .catch((statusCode) => {
                res.writeHead(statusCode);
                res.end();
              });
          } else {
            res.writeHead(400);
            res.end();
          }
        });
      } else {
        res.writeHead(400);
        res.end();
      }
    } else if (req.url === '/api/authenticate/') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const bodyObj = JSON.parse(body);

        auth(bodyObj)
          .then((user) => {
            const { username, password } = user;
            const token = helpers.createToken(username, password);
            res.writeHead(200);
            res.end(token);
          })
          .catch((statusCode) => {
            res.writeHead(statusCode);
            res.end();
          });
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  } else if (req.method === 'GET') {
    const regEx = /([^\/]+)\/?$/;

    if (regEx.test(req.url)) {
      const userId = req.url.match(regEx)[1];

      data
        .get(userId)
        .then((user) => {
          res.writeHead(200);
          res.end(JSON.stringify(user));
        })
        .catch((statusCode) => {
          res.writeHead(statusCode);
          res.end();
        });
    } else {
      res.writeHead(404);
      res.end();
    }
  } else if (req.method === 'DELETE') {
    const regEx = /([^\/]+)\/?$/;

    if (regEx.test(req.url)) {
      const userId = req.url.match(regEx)[1];

      data
        .delete(userId)
        .then(() => {
          res.writeHead(204);
          res.end();
        })
        .catch((statusCode) => {
          res.writeHead(statusCode);
          res.end();
        });
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
