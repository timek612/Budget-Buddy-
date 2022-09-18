const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    console.log(req.user);

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

            if (type === 'true' || type === true) {
                let secondQueryText = `
            SELECT "savings_adjusted_income" FROM "money"
            WHERE "user_id" = $1;
            `;
            pool.query(secondQueryText, [userId])
            .then (response => {
                console.log(response.rows[0].savings_adjusted_income);

                let annualIncome = response.rows[0].savings_adjusted_income// S.A.I from money table

                let recurringExpenseAnnualCost = (total * 12)// yearly cost for recurring expense
                
                console.log(recurringExpenseAnnualCost);
                
                annualIncome -= recurringExpenseAnnualCost// income - yearly cost 
                
                console.log(annualIncome);

                let thirdQueryText = `
                UPDATE "money"
                SET "savings_adjusted_income" = $1
                WHERE "user_id" = $2;
                `;
                pool.query(thirdQueryText, [annualIncome, userId])
                .then (response => {
                    console.log(response);
                    res.sendStatus(200)
                })
                .catch (err => {
                    console.log(err);
                    res.sendStatus(500)
                })


            })
            }
            else {
                let secondQueryText = `
                SELECT "sum_of_expenses" FROM "money"
                WHERE "user_id" = $1;
                `;
                pool.query(secondQueryText, [userId])
                .then (response => {
                    console.log(response.rows[0].sum_of_expenses);
                    let expensesSum = response.rows[0].sum_of_expenses
                    expensesSum += total;

                    console.log(expensesSum);

                    let thirdQueryText = `
                    UPDATE "money"
                    SET "sum_of_expenses" = $1
                    WHERE "user_id" = $2;
                    `;
                    pool.query(thirdQueryText, [expensesSum, userId])
                    .then(response => {
                        console.log(response);
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

router.put('/', (req, res) => {
    console.log('in edit expense');
    let description = req.body.description
    let date = req.body.date
    let category = Number(req.body.category)
    let total = req.body.total
    let expenseId = req.body.id
    console.log(req.body);

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

router.delete('/:id', (req, res) => {
    console.log('in delete');
    let expenseId = req.params.id
    console.log(expenseId);

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

router.get('/individual', (req, res) => {
    console.log('in individual expense');
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
            console.log(response.rows);
            res.send(response.rows)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })

})

router.get('/recurring', (req, res) => {
    console.log('in recurring expense');
    console.log(req.user);
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
            console.log(response.rows);
            res.send(response.rows)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

router.get('/getAllExpenses', (req, res) => {
    let userId = req.user.id

    let queryText = `
    SELECT "description", "date", "cost", "expenses".id, "category_type", "recurring" FROM "expenses"
    JOIN "category"
    ON "expenses".category_id = "category".id
    WHERE "user_id" = $1 AND "category_id" = "category".id;
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