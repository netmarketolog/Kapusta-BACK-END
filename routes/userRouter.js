const express = require("express");

const { authorize } = require('../middlewares/authorize');
const { tryCatchWrapper } = require("../helpers/tryCatchWrapper");
const { updateBalance } = require("../controller/balance/updateBalanceController");

const userRouter = express.Router();

userRouter.patch("/update", tryCatchWrapper(authorize), tryCatchWrapper(updateBalance));

module.exports =  userRouter ;