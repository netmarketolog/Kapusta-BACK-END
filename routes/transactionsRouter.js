const express = require("express");

const { tryCatchWrapper } = require("../helpers");
const { validateId } = require("../middlewares/validateId");

const { deleteTransactionController } = require("../controller/transactions");

const transactionsRouter = express.Router();

transactionsRouter.delete(
  "/:transactionId",
  validateId(),
  tryCatchWrapper(deleteTransactionController)
);

module.exports = transactionsRouter;
