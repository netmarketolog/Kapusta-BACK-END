const { User } = require('../../models/userModel');
const bcrypt = require('bcrypt');
const { Unauthorized } = require('http-errors');
const { createToken } = require('../../helpers/createToken');
const { Session } = require('../../models/sessionModel');


async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });

  if (!storedUser) {
    throw Unauthorized('Email is wrong!');
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw Unauthorized('Password is wrong!');
  }

  const session = await Session.create({ uid: storedUser._id });
  const token = await createToken(storedUser._id, session._id);
  await User.findByIdAndUpdate(storedUser._id, { token });

  res.json({
    token,
    user: {
      email: storedUser.email,
      balance: storedUser.balance,
    },
  });
}

module.exports = { login };
