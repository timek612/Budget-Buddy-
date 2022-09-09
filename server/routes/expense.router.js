const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in expense');
    console.log(req.user);
    let id = req.user.id

    let queryText = `
    SELECT "description", "date", "cost" FROM "expenses"
    WHERE "recurring" = $1 AND "user_id" = $2;
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
    .catch (err => {
        console.log(err);
        res.sendStatus(500)
    })
})


module.exports = router;