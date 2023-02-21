const { User } = require("../../models");
const mongoose = require("mongoose");
const { BadRequest } = require("http-errors");

const { getAggregationObject } = require("../../helpers/getAggregationObject");

const getTransactionsController = async (req, res, next) => {
  const { _id } = req.user;
  const { operation } = req.params;

  if (operation !== "expense" && operation !== "income")
    return next(BadRequest("Bad request!"));

  const { filterByMonthes, addTotalSum } = getAggregationObject(operation);

  const result = await User.aggregate([
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "owner",
        as: "userTransactions",
      },
    },
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
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

  res.json(result[0]);
};

module.exports = { getTransactionsController };
