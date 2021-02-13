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
  let sqlText = ` INSERT INTO "todos" ("todo") VALUES($1) `;
  let sqlArgs = [req.body.todo];

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
  console.log(req.params);
  let todoId = req.params.id;
  console.log('PUT todoId', todoId);
  let sqlText = `UPDATE "todos" SET "isComplete"=true WHERE "id"=$1`;
  pool
    .query(sqlText, [todoId])
    .then((dbRes) => {
      console.log('PUT dbRes', dbRes);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('PUT error', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  console.log('req.params', req.params);
  let todoId = req.params.id;
  let sqlText = ` DELETE FROM "todos" WHERE "id"=$1 `;

  pool
    .query(sqlText, [todoId])
    .then((dbRes) => {
      console.log('todo item deleted');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('DELETE error', error);
    });
});

router.get('/isComplete/:id', (req, res) => {
  let todoId = req.params.id;
  let sqlText = ` SELECT "isComplete" FROM "todos" WHERE "id"=$1 `;

  pool
    .query(sqlText, [todoId])
    .then((dbRes) => {
      res.send(dbRes.rows[0].isComplete);
    })
    .catch((error) => {
      console.log('GET iscomplete error', error);
    });
});

module.exports = router;
