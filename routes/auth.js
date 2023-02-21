const express = require('express');

const { tryCatchWrapper } = require('../helpers/tryCatchWrapper');
const { authorize } = require('../middlewares/authorize');
const {
    register,
    login,
    logout,
    googleAuth,
    googleRedirect,
} = require('../controller/auth');

const authRouter = express.Router();

authRouter.post('/users/register', tryCatchWrapper(register));
authRouter.post('/users/login', tryCatchWrapper(login));
authRouter.post('/users/logout', tryCatchWrapper(authorize), tryCatchWrapper(logout));
authRouter.get('/google', tryCatchWrapper(googleAuth));
authRouter.get('/google-redirect', tryCatchWrapper(googleRedirect));

module.exports = authRouter;
