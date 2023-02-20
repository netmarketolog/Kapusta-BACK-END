const express = require("express");

const { authorize } = require('../middlewares/authorize');
const { tryCatchWrapper } = require("../helpers/tryCatchWrapper");
const { updateBalance } = require("../controller/balance/updateBalanceController");

const balanceRouter = express.Router();

balanceRouter.patch("/update", authorize, tryCatchWrapper(updateBalance));

module.exports = { balanceRouter };