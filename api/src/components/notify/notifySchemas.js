const Joi = require('joi');

const schemas = {
  add: Joi.object().keys({
    title: Joi.string().min(5).max(100).required(),
    message: Joi.string().min(10).max(300).required(),
    sender: Joi.number().greater(0).required(),
    receiver: Joi.number().required(),
    typeReceiver: Joi.string().valid('all', 'user', 'profile'),
    type: Joi.string().valid('info', 'warning', 'success', 'error'),
  }),
};

module.exports = schemas;
