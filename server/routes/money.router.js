const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let moneyId = 0;


/**
 * GET route template
 */
router.get('/allowance', (req, res) => {//get request gets income and savings and does math for it
  console.log(req.user);
  let userId = req.user.id
  let queryText = `
  SELECT "income", "savings_amount" FROM "money"
  WHERE "money".user_id = $1;
  `;

  pool.query (queryText, [userId]) 
  .then (response => {
    console.log(response.rows[0]);
    let preIncome = response.rows[0].income
    let preSavingsAmount = response.rows[0].savings_amount
    // console.log(income, savingsAmount);

    let savingsAmount = ((100 - preSavingsAmount) * 0.01)
    console.log(savingsAmount);

    let netIncome = (preIncome * savingsAmount)
    console.log(netIncome);

    let dailyAllowance = Math.round((netIncome / 365))
    let weeklyAllowance = Math.round((netIncome / 52))
    let monthlyAllowance = Math.round((netIncome / 12))
    console.log(dailyAllowance, weeklyAllowance, monthlyAllowance);

    let maths = {
      netIncome: netIncome,
      dailyAllowance: dailyAllowance,
      weeklyAllowance: weeklyAllowance,
      monthlyAllowance: monthlyAllowance
    }

    res.send(maths)

  })
  .catch (err => {
    console.log(err);
    res.sendStatus(500)
  })
});


router.post('/recurring', (req, res) => {
  console.log(req.body);

  const description = req.body.description
  const category = Number(req.body.category)
  const date = req.body.date
  const total = Number(req.body.total)
  const userId = req.user.id// this is the row in the user table of whos logged in 

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
