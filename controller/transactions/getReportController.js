const { mongoose } = require("mongoose");
const { Transaction } = require("../../models");

const getReportController = async (req, res, next) => {
  const { _id } = req.body; // req.user
  const { operation } = req.params;
  let { year, month } = req.query;

  year = Number(year);
  month = Number(month);

  const startMonth = month - 1;
  const endMonth = startMonth === 11 ? 0 : startMonth + 1;
  const endYear = startMonth === 11 ? year + 1 : year;

  const statistics = await Transaction.aggregate([
    {
      $match: {
        owner: mongoose.Types.ObjectId(_id),
        createdAt: {
          $gte: new Date(year, startMonth),
          $lt: new Date(endYear, endMonth),
        },
        operation: operation,
      },
    },
    {
      $group: {
        _id: {
          category: "$category",
          descr: "$description",
        },
        total: {
          $sum: "$sum",
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.category",
        stat: {
          name: "$_id.descr",
          total: "$total",
        },
      },
    },
    {
      $sort: {
        "stat.total": -1,
      },
    },
    {
      $group: {
        _id: "$name",
        stats: {
          $push: "$stat",
        },
        total: {
          $sum: "$stat.total",
        },
      },
    },
  ]);

  const report = await Transaction.aggregate([
    {
      $match: {
        owner: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $group: {
        _id: "$operation",
        total: {
          $sum: "$sum",
        },
      },
    },
  ]);

  const result = {};
  report.forEach((item) => {
    result[item._id] = item.total;
  });
  result.statistics = statistics;

  res.json(result);
};

module.exports = { getReportController };
