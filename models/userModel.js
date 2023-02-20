const mongoose = require('mongoose');
const Joi = require("joi");

const schema = mongoose.Schema(
  {
    password: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/[a-z0-9]+@[a-z0-9]+/, 'user email is not valid!'],
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    totalBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model('user', schema);

const balanceSchema = Joi.object({
  totalBalance: Joi.number().required(),
});

module.exports = {
  User, 
  balanceSchema,
};
