const knex = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_URL,
  pool: { min: 0, max: 100 },
});

module.exports = knex;
