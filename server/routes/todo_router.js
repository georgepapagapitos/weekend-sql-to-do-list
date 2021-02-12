const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  pool
    .query(` SELECT * FROM "todos" ORDER BY "id"`)
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
  let sqlText = ` INSERT INTO "todos" ("todo", "isComplete") VALUES($1, $2) `;
  let sqlArgs = [req.body.todo, req.body.isComplete];

  pool
    .query(sqlText, sqlArgs)
    .then(function (dbRes) {
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log('POST error', error);
    });
});

router.put('/:id', (req, res) => {
  let todoId = req.params.id;
  console.log('todoId', todoId);
  let sqlText = `UPDATE "todos" SET "isComplete"=true WHERE "id"=$1`;
  pool
    .query(sqlText, [todoId])
    .then((resDB) => {
      console.log('PUT resDB', resDB);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('PUT error', error);
      res.sendStatus(500);
    });
});

module.exports = router;
