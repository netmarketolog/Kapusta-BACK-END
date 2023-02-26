const jwt = require('jsonwebtoken');

const createToken = async (userId, sessionId) => {
  const accessToken = jwt.sign(
    { uid: userId, sid: sessionId },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: '15m',
    }
  );
  const refreshToken = jwt.sign(
    { uid: userId, sid: sessionId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '30d',
    }
  );

  const token = {
    accessToken,
    refreshToken,
    expiresIn: Date.now() + 15 * 60 * 1000,
  };
  return token;
};

module.exports = { createToken };
