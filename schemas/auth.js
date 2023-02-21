const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().min(6).max(32),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({ "any.required": "email is required!" }),
});

module.exports = {
  registerSchema,
};