const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    uid: {
      type: mongoose.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
  }
);

const Session = mongoose.model('session', schema);

module.exports = { Session };
