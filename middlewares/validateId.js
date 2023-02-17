const { BadRequest } = require("http-errors");

const validateId = () => {
  return async (req, res, next) => {
    if (req.params.transactionId.length !== 24)
      return next(
        BadRequest(
          "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
        )
      );
    next();
  };
};

module.exports = { validateId };
