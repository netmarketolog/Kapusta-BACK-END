const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const { Unauthorized } = require('http-errors');
const { Token } = require('../models/blackList');
const { Session } = require('../models/sessionModel');

const { JWT_ACCESS_SECRET } = process.env;

const authorize = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  const isBlackToken = await Token.findOne({ token });

  if (isBlackToken) throw Unauthorized('Token is not valid!!!');

  if (bearer !== 'Bearer') {
    throw Unauthorized('Not authorized');
  }
  try {
    const { uid, sid } = jwt.verify(token, JWT_ACCESS_SECRET);

    const user = await User.findById(uid);
    const session = await Session.findById(sid);

    if (!user || !session) {
      throw Unauthorized('Not authorized');
    }
    user.token = token;
    user.sid = sid;
    req.user = user;
    next();
  } catch {
    throw Unauthorized('Not authorized');
  }
};

module.exports = { authorize };
