const { User } = require("../../models/userModel");
const { NotFound } = require("http-errors");

const updateBalance = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!result) {
        NotFound("User not found");
    }
    res.status(200).json({
      email: result.email,
      balance: result.balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateBalance };