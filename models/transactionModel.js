const mongoose = require("mongoose");
const Joi = require("joi");

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

const transactionSchema = Joi.object({
  date: Joi.date().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  sum: Joi.number().required(),
  operation: Joi.string().required(),
});

module.exports = {
  Transaction,
  transactionSchema,
};
