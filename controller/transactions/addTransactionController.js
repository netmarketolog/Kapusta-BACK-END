const { Transaction } = require("../../models/transactionModel");
const { transactionSchema } = require("../../schemas/transaction");
const { User } = require('../../models/userModel');
const { BadRequest } = require('http-errors');

const addTransactionController = async (req, res, next) => {
    try {
      const { _id, balance } = req.user;
      const { operation, sum } = req.body;
  
      const { error } = transactionSchema.validate(req.body);
      if (error) {
        throw BadRequest(error.message);
      }
  
      const result = await Transaction.create({ ...req.body, owner: _id });
  
      const newBalance =
      operation === "income" ? balance + sum : balance - sum;
  
      await User.findByIdAndUpdate(_id, { balance: newBalance });
  
      res.status(201).json({
        result,
        balance: newBalance,
      });
    } catch (error) {
      next(error);
    }
  };

  module.exports = { addTransactionController };