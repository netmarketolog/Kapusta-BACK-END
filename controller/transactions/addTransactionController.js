const { Transaction, transactionSchema } = require("../../models/transactionModel");
const { User } = require('../../models/userModel');
const { BadRequest } = require('http-errors');

const addTransactionController = async (req, res, next) => {
    try {
      const { _id, totalBalance } = req.user;
      const { operation, sum } = req.body;
  
      const { error } = transactionSchema.validate(req.body);
      if (error) {
        throw BadRequest(error.message);
      }
  
      const result = await Transaction.create({ ...req.body, owner: _id });
  
      const newBalance =
      operation === "income" ? totalBalance + sum : totalBalance - sum;
  
      await User.findByIdAndUpdate(_id, { totalBalance: newBalance });
  
      res.status(201).json({
        result,
        totalBalance: newBalance,
      });
    } catch (error) {
      next(error);
    }
  };

  module.exports = { addTransactionController };