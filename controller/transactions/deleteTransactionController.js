const { deleteTransaction } = require("../../service/transactions");

const deleteTransactionController = async (req, res, next) => {
  const { transactionId } = req.params;
  const { _id } = req.user;

  const transaction = await deleteTransaction(transactionId, _id);
  if (!transaction) return next();

  res.json({ message: "Transaction is deleted" });
};

module.exports = { deleteTransactionController };
