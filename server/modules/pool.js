const pg = require('pg');

const pool = new pg.Pool({
  database: 'todo_list',
});

module.exports = pool;
