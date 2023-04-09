const { isValidObjectId } = require('mongoose');
const { BadRequest } = require('http-errors');

const { User, Transaction } = require('../../models');

const deleteTransactionController = async (req, res, next) => {
  const { transactionId } = req.params;
  const { _id, balance } = req.user;
  if (!isValidObjectId(transactionId))
    throw BadRequest(
      'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer'
    );

  const transaction = await Transaction.findOneAndRemove({
    _id: transactionId,
    owner: _id,
  });
  if (!transaction) return next();
  let newBalance;
  transaction.operation === 'income'
    ? (newBalance = balance - transaction.sum)
    : (newBalance = balance + transaction.sum);
  await User.findByIdAndUpdate(_id, { balance: newBalance });

  res.json({ id: transactionId });
};

module.exports = { deleteTransactionController };
