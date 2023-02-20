const Joi = require("joi");

const transactionSchema = Joi.object({
    date: Joi.date().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    sum: Joi.number().required(),
    operation: Joi.string().required(),
  });

  module.exports = {
    transactionSchema,
  };