const Joi = require("joi");

const createCarSchema = Joi.object({
  model: Joi.string().required(),
  brand: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});

module.exports = {
  createCarSchema,
};
