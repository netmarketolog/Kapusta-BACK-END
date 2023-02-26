const { User } = require('../../models/userModel');
const bcrypt = require('bcrypt');
const { Conflict, BadRequest } = require('http-errors');
const { createToken } = require('../../helpers/createToken');
const { Session } = require('../../models/sessionModel');

async function register(req, res, next) {
  const { email, password } = req.body;
  if (!email) throw BadRequest('email is required');
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });
    const session = await Session.create({ uid: savedUser._id });
    const token = await createToken(savedUser._id, session._id);

    await User.findByIdAndUpdate(savedUser._id, {
      token,
    });
    res.status(201).json({
      token,
      user: {
        email: savedUser.email,
        balance: savedUser.balance,
      },
    });
  } catch (error) {
    console.log('error while saving user', error.name, error.message);
    if (error.message.includes('E11000 duplicate key error')) {
      throw Conflict('Email in use!');
    }
    throw error;
  }
}

module.exports = { register };
