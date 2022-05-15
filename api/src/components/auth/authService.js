const knex = require('../../helpers/knex');
const bcrypt = require('../../helpers/bcrypt');
const tableName = 'auth';

const add = async (auth) => {
  const inserted = await knex(tableName).insert(auth);
  return inserted;
};

const auth = async (username, plainPassword) => {
  const userExist = await knex(tableName)
    .where({ username })
    .select('password', 'idUser', 'idProfile')
    .limit(1);

  if (userExist.length <= 0) {
    throw new Error('User do not exist');
  }

  const { password, idUser, idProfile } = userExist[0];
  const match = await bcrypt.comparePassword(plainPassword, password);

  if (!match) {
    throw new Error('User or Password is wrong');
  }

  return { username, idUser, idProfile };
};

const updateToken = async (idUser, username, token) => {
  const updated = await knex(tableName).where({ idUser, username }).update({
    token,
  });
  return updated;
};

const existUsernameOrDni = async (dni, username) => {
  const data = await knex(tableName)
    .andWhere('idUser', dni)
    .orWhere('username', username)
    .select('idUser')
    .limit(1);

  return data && data.length > 0 ? true : false;
};

module.exports = {
  add,
  auth,
  updateToken,
  existUsernameOrDni,
};
