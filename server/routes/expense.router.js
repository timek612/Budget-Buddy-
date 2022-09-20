const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {// post of expenses. This post deposits new expenses into the DB.
    const description = req.body.description
    const category = Number(req.body.category)
    const date = req.body.date
    const total = Number(req.body.total)
    const type = req.body.type
    const userId = req.user.id

    const queryText = `
  INSERT INTO "expenses" (description, date, cost, recurring, category_id, user_id)
  VALUES ($1, $2, $3, $4, $5, $6);
  `;

    let queryValues = [
        description,
        date,
        total,
        type,
        category,
        userId
    ]

    pool.query(queryText, queryValues)
        .then(response => {

            if (type === 'true' || type === true) {//this whole if/else statements determines if the expense is a one-time or recurring expense. The math changes depending on which one it is. 
                //This if statement is if it is recurring.
                let secondQueryText = `
            SELECT "savings_adjusted_income" FROM "money"
            WHERE "user_id" = $1;
            `;
            pool.query(secondQueryText, [userId])
            .then (response => {
                let annualIncome = response.rows[0].savings_adjusted_income// S.A.I from money table

                let recurringExpenseAnnualCost = (total * 12)// yearly cost for recurring expense
                                
                annualIncome -= recurringExpenseAnnualCost// income - yearly cost 
                
                let thirdQueryText = `
                UPDATE "money"
                SET "savings_adjusted_income" = $1
                WHERE "user_id" = $2;
                `;
                //update money table with correct values
                pool.query(thirdQueryText, [annualIncome, userId])
                .then (response => {
                    res.sendStatus(200)
                })
                .catch (err => {
                    console.log(err);
                    res.sendStatus(500)
                })


            })
            }
            else { //this statement is if the expense is a one-time expense.
                let secondQueryText = `
                SELECT "sum_of_expenses" FROM "money"
                WHERE "user_id" = $1;
                `;
                pool.query(secondQueryText, [userId])
                .then (response => {
                    let expensesSum = response.rows[0].sum_of_expenses
                    expensesSum += total;

                    let thirdQueryText = `
                    UPDATE "money"
                    SET "sum_of_expenses" = $1
                    WHERE "user_id" = $2;
                    `;
                    //user money is updated with correct values
                    pool.query(thirdQueryText, [expensesSum, userId])
                    .then(response => {
                        res.sendStatus(200)
                    })
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(500)
                    })
                })
            }
            
        })
        .catch(err => {
            res.sendStatus(500)
        })

})

router.put('/', (req, res) => {//PUT for editing expense information
    console.log('in edit expense');
    let description = req.body.description
    let date = req.body.date
    let category = Number(req.body.category)
    let total = req.body.total
    let expenseId = req.body.id

    let queryText = `
    UPDATE "expenses"
    SET "description" = $1, "date" = $2, "cost" = $3, "category_id" = $5
    WHERE "id" = $4
    `

    let queryValues = [
        description,
        date,
        total,
        expenseId,
        category
    ]

    pool.query(queryText, queryValues)
        .then(response => {
            console.log('successful edit');
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

router.delete('/:id', (req, res) => {//DELETE for deleting existing expense
    let expenseId = req.params.id

    let queryText = `
    DELETE FROM "expenses"
    WHERE "id" = $1
    `

    pool.query(queryText, [expenseId])
        .then(response => {
            console.log('DELETED EXPENSE');
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

router.get('/individual', (req, res) => {//This route retrieves all one-time expenses from the DB
    let id = req.user.id

    let queryText = `
    SELECT "description", "date", "cost", "expenses".id, "category_type", "recurring" FROM "expenses"
    JOIN "category"
    ON "expenses".category_id = "category".id
    WHERE "recurring" = $1 AND "user_id" = $2 AND "category_id" = "category".id;
    `

    let queryValues = [
        false,
        id
    ]

    pool.query(queryText, queryValues)
        .then(response => {
            res.send(response.rows)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })

})

router.get('/recurring', (req, res) => {//This route retrieves all recurring expenses from the DB
    let id = req.user.id

    let queryText = `
    SELECT "description", "date", "cost", "expenses".id, "category_type", "recurring" FROM "expenses"
    JOIN "category"
    ON "expenses".category_id = "category".id
    WHERE "recurring" = $1 AND "user_id" = $2 AND "category_id" = "category".id;
    `
    let queryValues = [
        true,
        id
    ]

    pool.query(queryText, queryValues)
        .then(response => {
            res.send(response.rows)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

router.get('/getAllExpenses', (req, res) => {//This route gets all expenses for a user. Used for recent expenses on the user page
    let userId = req.user.id

    let queryText = `
    SELECT "description", "date", "cost", "expenses".id, "category_type", "recurring" FROM "expenses"
    JOIN "category"
    ON "expenses".category_id = "category".id
    WHERE "user_id" = $1 AND "category_id" = "category".id
    ORDER BY "id" ASC;
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



module.exports = router;