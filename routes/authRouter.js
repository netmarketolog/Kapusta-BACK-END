const express = require('express');

const { tryCatchWrapper } = require('../helpers/tryCatchWrapper');
const { authorize } = require('../middlewares/authorize');
const {
  register,
  login,
  logout,
  googleAuth,
  googleRedirect,
  refreshToken,
} = require('../controller/auth');
const { passwordRecovery } = require('../controller/auth/passwordRecovery');

const authRouter = express.Router();

authRouter.post('/register', tryCatchWrapper(register));
authRouter.post('/login', tryCatchWrapper(login));
authRouter.post('/logout', tryCatchWrapper(authorize), tryCatchWrapper(logout));
authRouter.get('/google', tryCatchWrapper(googleAuth));
authRouter.get('/google-redirect', tryCatchWrapper(googleRedirect));
authRouter.post('/refresh', tryCatchWrapper(refreshToken));
authRouter.post('/password/recovery', tryCatchWrapper(passwordRecovery));

module.exports = authRouter;
