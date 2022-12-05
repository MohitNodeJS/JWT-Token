#  CRUD Using JWT-Token, express-validation , 

## Project Run Command
* npm i

* npm start

## Package Version:
  * node : v16.17.1
  
 * express: express@4.18.2
  
 * bcryptjs: "^2.4.3",
  
 * esm: "^3.2.25",
  
 * express-validation: "^4.1.0",
  
* joi: "^17.7.0",
  
 * jsonwebtoken: "^8.5.1",
  
 * mongoose: "^6.7.3",
  
 * multer: "^1.4.5-lts.1",
  
 * soft-delete-plugin-mongoose: "^1.0.15"

## CRUD API Link & Working:
  * USER Register :POST API --   (http://127.0.0.1:3100/register)
    firstName: Required, text Limit 3 to 15 
    lastName: Optional, text Limit 3 to 15
    email: Required, text Limit 3 to 50 , Duplicate Validation
    password : Convert bcrypt, Limit 5 to 15

  * USER LOGIN : POST API -- (http://127.0.0.1:3100/login)
    Email & Password are required  
    then generate a token ( Token Expiry time : 30 minute)

  * USER DETAILS UPDATE : PUT API -- (http://127.0.0.1:3100/profile)
    Auth/Bearer : Add Token User
    Body/JSON : Modify details user

  * USER DELETE : POST API --  (http://127.0.0.1:3100/delete)
    Auth/Bearer : Add Token User
    Its a soft delete not a pemanent delete

  * USER PROFILE : GET API -- (http://127.0.0.1:3100/profile)
    Auth/Bearer : Add Token User // Show users all details


## Package Explanation
* Express Framework: fast, assertive, essential and moderate web framework of Node.js

* Mongoose :Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

* JWT Token :JSON Web Token (JWT) is a URL-safe  transferred between two parties.

* bcrypt : Allows building a password security platform

* .env: Environment Variables

* soft-delete-plugin-mongoose : soft delete documents and restore

* Middleware : Express.js is a routing and Middleware framework for handling the different routing of the webpage and it works between the request and response


## SetUp Development Environment
  * npm init
  
  * npm i express
  
  * npm i mongoose
  
  * npm i jsonwebtoken
  
  * npm i joi
  
  * npm i esm
  
  * npm i dotenv
  
  * npm i bcryptjs
  
  * npm i soft-delete-plugin-mongoose
  
