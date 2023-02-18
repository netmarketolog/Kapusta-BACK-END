const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const { Unauthorized } = require('http-errors');

const { JWT_SECRET } = process.env;

const authorize = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw Unauthorized("Not authorized");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user?.token !== token) {
      throw Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch {
    throw Unauthorized("Not authorized");
  }
};

module.exports = { authorize };