const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    token: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
  },
  {
    versionKey: false,
  }
);

const Token = mongoose.model('black List Of Token', schema);

module.exports = { Token };
