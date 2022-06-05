const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    buy: {
      type: String,
      required: true,
    },
    sell: {
      type: String,
      required: true,
    },
    two_d: {
      type: String,
      required: true,
    },
    three_d: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
