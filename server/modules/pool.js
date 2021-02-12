const pg = require('pg');

const pool = new pg.Pool({
  database: 'todo_list',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
