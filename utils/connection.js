const { Pool } = require('pg');

const pool = new Pool({
  user: 'esmarthealth',
  host: 'localhost',
  database: 'esmarthealth',
  password: 'eshp.2022',
  port: 5432,
});

// const pool = new Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'db_cuidame',
//   password: 'DataPostGF104',
//   port: 5432,
// });


module.exports = pool;