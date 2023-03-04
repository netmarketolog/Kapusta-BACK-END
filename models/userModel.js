const mongoose = require('mongoose');

const { balanceSchema } = require('../schemas/user');

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
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    balance: {
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

const schemas = { balanceSchema };

module.exports = { User, schemas };
