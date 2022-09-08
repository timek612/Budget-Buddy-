const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let moneyId = 0;
let userId = 0;

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});


router.put('/', (req, res) => { //this PUT updates the user_id column in Money table for initial registration
  console.log('ID SHOWING UP BELOW??');
  console.log(req.body.id);

  userId = req.body.id

  const queryText = `
    UPDATE "money"
    SET "user_id" = $1
    WHERE "id" = $2;
  `;

  pool.query (queryText, [userId, moneyId])
  .then (response => {
    res.sendStatus(200)
  })
  .catch (err => {
    console.log(err);
    res.sendStatus(500)
  })
})


router.post('/recurring', (req, res) => {
  console.log(req.body);

  const description = req.body.description
  const category = Number(req.body.category)
  const date = req.body.date
  const total = Number(req.body.total)

  const queryText = `
  INSERT INTO "expenses" (description, date, cost, recurring, category_id, user_id)
  VALUES ($1, $2, $3, $4, $5, $6);
  `;

  const queryValues = [
    description,
    date,
    total,
    true,
    category,
    userId
  ]

  pool.query(queryText, queryValues)
  .then ((response) => {
    console.log(response);
    res.sendStatus(201)
  })
  .catch ((err) => {
    console.log(err);
    res.sendStatus(500)
  })
})


/**
 * POST route template
 */
router.post('/', (req, res) => {// This POST inserts salary and savings into money table
  console.log(req.body);
  const income = Number(req.body.income)
  const savings = Number(req.body.savings)

  const queryText = `
    INSERT INTO "money" (income, savings_amount)
    VALUES ($1, $2) RETURNING id;
  `;
  pool.query(queryText, [income, savings])
  .then ((response) => {
    moneyId = response.rows[0].id
    // console.log(moneyId);
    res.sendStatus(201)
  })
  .catch((err) => {
    console.log('error', err);
    res.sendStatus(500);
  })
});

module.exports = router;
