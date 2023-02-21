const Joi = require("joi");

const balanceSchema = Joi.object({
    balance: Joi.number().required(),
});

module.exports = {
    balanceSchema,
};