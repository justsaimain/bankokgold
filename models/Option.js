const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema(
  {
    sell: {
      type: String,
      required: true,
    },
    buy: {
      type: String,
      required: true,
    },
    showDateTime: {
      type: String,
      required: true,
    },
    deleteDateTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
