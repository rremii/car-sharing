const Joi = require("joi");

const createReviewSchema = Joi.object({
  comment: Joi.string().required(),
  carId: Joi.number().required(),
});

module.exports = {
  createReviewSchema,
};
