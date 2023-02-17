const { Transaction } = require("../../models");

const deleteTransaction = async (id, userId) => {
  return await Transaction.findOneAndRemove({ _id: id, owner: userId });
};

module.exports = { deleteTransaction };
