const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const { deleteTransaction } = require("../../service/transactions");

const deleteTransactionController = async (req, res, next) => {
  const { transactionId } = req.params;
  const { _id } = req.user;
  if (!isValidObjectId(transactionId))
    throw BadRequest(
      "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
    );

  const transaction = await deleteTransaction(transactionId, _id);
  if (!transaction) return next();

  res.json({ message: "Transaction is deleted" });
};

module.exports = { deleteTransactionController };
