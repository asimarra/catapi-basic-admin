const knex = require('../../helpers/knex');
const tableName = 'users';

const getAll = async () => {
  const users = await knex(tableName).select('*');
  return users;
};

const add = async (user) => {
  const inserted = await knex(tableName).insert(user);
  return inserted;
};

module.exports = {
  getAll,
  add,
};
