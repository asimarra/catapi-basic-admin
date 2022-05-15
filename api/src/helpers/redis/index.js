const redis = require('redis');
const { keyRedis } = require('../../../constants');
let client = null;

// private functions

const _getClient = async () => {
  if (client) {
    const ping = await client.ping();
    if (ping === 'PONG') {
      return client;
    }
  }

  client = await redis.createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
};

const _setKey = async (key, value) => {
  const client = await _getClient();
  await client.set(key, value);
};

const _gettKey = async (key) => {
  const client = await _getClient();
  const value = await client.get(key);
  return value;
};

const _getDeleteKey = async (key) => {
  const client = await _getClient();
  const value = await client.getDel(key);
  return value;
};

// public functions

const addClient = async (idUser, idSesion, type = keyRedis.CLIENTS) => {
  let key = `${keyRedis.CLIENTS}:${idUser}`;
  let value = idSesion;

  switch (type) {
    case keyRedis.CONNECTIONS:
      key = `${keyRedis.CONNECTIONS}:${idSesion}`;
      value = idUser;
      break;
  }

  const added = await _setKey(key, value);
  return added;
};

const getClient = async (id, type = keyRedis.CLIENTS) => {
  let key = `${keyRedis.CLIENTS}:${id}`;

  switch (type) {
    case keyRedis.CONNECTIONS:
      key = `${keyRedis.CONNECTIONS}:${id}`;
      break;
  }

  const value = await _gettKey(key);

  console.log({ key, value });
  return value;
};

const getDeleteKey = async (id, type = keyRedis.CLIENTS) => {
  let key = `${keyRedis.CLIENTS}:${id}`;

  switch (type) {
    case keyRedis.CONNECTIONS:
      key = `${keyRedis.CONNECTIONS}:${id}`;
      break;
  }

  const value = await _getDeleteKey(key);
  return value;
};

module.exports = {
  addClient,
  getClient,
  getDeleteKey,
};
