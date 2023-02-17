const mongoose = require('mongoose');

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
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model('user', schema);

module.exports = {
  User,
};
