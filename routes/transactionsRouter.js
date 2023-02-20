const express = require("express");

const { tryCatchWrapper } = require("../helpers/tryCatchWrapper");
const { authorize } = require("../middlewares/authorize");
const { validateId } = require("../middlewares/validateId");

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
  tryCatchWrapper(addTransactionController)
);

transactionsRouter.get(
  "/:operation",
  tryCatchWrapper(getTransactionsController)
);

transactionsRouter.get(
  "/report/:operation",
  tryCatchWrapper(getReportController)
);

transactionsRouter.delete(
  "/:transactionId",
  validateId(),
  tryCatchWrapper(deleteTransactionController)
);

module.exports = transactionsRouter;
