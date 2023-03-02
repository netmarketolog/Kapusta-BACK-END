const { Transaction } = require('../../models');
const mongoose = require('mongoose');
const { BadRequest } = require('http-errors');

const { getAggregationObject } = require('../../helpers/getAggregationObject');

const getTransactionsController = async (req, res, next) => {
  const { _id } = req.user;
  const { operation } = req.params;

  if (operation !== 'expense' && operation !== 'income')
    return next(BadRequest('Bad request!'));

  const { filterByMonthes, addTotalSum } = getAggregationObject(operation);

  const [result] = await Transaction.aggregate([
    {
      $match: {
        owner: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $group: {
        _id: '$owner',
        userTransactions: {
          $push: '$$ROOT',
        },
      },
    },
    {
      $project: {
        _id: 0,
        ...filterByMonthes,
      },
    },
    {
      $project: {
        ...addTotalSum,
      },
    },
  ]);

  const transactions = await Transaction.find({ owner: _id }).sort({
    date: -1,
  });
  const data = { salary: result, transactions };
  res.json(data);
};

module.exports = { getTransactionsController };
