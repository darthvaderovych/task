1. The service is launched with the command: `npm start`.
1. The service runs on port `9000`.
1. No database is required, just use a json file.
1. No libs, no package.json dependencies, no node_modules.
1. Endpoints:

- POST "/api/users/" - create a user.

  Request body:

  ```
  {
    username: string,
    password: string,
    email: string
  }
  ```

  Responses

  1. Success:

     status: 201

     body:

     ```
     {
       id: number,
       username: string,
       password: string,
       email: string
     }
     ```

  1. Invalid input:

     status: 400

- GET "/api/users/:id" - fetch a user by id
  Responses

  1. Success:

     status: 200

     body:

     ```
     {
       id: number,
       username: string,
       password: string,
       email: string
     }
     ```

  1. Not found:

     status: 404

- DELETE "/api/users/:id" - delete a user with id

  Responses

  1. Success:


      status: 204

  1. Not found:


      status: 404

- POST "/api/authenticate" - authenticate a user

  Request body:

  ```
  {
    username: string,
    password: string,
  }
  ```

  Responses

  1. Success:

  status: 200

  body:

  ```
  {
    token: string(base64)
  }
  ```

  1. Invalid input:

  status: 400

  1. Not found:

  status: 404
