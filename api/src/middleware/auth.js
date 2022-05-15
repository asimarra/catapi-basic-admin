const jwt = require('../helpers/jwt');

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({
        error: 'Authorization is required!',
      });
      return;
    }

    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      res.status(401).json({
        error: 'The authorization should be "Bearer"',
      });
      return;
    }

    const { valid: isValid } = jwt.validateToken(token);
    if (isValid) {
      next();
    } else {
      throw new Error('Invalid user ID');
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({
      error: 'Invalid request!',
    });
  }
};
