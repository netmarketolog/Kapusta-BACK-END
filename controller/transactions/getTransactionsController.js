const { User } = require("../../models");
const mongoose = require("mongoose");
const { BadRequest } = require("http-errors");

const { getArrayOfMonthes } = require("../../helpers/getArrayOfMonthes");

const getTransactionsController = async (req, res, next) => {
  const { _id } = req.body; // req.user
  const { operation } = req.params;

  if (operation !== "expense" && operation !== "income")
    return next(BadRequest("Bad request!"));

  const { filterByMonthes, addTotalSum } = getArrayOfMonthes(operation);

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
        balance: 1,
        ...filterByMonthes,
      },
    },
    {
      $project: {
        balance: 1,
        ...addTotalSum,
      },
    },
  ]);

  res.json(result);
};

module.exports = { getTransactionsController };
