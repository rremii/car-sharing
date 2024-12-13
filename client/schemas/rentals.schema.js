const Joi = require("joi");

const createRentalSchema = Joi.object({
  carId: Joi.number().required(),
  time: Joi.date().required(),
  cost: Joi.number().required(),
});

module.exports = {
  createRentalSchema,
};
