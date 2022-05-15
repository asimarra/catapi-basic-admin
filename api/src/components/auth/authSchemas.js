const Joi = require('joi');

const schemas = {
  signup: Joi.object().keys({
    dni: Joi.number().greater(0).required(),
    name: Joi.string().min(5).max(100).required(),
    lastName: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(10).max(150).required(),
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(12).required(),
  }),
  signin: Joi.object().keys({
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(12).required(),
  }),
};

module.exports = schemas;
