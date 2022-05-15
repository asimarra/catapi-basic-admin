module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  defaultProfile: {
    ADMIN: 1,
    BASIC: 2,
  },
  responseMsg: {
    INTERNAL_ERROR: 'INTERNAL_ERROR',
  },
  keyRedis: {
    CLIENTS: 'CLIENTS',
    CONNECTIONS: 'CONNECTIONS',
  },
  notificationType: {
    all: 'all',
    user: 'user',
    profile: 'profile',
  },
};
