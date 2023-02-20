const Joi = require("joi");

const balanceSchema = Joi.object({
    totalBalance: Joi.number().required(),
});

module.exports = {
    balanceSchema,
};