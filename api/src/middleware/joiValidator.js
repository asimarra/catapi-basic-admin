const Joi = require('joi');

const joiValidator = (schema, paramsBy = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[paramsBy]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      res.status(422).json({ message });
    }
  };
};

module.exports = joiValidator;
