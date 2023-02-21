const express = require("express");

const { tryCatchWrapper } = require("../helpers/tryCatchWrapper");
const { authorize } = require("../middlewares/authorize");

const {
  deleteTransactionController,
  addTransactionController,
  getTransactionsController,
  getReportController,
} = require("../controller/transactions");

const transactionsRouter = express.Router();

transactionsRouter.post(
  "/transaction/add",
  tryCatchWrapper(authorize),
  addTransactionController
);

transactionsRouter.get(
  "/:operation",
  tryCatchWrapper(authorize),
  tryCatchWrapper(getTransactionsController)
);

transactionsRouter.get(
  "/report/:operation",
  tryCatchWrapper(authorize),
  tryCatchWrapper(getReportController)
);

transactionsRouter.delete(
  "/:transactionId",
  tryCatchWrapper(authorize),
  tryCatchWrapper(deleteTransactionController)
);

module.exports = transactionsRouter;
