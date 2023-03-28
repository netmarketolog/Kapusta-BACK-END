const { User } = require('../../models/userModel');
const { Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const { sendEmailService } = require('../../service/sendEmailService');

const passwordRecovery = async (req, res, next) => {
  const { email } = req.body;
  const password = uuidv4();
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } }
  );
  if (!user) next(Unauthorized('User not found!'));

  await sendEmailService(
    email,
    'Password Recovery',
    `Your temporary password for logging into the FinTrack application: ${password}`
  );
  res.json({
    message: 'Password recovery email sent',
  });
};

module.exports = { passwordRecovery };
