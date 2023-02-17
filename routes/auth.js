const express = require('express');

const register = require('../controller/auth/registrationController');
const login = require('../controller/auth/loginController');
const { tryCatchWrapper } = require('../helpers/tryCatchWrapper');

const authRouter = express.Router();

authRouter.post('/users/register', tryCatchWrapper(register));
authRouter.get('/users/login', tryCatchWrapper(login));

module.exports = authRouter;
