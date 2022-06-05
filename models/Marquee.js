const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marqueeSchema = new Schema(
  {
    marquee_text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Marquee = mongoose.model("Marquee", marqueeSchema);

module.exports = Marquee;
