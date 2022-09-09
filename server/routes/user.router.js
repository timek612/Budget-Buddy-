const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {// This POST sends all user info to the user table
  console.log('MY REQ');
  console.log(req.body);
  const username = req.body.credentials.username;
  const password = encryptLib.encryptPassword(req.body.credentials.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age
  const income = req.body.income
  const savings = req.body.savings

  const queryText = `INSERT INTO "user" (username, password, firstname, lastname, age)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [username, password, firstName, lastName, age])
    .then (response => { //here the Id is returned so I can use it for the Money PUT
      console.log(response.rows[0].id);
      
      const secondQueryText = `
      INSERT INTO "money" (income, savings_amount, user_id)
      VALUES ($1, $2, $3) RETURNING id;
    `;
    pool.query(secondQueryText, [income, savings, response.rows[0].id])
      .then (response => {
        res.sendStatus(200)
      })
      .catch (err => {
        res.sendStatus(500)
      })

      
    })

    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
