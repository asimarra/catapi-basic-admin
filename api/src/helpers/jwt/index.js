const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../constants');

const generateToken = (data = {}) => {
  return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, user: decoded };
  } catch (e) {
    console.error(e);
    return { valid: false };
  }
};

module.exports = {
  generateToken,
  validateToken,
};
