const express = require('express');

const register = require('../controller/auth/registrationController');
const login = require('../controller/auth/loginController');
const { logout } = require('../controller/auth/logoutController');
const { tryCatchWrapper } = require('../helpers/tryCatchWrapper');
const { authorize } = require('../middlewares/authorize');

const authRouter = express.Router();

authRouter.post('/users/register', tryCatchWrapper(register));
authRouter.get('/users/login', tryCatchWrapper(login));
authRouter.post('/users/logout', tryCatchWrapper(authorize), tryCatchWrapper(logout));

module.exports = authRouter;
