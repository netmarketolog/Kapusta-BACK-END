const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');
const { Session } = require('../../models/sessionModel');
const { createToken } = require('../../helpers/createToken');
const { JWT_REFRESH_SECRET } = process.env;

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    const { uid, sid } = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const session = await Session.findById(sid);
    if (!session) return next(Unauthorized('Not authorized'));

    const token = await createToken(uid, sid);
    res.json(token);
  } catch (e) {
    throw Unauthorized('Not authorized');
  }
};

module.exports = { refreshToken };
