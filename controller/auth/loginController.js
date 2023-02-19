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
    throw Unauthorized('Email or password is wrong');
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw Unauthorized('password is not valid');
  }

  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  await User.findByIdAndUpdate(storedUser._id, { token });

  res.json({
    token,
    user: {
      email: storedUser.email
    },
  });
}

module.exports = login;
