const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  pool
    .query(` SELECT * FROM "todos" `)
    .then(function (dbRes) {
      console.log('dbRes.rows', dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch(function (error) {
      console.log('GET error', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  let sqlText = ` INSERT INTO "todos" ("todo") VALUES($1) `;
  let todo = req.body.todo;
  console.log('todo to add', todo);

  pool
    .query(sqlText, [todo])
    .then(function (dbRes) {
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log('POST error', error);
    });
});

module.exports = router;
