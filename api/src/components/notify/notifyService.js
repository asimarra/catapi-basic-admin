const knex = require('../../helpers/knex');
const tableName = 'notify';

const add = async (notify) => {
  const inserted = await knex(tableName).insert(notify);
  return inserted;
};

const getAll = async () => {
  const notifies = await knex(tableName).select('*');
  return notifies;
};

module.exports = {
  add,
  getAll,
};
