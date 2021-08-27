# REST API Example with Prisma ORM and MongoDB

This example shows how to implement a **REST API with TypeScript** using [Express](https://expressjs.com/) and [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md) to resolve challenge. 

## This use a Bearer Auth
Bearer auth, or token authentication, is an HTTP authentication scheme which comprises security tokens called bearer tokens. The token is usually a cryptic string, and is generated in response to a successful login on the part of a user.

A client must include this token in the Authorization header when making requests to any protected resource on the server. As I have stated I use JWT tokens but of course you can use any type of token you choose.

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:Daniek3d/auth-prisma-mongo.git
```

Install npm dependencies:

```
cd auth-prisma-mongo
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `npx prisma generate ` hook of the `@prisma/client` package from your `package.json`.

### 2. Start the REST API server

Execute this command to start the server:

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `api-todo.js`, e.g. [`http://localhost:3000/`]
(http://localhost:3000).

## Using the REST API
Exist example how to access the api in the directorio test, using vscode api rest plug in.

You can access the REST API of the server using the following endpoints:

### login user
POST http://localhost:3000/api/v1/auth/login
content-type: application/json

{
    "email": "test2@test.com",
    "password": "12345"
}

### Register User
POST http://localhost:3000/api/v1/auth/user
content-type: application/json

{
    "email": "test2@test.com",
    "name": "test2",
    "password": "12345"
}




