const { User } = require('../../models/userModel');
const bcrypt = require('bcrypt');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = process.env;

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

  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
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
