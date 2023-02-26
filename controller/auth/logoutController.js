const { User } = require('../../models/userModel');
const { Unauthorized } = require('http-errors');
const { Token } = require('../../models/blackList');
const { Session } = require('../../models/sessionModel');

async function logout(req, res, next) {
  const { _id, sid } = req.user;

  const storedUser = await User.findById({
    _id,
  });

  if (!storedUser) {
    throw Unauthorized('Not authorized');
  }
  await Token.create({
    token: storedUser.token.accessToken,
  });
  await User.findByIdAndUpdate(_id, { token: null });
  await Session.findByIdAndRemove(sid);

  res.status(204).json();
}

module.exports = { logout };
