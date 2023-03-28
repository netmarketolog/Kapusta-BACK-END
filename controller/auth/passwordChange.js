const { User } = require('../../models/userModel');
const { Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');

const passwordChange = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { _id, password } = req.user;

  const isPasswordValid = await bcrypt.compare(currentPassword, password);
  if (!isPasswordValid) {
    throw Unauthorized('Password is wrong!');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  await User.findByIdAndUpdate(_id, { $set: { password: hashedPassword } });

  res.json({
    message: 'Password changed success',
  });
};

module.exports = { passwordChange };
