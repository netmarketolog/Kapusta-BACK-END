const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");

const { HttpError } = require("../helpers/HttpError");

const { JWT_SECRET } = process.env;

const authorize = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw HttpError(401, "Not authorized");
    }
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(id);

      if (!user || !user.token || user.token !== token) {
        throw HttpError(401, "Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw HttpError(401, `Error message: ${error.message}`);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorize };