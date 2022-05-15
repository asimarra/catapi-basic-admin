const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (plainPassword, hashPassword) => {
  const match = await bcrypt.compare(plainPassword, hashPassword);
  return match;
};

module.exports = {
  hashPassword,
  comparePassword,
};
