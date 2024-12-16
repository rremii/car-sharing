const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const codeSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  codeSchema,
};