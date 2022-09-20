const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/allowance', (req, res) => {//get request gets income and savings and does math for it on page load. 
  let userId = req.user.id
  let queryText = `
  SELECT "savings_adjusted_income", "sum_of_expenses" FROM "money"
  WHERE "money".user_id = $1;
  `;

  pool.query(queryText, [userId])
    .then(response => {
      console.log(response.rows[0]);
      //math is all done here
      let netIncome = response.rows[0].savings_adjusted_income
      let expensesSum = response.rows[0].sum_of_expenses

      let dailyAllowance = Math.round((netIncome / 365) - expensesSum)
      let weeklyAllowance = Math.round((netIncome / 52) - expensesSum)
      let monthlyAllowance = Math.round((netIncome / 12) - expensesSum)

      let maths = {
        netIncome: netIncome,
        dailyAllowance: dailyAllowance,
        weeklyAllowance: weeklyAllowance,
        monthlyAllowance: monthlyAllowance
      }
      //then deposited back to DB
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


router.post('/recurring', (req, res) => {// not being used anymore I believe. Going to keep it just in case. 

  const description = req.body.description
  const category = Number(req.body.category)
  const date = req.body.date
  const total = Number(req.body.total)
  const userId = req.user.id// this is the row in the user table of who's logged in 

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
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
})


router.put('/:id', (req, res) => {//This route edits the money for the user before the expense is actually deleted from DB.
  //We grab the expense from the DB before its deleted, change the total money values for the user then re-deposit it.
  console.log('EDITING TOTALS BEFORE DELETE ROUTE');
  let expenseId = req.params.id
  // console.log(expenseId);

  let queryText = `
  SELECT * FROM "expenses"
  WHERE "id" = $1;
  `;
  pool.query(queryText, [expenseId])
    .then(response => {

      if (response.rows[0].recurring === false) {// then this expense is a one-time expense
        let secondQueryText = `
      SELECT "sum_of_expenses" FROM "money"
      WHERE "user_id" = $1;
      `;

        let thisExpenseTotal = response.rows[0].cost

        pool.query(secondQueryText, [req.user.id])
          .then(response => {
            let expensesSum = response.rows[0].sum_of_expenses
            expensesSum -= thisExpenseTotal
            let newExpensesSum = expensesSum

            let thirdQueryText = `
            UPDATE "money"
            SET "sum_of_expenses" = $1
            WHERE "user_id" = $2;
             `;

            pool.query(thirdQueryText, [newExpensesSum, req.user.id])
            .then(response => {
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

router.put('/editExpense/:id', (req, res) => {
  //This whole route is for editing user money values before the expense is edited on DOM. 
  //It determines what kind of expense it is, and then math is done accordingly.
  console.log('IN EDIT EXPENSE MONEY TOTALS');
  if (req.body.recurring === false) {
  let newTotal = Number(req.body.total)// updated total cost of expense
  let expenseId = req.body.id

  let queryText = `
  SELECT "cost" FROM "expenses"
  WHERE "id" = $1
  ;`;
  
  pool.query(queryText, [expenseId])
  .then (response => {
    let currentTotal = response.rows[0].cost
    if (newTotal > currentTotal) {// more expensive for the user
      let difference = newTotal - currentTotal

      let secondQueryText = `
      SELECT "sum_of_expenses" FROM "money"
      WHERE "user_id" = $1;
      `;

      pool.query(secondQueryText, [req.user.id])
      .then(response => {
        let expensesSum = response.rows[0].sum_of_expenses
        expensesSum += difference

        let thirdQueryText = `
        UPDATE "money"
        SET "sum_of_expenses" = $1
        WHERE "user_id" = $2;
        `;

        pool.query(thirdQueryText, [expensesSum, req.user.id])
        .then (response => {
          res.sendStatus(200)
        })
      })
      .catch (err => {
        console.log(err);
      })
    }// end second if statement
    else {// this is the else for recurring FALSE, but new total is less expensive
      let difference = currentTotal - newTotal

      let secondQueryText = `
      SELECT "sum_of_expenses" FROM "money"
      WHERE "user_id" = $1;
      `;

      pool.query(secondQueryText, [req.user.id])
      .then(response => {
        let expensesSum = response.rows[0].sum_of_expenses
        expensesSum -= difference

        let thirdQueryText = `
        UPDATE "money"
        SET "sum_of_expenses" = $1
        WHERE "user_id" = $2;
        `;

        pool.query(thirdQueryText, [expensesSum, req.user.id])
        .then (response => {
          res.sendStatus(200)
        })
        .catch (err => {
          console.log(err);
        })
        

      })
      .catch(err => {
        console.log(err);
      })
    }//end second else statement
    
  })
  .catch (err => {
    console.log(err);
    res.sendStatus(500)
  })
}// end first if statement
else {//This is for if the edited expense is recurring
  let newTotal = Number(req.body.total)// updated total cost of expense
  let expenseId = req.body.id

  let queryText = `
  SELECT "cost" FROM "expenses"
  WHERE "id" = $1
  ;`;

  pool.query(queryText, [expenseId])
  .then (response => {
    let currentTotal = response.rows[0].cost
    if (newTotal > currentTotal) {// more expensive for the user
      let difference = (newTotal - currentTotal) * 12 // calculates the yearly difference

      let secondQueryText = `
      SELECT "savings_adjusted_income" FROM "money"
      WHERE "user_id" = $1;
      `;

      pool.query(secondQueryText, [req.user.id])
      .then(response => {
        let netIncome = response.rows[0].savings_adjusted_income
        netIncome -= difference

        let thirdQueryText = `
        UPDATE "money"
        SET "savings_adjusted_income" = $1
        WHERE "user_id" = $2;
        `;

        pool.query(thirdQueryText, [netIncome, req.user.id])
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
    }//end third if statement
    else {
      let difference = (currentTotal - newTotal) * 12

      let secondQueryText = `
      SELECT "savings_adjusted_income" FROM "money"
      WHERE "user_id" = $1;
      `;

      pool.query(secondQueryText, [req.user.id])
      .then (response => {
        let netIncome = response.rows[0].savings_adjusted_income
        netIncome += difference

        let thirdQueryText = `
        UPDATE "money"
        SET "savings_adjusted_income" = $1
        WHERE "user_id" = $2;
        `;

        pool.query(thirdQueryText, [netIncome, req.user.id])
        .then(response => {
          res.sendStatus(200)
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch (err => {
        console.log(err);
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
}
})


router.get('/', (req, res) => {// Don't believe this is being used anymore, but going to keep it in case. 
  let userId = req.user.id
  let queryText = `
  SELECT "income", "savings_amount" FROM "money"
  WHERE "user_id" = $1;
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

router.get('/chartData', (req, res) => {// this route is to select the sum of all expenses for a user to display on the pie chart.
  let userId = req.user.id

  let queryText = `
  SELECT "category_id", SUM("expenses".cost) FROM "expenses"
  WHERE "user_id" = $1
  GROUP BY "category_id";
  `;

  pool.query(queryText, [userId])
  .then(response => {
    res.send(response.rows)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(200)
  })
})

module.exports = router;
