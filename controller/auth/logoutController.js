const { User } = require("../../models/userModel");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(201).json({ message: "logged out" });
  } catch (error) {
    next(error);
  }
};

module.exports = { logout };