
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let moneyId = 0;



router.get('/allowance', (req, res) => {//get request gets income and savings and does math for it
  console.log(req.user);
  let userId = req.user.id
  let queryText = `
  SELECT "savings_adjusted_income", "sum_of_expenses" FROM "money"
  WHERE "money".user_id = $1;
  `;

  pool.query(queryText, [userId])
    .then(response => {
      console.log(response.rows[0]);

      let netIncome = response.rows[0].savings_adjusted_income
      let expensesSum = response.rows[0].sum_of_expenses

      let dailyAllowance = Math.round((netIncome / 365) - expensesSum)
      let weeklyAllowance = Math.round((netIncome / 52) - expensesSum)
      let monthlyAllowance = Math.round((netIncome / 12) - expensesSum)
      console.log(dailyAllowance, weeklyAllowance, monthlyAllowance);

      let maths = {
        netIncome: netIncome,
        dailyAllowance: dailyAllowance,
        weeklyAllowance: weeklyAllowance,
        monthlyAllowance: monthlyAllowance
      }

      let secondQueryText = `
    UPDATE "money"
    SET "total_daily_available" = $1, "total_weekly_available" = $2, "total_monthly_available" = $3
    WHERE "user_id" = $4
    `
      let queryValues = [
        dailyAllowance,
        weeklyAllowance,
        monthlyAllowance,
        userId
      ]

      pool.query(secondQueryText, queryValues)
        .then(response => {
          res.send(maths)
        })

    })
    .catch(err => {
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
    .then((response) => {
      console.log(response);
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
})


router.put('/:id', (req, res) => {
  console.log('EDITING TOTALS BEFORE DELETE ROUTE');
  let expenseId = req.params.id
  // console.log(expenseId);

  let queryText = `
  SELECT * FROM "expenses"
  WHERE "id" = $1;
  `;
  pool.query(queryText, [expenseId])
    .then(response => {
      // console.log(response.rows);

      if (response.rows[0].recurring === false) {// then this expense is a one-time expense
        // console.log('RECURRING IS FALSE');
        // console.log(req.user.id);
        let secondQueryText = `
      SELECT "sum_of_expenses" FROM "money"
      WHERE "user_id" = $1;
      `;

        let thisExpenseTotal = response.rows[0].cost
        // console.log(thisExpenseTotal);

        pool.query(secondQueryText, [req.user.id])
          .then(response => {
            let expensesSum = response.rows[0].sum_of_expenses
            // console.log(expensesSum);
            expensesSum -= thisExpenseTotal
            // console.log('DONE, NOW DEPOSITING');
            // console.log(expensesSum);
            let newExpensesSum = expensesSum

            let thirdQueryText = `
            UPDATE "money"
            SET "sum_of_expenses" = $1
            WHERE "user_id" = $2;
             `;

            pool.query(thirdQueryText, [newExpensesSum, req.user.id])
            .then(response => {
              // console.log(response);
              res.sendStatus(200)
            })
          })
          .catch(err => {
            console.log(err);
          })
      }
      else {
        console.log('RECURRING IS TRUE');
        let expenseYearlyTotal = (response.rows[0].cost * 12)

        let secondQueryText = `
      SELECT "savings_adjusted_income" FROM "money"
      WHERE "user_id" = $1;
      `;
        pool.query(secondQueryText, [req.user.id])
          .then(response => {
            let netIncome = response.rows[0].savings_adjusted_income
            netIncome += expenseYearlyTotal

            let thirdQueryText = `
            UPDATE "money"
            SET "savings_adjusted_income" = $1
            WHERE "user_id" = $2;
            `;

            pool.query(thirdQueryText, [netIncome, req.user.id])
            .then(response => {
              res.sendStatus(200)
            })
          })
          .catch(err => {
            console.log(err);
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;
