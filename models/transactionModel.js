const mongoose = require("mongoose");

const { transactionSchema } = require("../schemas/transaction");

const schema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    operation: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    owner: {
      type: mongoose.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = mongoose.model("transaction", schema);

const schemas = { transactionSchema };

module.exports = { Transaction, schemas };
