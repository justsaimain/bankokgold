const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offDaySchema = new Schema(
  {
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

const OffDay = mongoose.model("OffDay", offDaySchema);

module.exports = OffDay;
