const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET endpoint that sends back all the todos in the database
router.get('/', (req, res) => {
  pool
    // SQL query that selects all to-do items
    // from the database and orders them by their id
    .query(` SELECT * FROM "todos" ORDER BY "id"`)
    // Handle success
    .then(function (dbRes) {
      console.log('dbRes.rows', dbRes.rows);
      // Send back the entire todo database
      res.send(dbRes.rows);
    })
    // Handle error
    .catch(function (error) {
      console.log('GET error', error);
      res.sendStatus(500);
    });
});

// POST endpoint that updates the database when
// a user enters a new todo
router.post('/', (req, res) => {
  // Set SQl query text to insert the new to-do item into the database
  let sqlText = ` INSERT INTO "todos" ("todo") VALUES($1) `;
  // Set the to-do body as the value for the placeholder
  let sqlArgs = [req.body.todo];

  pool
    .query(sqlText, sqlArgs)
    // Handle success
    .then(function (dbRes) {
      res.sendStatus(200);
    })
    // Handle error
    .catch(function (error) {
      console.log('POST error', error);
    });
});

// PUT endpoint that changes a specific item's
// isComplete property to TRUE
router.put('/complete/:id', (req, res) => {
  let todoId = req.params.id;
  console.log('PUT COMPLETE todoId', todoId);
  let sqlText = `UPDATE "todos" SET "isComplete"=true WHERE "id"=$1`;
  pool
    .query(sqlText, [todoId])
    .then((dbRes) => {
      console.log('PUT COMPLETE dbRes', dbRes);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('PUT error', error);
      res.sendStatus(500);
    });
});

// PUT endpoint that changes a specific item's
// isComplete property to FALSE
router.put('/undo/:id', (req, res) => {
  let todoId = req.params.id;
  console.log('PUT UNDO id:', todoId);
  let sqlText = ` UPDATE "todos" SET "isComplete"=false WHERE "id"=$1`;
  pool
    .query(sqlText, [todoId])
    .then((dbRes) => {
      console.log('PUT UNDO dbRes', dbRes);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('PUT UNDO error', error);
    });
});

// DELETE endpoint that deletes a specific todo item
// from the database
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

module.exports = router;
