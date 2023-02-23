const express = require("express");

const { authorize } = require('../middlewares/authorize');
const { tryCatchWrapper } = require("../helpers/tryCatchWrapper");
const { updateBalance } = require("../controller/balance/updateBalanceController");
const { current } = require("../controller/auth/currentUserController");

const userRouter = express.Router();

userRouter.patch("/update", tryCatchWrapper(authorize), tryCatchWrapper(updateBalance));
userRouter.get(
  '/current',
  tryCatchWrapper(authorize),
  tryCatchWrapper(current)
);

module.exports =  userRouter ;