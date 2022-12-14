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
  const preIncome = Number(req.body.income)
  const preSavingsAmount = Number(req.body.savings)
  //All user registration info

  const queryText = `INSERT INTO "user" (username, password, firstname, lastname, age)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [username, password, firstName, lastName, age])
    .then(response => { //here the Id is returned so I can use it for the Money PUT

      let savingsAmount = ((100 - preSavingsAmount) * 0.01)
      let netIncome = (preIncome * savingsAmount)
      netIncome = Math.round(netIncome)
      //Savings adjusted income math is done here.

      const secondQueryText = `
      INSERT INTO "money" (income, savings_amount, user_id, savings_adjusted_income)
      VALUES ($1, $2, $3, $4) RETURNING id;
    `;
      pool.query(secondQueryText, [preIncome, preSavingsAmount, response.rows[0].id, netIncome])
        .then(response => {
          res.sendStatus(201)
        })
        .catch(err => {
          res.sendStatus(500)
        })
    })

    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.post('/updateMoney', (req, res) => {//this route is for updating income and savings amount for a user
  //We compare current income and savings to new data, and do math accordingly.
  let income = Number(req.body.userIncome)
  let savings = Number(req.body.savings)

  let newSavings = ((100 - savings) * 0.01)
  let newNetIncome = (income * newSavings)
  newNetIncome = Math.round(newNetIncome)

  let queryText = `
  SELECT "income", "savings_amount" FROM "money"
  WHERE "user_id" = $1;
  `;
  pool.query(queryText, [req.user.id])
    .then(response => {
      let currentSavings = response.rows[0].savings_amount
      let currentIncome = response.rows[0].income

      let currentSavingsPercent = ((100 - currentSavings) * 0.01)
      let currentNetIncome = (currentIncome * currentSavingsPercent)
      currentNetIncome = Math.round(currentNetIncome)

      let secondQueryText = `
    SELECT "savings_adjusted_income" FROM "money"
    WHERE "user_id" = $1;
    `;

      pool.query(secondQueryText, [req.user.id])
        .then(response => {
          let currentSAI = response.rows[0].savings_adjusted_income
          let difference = (currentNetIncome - currentSAI)

          newNetIncome -= difference;

          let thirdQueryText = `
      UPDATE "money"
      SET "savings_adjusted_income" = $1, "income" = $2, savings_amount = $3
      WHERE "user_id" = $4;
      `;

          pool.query(thirdQueryText, [newNetIncome, income, savings, req.user.id])
            .then(response => {
              res.sendStatus(200)
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })

})

router.get('/getUserInfo', (req, res) => {//Don't believe this is being used anymore, but keeping it in case.
  //This grabs current user name and age from the DB.
  let userId = req.user.id

  let queryText = `
  SELECT "firstname", "lastname", "age" FROM "user"
  WHERE "id" = $1;
  `;

  pool.query(queryText, [userId])
    .then(response => {
      res.send(response.rows)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})



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

router.post('/updatePersonalInfo', (req, res) => {
  //This route is for updating users name and age.
  let userId = req.user.id

  let queryText = `
  UPDATE "user"
  SET "firstname" = $1, "lastname" = $2, "age" = $3
  WHERE "id" = $4;
  `;

  let queryValues = [
    req.body.firstName,
    req.body.lastName,
    req.body.age,
    userId
  ]

  pool.query(queryText, queryValues)
    .then(response => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;
